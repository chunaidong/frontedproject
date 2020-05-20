var app = getApp();
var utils = require("../utils/utils.js");
Page({
    data:{
        inTheaters:{},
        comingSoon:{},
        top250:{},
        searchResult: {},
        containerShow: true,
        searchPanelShow: false,
    },
    onLoad(options){
        let inTheatersUrl = `${app.globalProperties.dobanBase}/v2/movie/in_theaters?start=6&count=3`;
        let comingSoonUrl = `${app.globalProperties.dobanBase}/v2/movie/coming_soon?start=6&count=3`;
        let top250Url = `${app.globalProperties.dobanBase}/v2/movie/top250?start=6&count=3`;
        this.getMovieListData(inTheatersUrl,'inTheaters',"正在热映");
        this.getMovieListData(comingSoonUrl,'comingSoon',"即将上映");
        this.getMovieListData(top250Url,'top250',"豆瓣Top250");
    },
    /**
     * 点击更多事件
     * @param event
     */
    onMoreTap(event){
        let category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: `./more-movie/more-movie?category=${category}`
        })
    },
    getMovieListData(url,movieType,categoryTitle){
        let _that = this;
        wx.request({
            url: url,
            method:'GET',
            header:{
                "Content-type":"application/json"
            },
            success: res => {
                _that.processMovieData(res.data,movieType,categoryTitle);
            },
            fail: error => {
                console.log(error)
            }
        })
    },
    /**
     * 处理电影数据
     * @param doubanMovieData 从豆瓣中获取的数据
     * @param movieType 那种方式
     */
    processMovieData(doubanMovieData,movieType,categoryTitle){
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
            [movieType]: {movies:movies,categoryTitle:categoryTitle},
        });
    },
    onCancelImgTap: function (event) {
        this.setData({
                containerShow: true,
                searchPanelShow: false,
                searchResult:{}
            }
        )
    },

    onBindFocus: function (event) {
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },

    onBindBlur: function (event) {
        var text = event.detail.value;
        var searchUrl = app.globalProperties.dobanBase + "/v2/movie/search?q=" + text;
        this.getMovieListData(searchUrl, "searchResult", "");
    },

    onMovieTap:function(event){
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: "movie-detail/movie-detail?id="+movieId
        })
    },

})
