var app = getApp();
var utils = require("../../utils/utils.js");
Page({
    data:{
        category:"",
        movies:{},
        requestUrl:"",
        totalCount:0,
        isEmpty:true
    },
    onLoad(options){
        this.setData({
            category:options.category
        });
        let dataUrl = "";
        switch (this.data.category) {
            case "正在热映":
                dataUrl = "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = "/v2/movie/coming_soon";
                break;
            case "豆瓣Top250":
                dataUrl = "/v2/movie/top250";
                break;
        }
        let url = `${app.globalProperties.dobanBase}${dataUrl}`
        utils.http(url,this.processMovieData);
        this.setData({
            requestUrl:url
        })
    },
    /**
     * 滑动到底部触发的事件
     */
    onScroll(event){
        let nextUrl = `${this.data.requestUrl}?start=${this.data.totalCount}&count=20`;
        utils.http(nextUrl,this.processMovieData);
        wx.showNavigationBarLoading();
    },
    processMovieData(doubanMovieData){
        let movies = [];
        for(let subject of doubanMovieData.subjects){
            let title = subject.title.length >=6 ? `${subject.title.substring(0,6)}...`:subject.title;
            let tmp ={
                stars: utils.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(tmp);
        }
        let totalMovies = {};
        if(this.data.isEmpty){
            totalMovies = movies;
            this.setData({
                isEmpty:false
            })
        }else{
            totalMovies = this.data.movies.concat(movies);
        }
        this.setData({
            movies: totalMovies,
            totalCount: this.data.totalCount + 20
        });
        wx.hideNavigationBarLoading();
    },
    onReady(event){
        wx.setNavigationBarTitle({
            title: this.data.category
        })
    }
})
