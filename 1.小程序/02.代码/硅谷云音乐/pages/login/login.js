// pages/login/login.js
import myAxios from '../../utils/myAxios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储手机号码
        phone: "17688197777",

        // 用于存储密码
        password: "",

        form: {
            name: 666
        }
    },

    // 用于监视用户对input框内容的修改
    handlePhone(event) {
        // console.log('handlePhone',event)
        // 获取到input框中最新的数据,并更新到data状态中

        const value = event.detail.value;
        this.setData({
            phone: value
        })
    },

    // 用于监视用户对input框内容的修改
    handlePassWord(event) {
        // console.log('handlePhone',event)
        // 获取到input框中最新的数据,并更新到data状态中

        const value = event.detail.value;
        this.setData({
            password: value
        })
    },

    // 用于监视用户对input框内容的修改
    handleInput(event) {
        // 通过一个回调函数,实现多个input框的数据收集
        // 小程序向事件回调函数内部传参的方法,是通过自定义属性来实现的

        const type = event.target.dataset.type;
        const value = event.detail.value;
        // console.log('type',type)
        this.setData({
            [type]: value
        })
    },

    // 用于监视用户点击登录按钮,并且实现登录功能
    async handleLogin() {
        // console.log('handleLogin');
        /*
            前端登录流程:
                1.收集数据
                2.处理数据
                3.前端表单校验
                4.发送请求
                    状态码:
                        400->帐号格式错误
                        501->帐号不存在
                        502->密码错误
                        200->登录成功
                5.成功做什么,失败做什么
        */

        //    1.收集数据
        let {
            phone,
            password
        } = this.data;

        //    2.处理数据
        phone = phone.trim();
        password = password.trim();

        //    3.前端表单校验
        if (!phone) {
            wx.showToast({
                icon: "error",
                title: "手机不能为空"
            })
            return;
        }
        if (!password) {
            wx.showToast({
                icon: "error",
                title: "密码不能为空"
            })
            return;
        }

        //    4.发送请求
        const result = await myAxios('/login/cellphone', {
            phone,
            password,
            _isLogin:true
        });
        // console.log('result',result)

        const code = result.code;

        // if (code === 200) {
        //     wx.showToast({
        //         icon:"none",
        //         title: "登录成功,即将跳转"
        //     })
        // }else if(code === 400){
        //     wx.showToast({
        //         icon:"none",
        //         title: "帐号格式不正确,请检查"
        //     })
        // }else if(code === 501){
        //     wx.showToast({
        //         icon:"none",
        //         title: "该账号不存在,请检查"
        //     })
        // }else if(code === 502){
        //     wx.showToast({
        //         icon:"none",
        //         title: "密码错误,请重新输入"
        //     })
        // }

        // 使用策略模式写法,优化上述代码
        const codeFns = {
            200(){
                wx.showToast({
                    icon:"none",
                    title: "登录成功,即将跳转"
                });

                wx.setStorageSync("userInfo",result.profile);

                wx.switchTab({
                  url: '/pages/personal/personal',
                })
            },
            400(){
                wx.showToast({
                    icon:"none",
                    title: "帐号格式不正确,请检查"
                })
            },
            501(){
                wx.showToast({
                    icon:"none",
                    title: "该账号不存在,请检查"
                })
            },
            502(){
                wx.showToast({
                    icon:"none",
                    title: "密码错误,请重新输入"
                })
            },
            // created(){},
            // mounted(){}
        }

        codeFns[code]&&codeFns[code]();
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