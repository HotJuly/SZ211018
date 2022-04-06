// pages/index/index.js
// 用于注册当前页面实例对象
Page({

    /**
     * 页面的初始数据
     */
    /*
        乞丐版深拷贝
            const newData = JSON.parse(JSON.stringify(data))
            缺点:
                1.这种深拷贝会导致原型链丢失(新对象的构造函数会是Object)
                2.该方法无法拷贝函数,会变成undefined
                3.对特殊类型的数据兼容性不好
                    如果遇到Map数据类型,会拷贝变成对象
                    如果遇到Set数据类型,会拷贝变成数组
    */
    data: {
        msg:"我是初始化数据"
    },

    handleClick(){
        console.log('handleClick')
    },

    handleClick1(){
        console.log('handleClick1')
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('msg1',this.data.msg)
        // this.data.msg = "我是修改之后的数据"
        this.setData({
            msg : "我是修改之后的数据"
        })
        console.log('msg2',this.data.msg)
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