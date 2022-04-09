/*
    封装代码的核心思想
        1.将公共的部分保留下来
        2.每次都不相同的内容提取出去

    封装函数
        1.将重复出现的代码保留下来
        2.将每次都不同的内容提取成形参
        3.谁调用谁传入

    封装组件
        1.将重复出现的结构,样式以及js代码保留下来
        2.将每次都不同的数据提取成props
        3.谁使用谁传入

*/

import config from './config';

export default function (url, data = {}, method = "GET") {
    // let result;
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            data,
            method,
            header:{
                cookie:wx.getStorageSync('cookie')
            },
            success: (res) => {
                // console.log('success', res)
                // result = res;


                // if(url==="/login/cellphone"){
                if(data._isLogin){
                    // 1.获取到当前请求返回的cookie数组
                    const cookies = res.cookies;

                    /* 
                        2.找到以"MUSIC_U"开头的cookie数据
                            返回值:符合条件的cookie字符串
                            返回值的数据类型:string
                    */
                    const cookie = cookies.find((cookie) => {
                        // return cookie.indexOf("MUSIC_U")===0
                        return cookie.startsWith("MUSIC_U")
                    })

                    // 3.将cookie数据存入到Storage中
                    wx.setStorage({
                        key:"cookie",
                        data:cookie
                    })
                }

                // 类似于axios中响应拦截器的操作,直接返回响应报文中的响应体数据
                resolve(res.data);
            },
            fail: (error) => {
                // console.log('fail')
                reject(error)
            }
        })
    })
    // return result;
}