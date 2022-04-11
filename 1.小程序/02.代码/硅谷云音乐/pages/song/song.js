// pages/song/song.js

const appInstance = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

        // 用于控制页面的C3效果切换
        isPlay:false,

        // 用于存储当前页面的歌曲详细信息
        songObj:{},

        // 用于存储当前页面的歌曲链接
        musicUrl:null,

        // 用于存储当前页面的歌曲id
        songId:null
    },

    // 用于监视用户点击上一首/下一首按钮,并实现切换歌曲功能
    switchType(event){
        // console.log('switchType')
        const type = event.currentTarget.id;

        // 准备工作3
        this.$PubSub.subscribe('sendId',(msg,songId)=>{
            // console.log('sendId',songId)
            this.setData({
                songId
            });

            const promise1 = this.getMusicDetail();
            const promise2 = this.getMusicUrl();

            Promise.all([promise1,promise2])
            .then(()=>{
                this.backgroundAudioManager.src=this.data.musicUrl;
                this.backgroundAudioManager.title=this.data.songObj.name;

                this.setData({
                    isPlay:true
                })
            })

            
        })

        // 流程1,将用户点击的按钮标识传递给每日推荐页面
        this.$PubSub.publish('switchType',type);
    },

    // 用于监视用户点击播放按钮,实现播放功能
    handlePlay(){
        // console.log('handlePlay')

        // const backgroundAudioManager = wx.getBackgroundAudioManager();

        if(this.data.isPlay){
            // 能进入这里就说明当前歌曲正在播放
            this.backgroundAudioManager.pause();

            // appInstance.globalData.audioId = this.data.songObj.id;
            appInstance.globalData.playState = false;
        }else{
            // 能进入这里就说明当前歌曲处于暂停

            this.backgroundAudioManager.src=this.data.musicUrl;
            this.backgroundAudioManager.title=this.data.songObj.name;

            appInstance.globalData.audioId = this.data.songObj.id;
            appInstance.globalData.playState = true;
        }

        this.setData({
            isPlay:!this.data.isPlay
        })
    },

    // 用于请求当前歌曲的详细信息
    async getMusicDetail(){
        const result = await this.$myAxios('/song/detail',{ids:this.data.songId});
        // console.log(result)

        // 通过API动态设置当前页面的导航栏标题
        wx.setNavigationBarTitle({
            title:result.songs[0].name
        })

        this.setData({
            songObj:result.songs[0]
        })
    },

    // 用于请求当前歌曲的音频链接
    async getMusicUrl(){
        const result2 = await this.$myAxios('/song/url',{id:this.data.songId});
        this.setData({
            musicUrl:result2.data[0].url
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        // console.log('options',options.songId)
        // console.log()
        // const song = JSON.parse(options.song);

        const songId = options.songId;

        this.setData({
            songId
        })

        this.backgroundAudioManager = wx.getBackgroundAudioManager();

        // 流程4:封装请求函数
        // 封装请求歌曲详细信息的函数
        this.getMusicDetail();

        // 封装请求歌曲链接的函数
        this.getMusicUrl();

        // 以下代码用于测试app实例对象的数据读写
        // console.log('msg1',appInstance.globalData.msg)
        // appInstance.globalData.msg="我是修改之后的全局数据"
        // console.log('msg2',appInstance.globalData.msg)

        // 获取背景音频相关信息
        const {audioId,playState} = appInstance.globalData;
        // console.log(audioId,songId)

        // 比较背景音频与当前歌曲的id,如果相同,将isPlay更新为true
        if(playState&&Number(audioId)===Number(songId)){
            this.setData({
                isPlay:true
            })
        }
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