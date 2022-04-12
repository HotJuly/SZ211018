const Koa = require('koa');
const KoaRouter = require('koa-router');

// 1.创建服务器应用实例对象
const app = new Koa();

// 3.注册路由,接收请求

//3.1创建路由器实例对象
const router = new KoaRouter();

// 3.2使用中间件函数
// 声明使用注册的所有路由
app.use(router.routes());

// 3.3注册路由
// 返回数据的手段,ctx.body=需要返回的数据
router.get('/test',(ctx)=>{
	console.log('test success')
	// ctx.body="test success"
	ctx.body={
		msg:"test success"
	}
})

// 2.监视电脑端口,并将服务器应用实例运行在该端口上
app.listen('3001',function(error){
	if(error){
		console.log('服务器启动失败',error);
	}else{
		console.log('服务器启动成功,地址为http://localhost:3001')
	}
})