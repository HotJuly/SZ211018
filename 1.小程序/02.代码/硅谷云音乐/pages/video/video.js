// pages/video/video.js
import myAxios from '../../utils/myAxios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储nav区域列表数据
        navList: [],

        // 用于记录用户正在查看的是哪一个分组
        navId: null,

        // 用于存储视频列表数据
        videoList: [],

        // 用于控制scroll-view组件下拉动画的收起
        isTrigger:false
    },

    // 用于请求导航列表的数据
    async getNavList(){
        const result = await myAxios('/video/group/list');
        this.setData({
            navList: result.data.slice(0, 13),
            navId: result.data[0].id
            // 错误写法:
            // navId:this.data.navList[0].id
        })
    },

    async handlePullDown(){
        // console.log('handlePullDown')
        await this.getVideoList();
        this.setData({
            isTrigger:false
        })
    },

    // 该方法仅用于测试暂停视频播放API,不是本项目的功能
    testAPI(){
        // console.log('testAPI')
        const vid = '6079942F18A2160EF7CEC24827886C7F';

        const videoContext = wx.createVideoContext(vid);
        videoContext.pause();
    },

    // 用于监视视频的播放操作
    handlePlay(event){
        // console.log('handlePlay',this.oldVId)

        // 1.获取到当前正在播放的视频id
        const vid = event.currentTarget.id;

        // 判断是否具有上一个视频,而且上一个视频是否就是当前这一个视频
        if(this.oldVId&&this.oldVId!==vid){
            const videoContext = wx.createVideoContext(this.oldVId);
            videoContext.pause();
        }

        //2.将当前本次的id留给下次使用
        this.oldVId = vid;
    },

    // 用于监视用户点击导航栏列表,切换navId
    async changeNavId(event) {
        /*
            currentTarget和target的区别
                currentTarget是用于查找当前事件流中绑定了事件的事件源对象
                target是用于查找当前事件流中最内层的触发者(也就是所谓的目标对象)
        */
        const navId = event.currentTarget.dataset.id;
        // console.log('changeNavId',navId)
        this.setData({
            navId
        })

        wx.showLoading({
            title:"加载中,请稍等"
        });
        // console.log(1)

        await this.getVideoList();

        wx.hideLoading();
        // console.log(3)
    },

    // 用于请求最新的视频列表
    async getVideoList() {
        // 将videoList状态更新为空,可以实现页面空白的效果,优化切换效果
        this.setData({
            videoList:[]
        })

        const result2 = await myAxios('/video/group', {
            id: this.data.navId
        });
        // console.log('result2',result2)
        this.setData({
            videoList: result2.datas.map((item) => {
                return item.data
            })
        })
        
        // console.log(2)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {

        // 发送请求获取最新的导航列表数据
        await this.getNavList();

        // 发送请求获取最新的视频列表数据
        this.getVideoList();
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
    onPullDownRefresh:async function () {
        // console.log('onPullDownRefresh')

        // 发送请求获取最新的导航列表数据
        await this.getNavList();

        // 发送请求获取最新的视频列表数据
        this.getVideoList();
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