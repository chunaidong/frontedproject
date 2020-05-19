var app = getApp();
var utils = require("../../utils/utils.js");
Page({
    data:{
        category:""
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
        this.setData({
            movies: movies
        });
    },
    onReady(event){
        wx.setNavigationBarTitle({
            title: this.data.category
        })
    }
})
