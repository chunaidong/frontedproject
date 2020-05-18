Page({
    onTap(){
        //小程序页面跳转，不可以回退，触发的是onUnload事件
        /*wx.redirectTo({
            url: "../posts/posts"
        });*/
        //小程序页面跳转，可以回退，触发的是onHide事件
        wx.navigateTo({
            url: "../posts/posts"
        })
    },

    onHide(){
        console.log("welcome page is onhide")
    },
    //wx.re
    onUnload(){
        console.log("welcome page is onUnload")
    }
})