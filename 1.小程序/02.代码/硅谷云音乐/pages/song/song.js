// pages/song/song.js
import dayjs from 'dayjs';
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
        songId:null,

        // 用于存储当前歌曲的播放进度
        currentWidth:0,

        // 用于存储当前歌曲的时间进度
        currentTime:"00:00",

        // 用于存储当前歌曲的总时长
        durationTime:"--:--"
    },

    // 用于监视背景音频的状态变化
    addEvent(){
        // 用于监视背景音频是否处于播放状态
        // 注意:onPlay是一个函数,调用的时候需要传入回调函数
        this.backgroundAudioManager.onPlay(()=>{
            // console.log('onPlay')

            // appInstance.globalData.audioId = this.data.songObj.id;
            appInstance.globalData.playState = true;

            // 并不是所有播放的时候,都要更新当前页面的播放状态
            // 因为很有可能,用户听着歌曲A,看着歌曲B页面,此时即便暂停或者播放歌曲A,都不应该影响到当前页面的播放状态

            if(appInstance.globalData.audioId === this.data.songId){
                this.setData({
                    isPlay:true
                })
            }
        })

        // 用于监视背景音频是否处于暂停状态
        this.backgroundAudioManager.onPause(()=>{
            // console.log('onPause')

            appInstance.globalData.playState = false;
            
            if(appInstance.globalData.audioId === this.data.songId){
                this.setData({
                    isPlay:false
                })
            }
        })

        // 用于监视背景音频进度是否正在更新
        this.backgroundAudioManager.onTimeUpdate(()=>{
            // console.log('onTimeUpdate')
            // 从背景音频管理器实例身上获取到当前歌曲的时间,单位为秒
            // 从背景音频管理器实例身上获取到当前歌曲的总时长,单位为秒
            const {currentTime,duration} = this.backgroundAudioManager;

            this.setData({
                currentWidth:currentTime/duration*100,
                currentTime:dayjs(currentTime*1000).format('mm:ss')
            })
        })
    },

    // 用于监视用户点击上一首/下一首按钮,并实现切换歌曲功能
    switchType(event){
        // console.log('switchType')
        const type = event.currentTarget.id;

        // 流程1,将用户点击的按钮标识传递给每日推荐页面
        this.$PubSub.publish('switchType',type);
    },

    // 用于监视用户点击播放按钮,实现播放功能
    async handlePlay(){
        // console.log('handlePlay')

        // const backgroundAudioManager = wx.getBackgroundAudioManager();

        if(!this.data.musicUrl){
            await this.getMusicUrl();
        }

        if(this.data.isPlay){
            // 能进入这里就说明当前歌曲正在播放
            this.backgroundAudioManager.pause();

            // 由于最新代码中,已经通过onPlay和onPause事件监视了背景音频的播放暂停,所以此处可以不需要记录音频播放状态
            // appInstance.globalData.playState = false;
        }else{
            // 能进入这里就说明当前歌曲处于暂停


            this.backgroundAudioManager.src=this.data.musicUrl;
            this.backgroundAudioManager.title=this.data.songObj.name;

            // 由于最新代码中,已经通过onPlay和onPause事件监视了背景音频的播放暂停,所以此处可以不需要记录音频播放状态
            appInstance.globalData.audioId = this.data.songObj.id;
            // appInstance.globalData.playState = true;
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
            songObj:result.songs[0],
            durationTime:dayjs(result.songs[0].dt).format("mm:ss")
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

        const songId = options.songId*1;

        this.setData({
            songId
        })

        this.backgroundAudioManager = wx.getBackgroundAudioManager();

        // 流程4:封装请求函数
        // 封装请求歌曲详细信息的函数
        this.getMusicDetail();

        // 封装请求歌曲链接的函数
        // this.getMusicUrl();

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

        // 准备工作3
        this.token = this.$PubSub.subscribe('sendId',(msg,songId)=>{
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

        // 绑定与背景音频相关的监听
        this.addEvent();
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
        this.$PubSub.unsubscribe(this.token);
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