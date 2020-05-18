import localData from "../../data/local-data.js";
// pages/posts/posts.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onPostTap(event){
        this.navigateToDetail(event.currentTarget.dataset.postId);
    },
    /**
     * 轮播图跳转到详情页
     * @param event
     */
    onSwiperTap(event){
        // target和currentTarget
        // target指的是当前点击的组件 currentTarget指的是事件捕获的组件
        // target这里指的是image currentTarget指的是swipper
        this.navigateToDetail(event.target.dataset.postId);
    },
    navigateToDetail(postId){
        wx.navigateTo({
            url: "./post-detail/post-detail?postId="+postId
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //页面向服务端获取数据
        this.setData({
            //向data中设置自定义key:value
            postsContent:localData
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})