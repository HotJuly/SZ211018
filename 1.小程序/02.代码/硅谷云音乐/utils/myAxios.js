
/*
    封装代码的核心思想
        1.将公共的部分保留下来
        2.每次都不相同的内容提取出去

    封装函数
        1.将重复出现的代码保留下来
        2.将每次都不同的内容提取成形参
        3.谁调用谁传入

*/

import config from './config';

export default function(url,data={},method="GET"){
    // let result;
    return new Promise((resolve,reject)=>{
        wx.request({
            url:config.host + url,
            data,
            method,
            success:(res)=>{
                // console.log('success',res)
                // result = res;

                // 类似于axios中响应拦截器的操作,直接返回响应报文中的响应体数据
                resolve(res.data);
            },
            fail:(error)=>{
                // console.log('fail')
                reject(error)
            }
        })
    })
    // return result;
}
