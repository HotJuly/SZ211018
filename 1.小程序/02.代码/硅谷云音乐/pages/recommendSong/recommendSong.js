// pages/recommendSong/recommendSong.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储当前的日期和月份
        day:"--",
        month:"--",

        // 用于存储当前的每日推荐列表数据
        recommendList:[]
    },

    toSong(event){
        // console.log('toSong');
        const song = event.currentTarget.dataset.song;
        wx.navigateTo({
          url: `/pages/song/song?songId=${song.id}`,
        })
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
    onShow:async function () {
        // 由于日期和每日推荐列表数据,都是一天变化一次,所以如果已经具有该数据,就不再请求和更新
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        this.setData({
            day,
            month
        })

        const {recommend} = await this.$myAxios('/recommend/songs');

        this.setData({
            recommendList:recommend
        })
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