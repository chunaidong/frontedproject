import localData from "../../../data/local-data";
Page({
    data: {
        collectPostId:""
    },
    onLoad: function (options) {
        let currentPostId = options.postId
        //向全局变量赋值
        this.data.collectPostId = currentPostId;
        let postDetail = localData[currentPostId];
        this.setData({
            postDetail: postDetail
        })
        //缓存收藏设置
        let postsCollected = wx.getStorageSync("post_collection");
        if(postsCollected){
            //获取当前文章收藏情况
            let postCollected = postsCollected[currentPostId];
            this.setData({
                collected: postCollected
            })
        }else{
            postsCollected = [];
            postsCollected[currentPostId] = false;
            wx.setStorageSync("post_collection",postsCollected);
        }
    },
    /**
     * 收藏功能
     */
    onCollectionTap(event){
        //获取缓存中的变量
        let postsCollected = wx.getStorageSync("post_collection");
        //获取当前详情是否被收藏
        let postCollected = postsCollected[this.data.collectPostId];
        //取相反值
        postCollected = !postCollected;
        postsCollected[this.data.collectPostId] = postCollected;
        //更新数据绑定变量，从而实现切换图片的效果
        this.setData({
            collected: postCollected
        });
        //更新文章是否缓存的值
        wx.setStorageSync("post_collection",postsCollected);
        //提示信息
        wx.showToast({
            title: postCollected? '收藏成功': '取消收藏成功',
            mask: true
        })
    },
    /**
     * 分享功能
     */
    onShareTap(event){
        wx.removeStorageSync("key");
    }
});