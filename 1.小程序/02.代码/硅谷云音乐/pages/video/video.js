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
        const result = await myAxios('/video/group/list');
        this.setData({
            navList: result.data.slice(0, 13),
            navId: result.data[0].id
            // 错误写法:
            // navId:this.data.navList[0].id
        })

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