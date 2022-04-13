
/*
	问题:uniapp可以将一套代码编译成多种项目,但是发送请求,每个环境下,url写法不同
	
	需求:根据当前代码运行环境,配置不同的基础路径
		如果是小程序环境下,就使用http://localhost:3000
		如果是h5环境下,就使用/api
		
	拆解:
		1.如何知道当前代码的运行环境
			使用uni.getSystemInfoSync(),可以获取到当前设备相关的信息
				其中就有一个platform属性,可以判断当前代码的运行环境
		2.配置不同的基础路径
			对baseUrl变量进行不同情况的赋值即可

*/

const envObj = {
	devtools:'http://localhost:3000',
	ios:'/api',
	android:'/api'
}
// console.log('data',data)

// const {platform} = uni.getSystemInfoSync();
// const baseUrl = envObj[platform];

// #ifdef H5
// 写在这里面的代码,只会在h5环境下运行
// #endif

// #ifndef H5
// 写在这里面的代码,除了h5环境不运行,其他环境都运行
// #endif

// #ifdef H5
const baseUrl = envObj.ios;
// #endif

// #ifdef MP-WEIXIN
const baseUrl = envObj.devtools;
// #endif

export default function(url,data={},method="GET"){
	
	return new Promise((resolve,reject)=>{
		uni.request({
			// 小程序请求数据,需要书写完整路径
			// url: 'http://localhost:3000/getIndexData',
			
			// h5项目请求数据,需要使用代理规则解决
			url: baseUrl + url,
			data,
			method,
			success: res => {
				// console.log('res',res)
				// this.indexData = res.data;
				resolve(res.data)
			},
			fail:(error)=>{
				reject(error)
			}
		});
	})
}