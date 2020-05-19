var app = getApp();
Page({
    data:{

    },
    onLoad(options){
        wx.request({
            url: `${app.globalProperties.dobanBase}/v2/movie/top250`,
            data:{},
            method:'GET',
            header:{
              "Content-type":"application/json"
            },
            success: res => {
                console.log(res);
            },
            fail: error => {
                console.log(error)
            }
        })
    }
})
