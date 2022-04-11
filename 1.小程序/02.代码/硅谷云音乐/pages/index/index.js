// pages/index/index.js
import myAxios from '../../utils/myAxios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储轮播图相关数据
        banners:[],

        // 用于存储推荐歌曲区域相关数据
        recommendList:[],

        // 用于存储排行榜区域的相关数据
        topList:[]
    },

    toRecommendSong(){
        wx.navigateTo({
          url: '/pages/recommendSong/recommendSong',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        /*
            发送请求的三个问题
                1.在哪发
                    在onLoad中发送请求,因为该生命周期是最早执行的生命周期
                    
                2.怎么发
                    小程序并没有遵守W3C的语法规范,所以他并不支持BOM和DOM
                    所以此处无法使用ajax发送请求

                    API:wx.request(Object object)

                    注意:小程序中没有window,全局对象是wx

                3.往哪发
                    通过接口文档可以得知
                    请求三要素:
                        1.请求地址
                        2.请求参数
                        3.请求方式
        
        */

        // console.log('window',window)
        // console.log('wx',wx)

        // console.log(1)
        // wx.request({
        //     url:"http://localhost:3000/banner",
        //     data:{
        //         type:2
        //     },
        //     success:(res)=>{
        //         // console.log('success',res.data.banners)
        //         this.setData({
        //             banners:res.data.banners
        //         })
        //     },
        //     fail:()=>{
        //         console.log('fail')
        //     }
        // })
        // console.log(2)

        const res = await myAxios('/banner',{type:2},"GET");
        // console.log('res',res)
        this.setData({
            banners:res.banners
        })

        
        // wx.request({
        //     url:"http://localhost:3000/personalized",
        //     success:(res)=>{
        //         // console.log('success',res)
        //         this.setData({
        //             recommendList:res.data.result
        //         })
        //     },
        //     fail:()=>{
        //         console.log('fail')
        //     }
        // })
        

        const res1 = await myAxios('/personalized');
        // console.log('res',res)
        this.setData({
            recommendList:res1.result
        })
        

        const topList = [];

        // 准备请求的榜单的id
        const arr = [2,6,7,10,23];

        for(var i =0;i<arr.length;i++){
            const res2 = await myAxios('/top/list',{idx:arr[i]});
            // console.log('res2',res2)
            const obj = {
                id:res2.playlist.id,
                name:res2.playlist.name,
                list:res2.playlist.tracks.slice(0,3).map((item)=>{
                    return item.al
                })
            }
            // console.log('obj',obj)
            topList.push(obj);
            this.setData({
                topList
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