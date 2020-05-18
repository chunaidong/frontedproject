import localData from "../../../data/local-data";
var app = getApp();
Page({
    data: {
        collectPostId: "",
        isPalyingMusic: false,
        //音频播放器
        innerAudioContext: {},
        //背景音频播放器
        backgroundAudioManager:{}
    },
    onLoad: function (options) {
        let currentPostId = options.postId
        //向全局变量赋值
        this.data.collectPostId = currentPostId;
        let postDetail = localData[currentPostId];
        this.setData({
            postDetail: postDetail
        });
        //缓存收藏设置
        let postsCollected = wx.getStorageSync("post_collection");
        if (postsCollected) {
            //获取当前文章收藏情况
            let postCollected = postsCollected[currentPostId];
            this.setData({
                collected: postCollected
            });
        } else {
            postsCollected = [];
            postsCollected[currentPostId] = false;
            wx.setStorageSync("post_collection", postsCollected);
        }
        //注册音乐播放器
        // this.registerInnerAudioContext();
        if(app.globalProperties.isPalyingMusic && app.globalProperties.playingMusicCurrentId === currentPostId){
            this.setData({
                isPalyingMusic: true
            })
        }
        //注册背景音乐播放器
        this.registerBackgroundAudioManager();


    },
    /**
     * 收藏功能
     */
    onCollectionTap(event) {
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
        wx.setStorageSync("post_collection", postsCollected);
        this.showToast(postCollected);
        /*
        this.showModal(postCollected);
        */
    },
    /**
     * 提示信息
     * @param postCollected
     */
    showToast(postCollected) {
        //提示信息
        wx.showToast({
            title: postCollected ? '收藏成功' : '取消收藏成功',
            mask: true
        })
    },
    /**
     * 小程序确认框事件
     * @param postCollected
     */
    showModal(postCollected) {
        wx.showModal({
            cancelText: "取消",
            confirmText: "确认",
            confirmColor: 'green',
            //提示的内容 *!/
            content: postCollected ? "确定收藏吗？" : "确定取消收藏吗？",
            showCancel: true,
            title: "提示"
    })
    },
    /**
     * 分享功能
     */
    onShareTap(event) {
        let itemList = Array.of("分享到微信","分享到微博","分享到朋友圈","分享到QQ");
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success(res) {
                wx.showToast({
                    title: itemList[res.tapIndex]
                })
            }
        })
    },
    /**
     * 音乐播放功能
     * @param event
     */
    onMusicTap(event){
        let isPlaying = this.data.isPalyingMusic;
        let currentId = this.data.collectPostId;
        let musicDetail = localData[currentId].music;
        //新版小程序的音乐播放
        if(isPlaying){
            // this.data.innerAudioContext.pause();
            this.data.backgroundAudioManager.pause();
            this.setData({
                isPalyingMusic: false
            })
        }else{
            // this.data.innerAudioContext.play();
            this.data.backgroundAudioManager.play();
            this.data.backgroundAudioManager.src = musicDetail.url;
            this.data.backgroundAudioManager.title = musicDetail.title;
            this.data.backgroundAudioManager.coverImgUrl = musicDetail.coverImg;
            this.setData({
                isPalyingMusic: true
            })
        }
    },
    /**
     * 注册音频播放器
     */
    registerInnerAudioContext(){
        let currentId = this.data.collectPostId;
        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = localData[currentId].music.url;
        this.setData({
            innerAudioContext: innerAudioContext
        })
    },
    /**
     * 注册背景音频播放器
     */
    registerBackgroundAudioManager(){
        let currentId = this.data.collectPostId;
        // let musicDetail = localData[currentId].music;
        let _that = this;
        const backgroundAudioManager  = wx.getBackgroundAudioManager();
        // 设置了 src 之后会自动播放
        // backgroundAudioManager.src = musicDetail.url;
        // backgroundAudioManager.title = musicDetail.title;
        // backgroundAudioManager.coverImgUrl = musicDetail.coverImg;
        //监听启动事件
        backgroundAudioManager.onPlay(() =>{
            _that.setData({
                isPalyingMusic: true
            });
            app.globalProperties.isPalyingMusic = true;
            app.globalProperties.playingMusicCurrentId = currentId;
        })
        //监听暂停事件
        backgroundAudioManager.onPause(() => {
            _that.setData({
                isPalyingMusic: false
            });
            app.globalProperties.isPalyingMusic = false;
            app.globalProperties.playingMusicCurrentId = null;
        })
        this.setData({
            backgroundAudioManager: backgroundAudioManager
        })
    }
});