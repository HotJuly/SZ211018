// pages/index/index.js
// 用于注册当前页面实例对象
const citySelector = requirePlugin('citySelector');
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
        msg: "我是初始化数据",
        city:"",
        userInfo: {}
    },

    handleClick() {
        // console.log('handleClick')

        // wx.navigateTo({
        //     // url:"../log/log"
        //     url:"/pages/log/log"
        // })

        // wx.redirectTo({
        //     url:"../log/log"
        //     // url:"/pages/log/log"
        // })

        const key = 'BZ7BZ-QQWCU-DHWV2-BFJJG-B2JZF-KSBT3'; // 使用在腾讯位置服务申请的key
        const referer = '七月入栈'; // 调用插件的app的名称
        const hotCitys = '北京,上海,武汉,西安,深圳,泉州'; // 用户自定义的的热门城市

        wx.navigateTo({
            url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
        })
    },

    handleClick1() {
        // console.log('handleClick1')
        this.setData({
            msg: "我是修改之后的数据"
        })
    },

    getUserInfo(res) {
        // 无论用户点击允许还是拒绝都会触发
        // 框架想要给开发者传递数据渠道有两个,1使用this,2使用形参
        // console.log('getUserInfo',res)

        // 如果成功获取到用户信息,就更新到data中进行显示

        if (res.detail.userInfo) {
            // 小程序可以后续新增状态属性,但是不推荐
            this.setData({
                userInfo: res.detail.userInfo
            })
        }
    },

    getUserProfile() {
        wx.getUserProfile({
            desc: "用于测试小程序登录功能",
            success: (detail) => {
                // console.log('detail',detail)
                this.setData({
                    userInfo: detail.userInfo
                })
            },
            fail(error) {
                console.log('fail', error)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log('msg1',this.data.msg)
        // // this.data.msg = "我是修改之后的数据"
        // this.setData({
        //     msg : "我是修改之后的数据"
        // })
        // console.log('msg2',this.data.msg)

        // console.log('---------onLoad---------')

        // wx.getUserInfo({
        //     success:(detail)=>{
        //         // console.log('detail',detail)
        //         this.setData({
        //             userInfo:detail.userInfo
        //         })
        //     }
        // })


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log('---------onReady---------')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log('---------onShow---------')
        const selectedCity = citySelector.getCity();
        // console.log(selectedCity)
        if(selectedCity){
            this.setData({
                city:selectedCity.fullname
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // console.log('---------onHide---------')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // console.log('---------onUnload---------')
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