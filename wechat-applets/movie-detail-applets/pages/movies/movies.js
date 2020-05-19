var app = getApp();
Page({
    data:{
        inTheaters:{},
        comingSoon:{},
        top250:{}
    },
    onLoad(options){
        let inTheatersUrl = `${app.globalProperties.dobanBase}/v2/movie/in_theaters`;
        let comingSoonUrl = `${app.globalProperties.dobanBase}/v2/movie/coming_soon`;
        let top250Url = `${app.globalProperties.dobanBase}/v2/movie/top250`;
        this.getMovieListData(inTheatersUrl,'inTheaters');
        this.getMovieListData(comingSoonUrl,'comingSoon');
        this.getMovieListData(top250Url,'top250');
    },
    getMovieListData(url,movieType){
        let _that = this;
        wx.request({
            url: `${url}?start=6&count=3`,
            method:'GET',
            header:{
                "Content-type":"application/json"
            },
            success: res => {
                _that.processMovieData(res.data,movieType);
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
    processMovieData(doubanMovieData,movieType){
        let movies = [];
        for(let subject of doubanMovieData.subjects){
           let title = subject.title.length >=6 ? `${subject.title.substring(0,6)}...`:subject.title;
           let tmp ={
               title: title,
               average: subject.rating.average,
               coverageUrl: subject.images.large,
               movieId: subject.id
           }
           movies.push(tmp);
        }
        this.setData({
            [movieType]: movies
        });
    }

})
