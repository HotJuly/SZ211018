// pages/personal/personal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 控制页面元素位置偏移量
        moveDistance:0,

        // 控制当前页面元素位移效果
        moveTransition:""
    },

    handleTouchStart(event){
        // console.log('handleTouchStart',event)
        this.startY = event.touches[0].clientY;
        this.setData({
            moveTransition:""
        })
    },

    handleTouchMove(event){
        // console.log('handleTouchMove',event)
        const moveY = event.touches[0].clientY;
        const moveDistance = moveY - this.startY;
        // console.log('moveDistance',moveDistance)
        if(moveDistance>0&&moveDistance<80){
            this.setData({
                moveDistance
            })
        }
    },

    handleTouchEnd(){
        this.setData({
            moveDistance:0,
            moveTransition:"1s transform"
        })
    },

    // 用于监视用户点击游客区域,跳转到login页面进行登录操作
    toLogin(){
        wx.navigateTo({
            url:"/pages/login/login"
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