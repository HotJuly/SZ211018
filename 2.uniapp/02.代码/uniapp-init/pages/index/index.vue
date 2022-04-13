<template>
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="/static/images/logo.png" mode=""></image>
			<view class="search">
				<view class="iconfont icon-sousuo"></view>
				<input class="searchInput" type="text" placeholder="搜索商品" placeholder-class="placeholder" value="" />
			</view>
			<button class="username">七月</button>
		</view>

		<scroll-view v-if="indexData.kingKongModule" class="navScroll" scroll-x="true" enable-flex="true">
			<!-- <view class="navItem" :class="navIndex===-1?'active':''">推荐</view> -->
			<view 
			class="navItem" 
			:class="{
				active:navIndex===-1
			}"
			@tap="changeNavIndex(-1)"
			>推荐</view>
			<view 
			class="navItem" 
			v-for="(item,index) in indexData.kingKongModule.kingKongList" 
			:key="item.L1Id"
			:class="{
				active:navIndex===index
			}"
			@tap="changeNavIndex(index)"
			>{{ item.text }}</view>
		</scroll-view>
		
		<scroll-view class="contentScroll" scroll-y="true" >
			<Recommend v-if="navIndex===-1"></Recommend>
			<CateList v-else></CateList>
		</scroll-view>
	</view>
	
	<!-- <div>
		123
	</div> -->
	<!-- uniapp兼容小程序的组件,也支持html的标签,推荐大家使用小程序组件 -->
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Recommend from '../../components/Recommend/Recommend.vue'
import CateList from '../../components/CateList/CateList.vue'
export default {
	data() {
		return {
			// indexData: {}
			navIndex:-1
		};
	},
	/*
		发送请求的三个问题
			1.在哪发
				Vue->created或者mounted中发送
				小程序->onLoad或者onShow中发送
				uniapp->同时兼容Vue和小程序的生命周期,哪种顺手就使用哪种
			2.怎么发
				Vue->axios
				小程序->wx.request
				uniapp->uni.request
				uniapp的API文档与小程序的API文档几乎相同,甚至可以看着小程序的API文档开发uniapp
			3.往哪发
				通过服务器中注册的路由信息,可以查看到
	*/
	async created() {
		// console.log('created')
		/*
			知识点整理
				组件
					使用小程序的组件
				API
					使用小程序的API,也可以使用uni专用API(推荐)
				响应式单位
					使用小程序的rpx,也可以使用uni专用upx(推荐)
					
				指令和模版解析语法
					使用Vue的语法
				状态数据更新语法
					使用Vue的语法
				生命周期
					Vue或者小程序都可以
		
		*/
		
		// const result = await this.$myAxios('/getIndexData');
		// // console.log('result',result)
		// this.indexData = result;
		
		// console.log(1,this.$store.state.home.initData)
		// console.log(2,this.initData2)
		// console.log(3,this.initData3)
		// console.log(4,this.initData)
		// console.log(5,this.initData5)
		
		this.getIndexData();
	},
	// onLoad() {
	// 	console.log('onLoad')
	// },
	// mounted() {
	// 	console.log('mounted')
	// },
	methods: {
		changeNavIndex(index){
			this.navIndex = index;
		},
		...mapActions("home",["getIndexData"])
	},
	computed:{
		/*
			面试题:computed和watch的了解
			回答:
				1.相同点
					computed和watch都具有监视某个响应式属性的效果,
						如果响应式属性发生变化,那么他们的回调函数就会自动执行
					
					computed和watch都是一个函数
				2.不同点
					1.使用场景
						computed
							计算属性是根据当前的响应式属性,来计算出一个结果,并将该结果在模版/代码中进行使用
							回调函数的返回值有效
							计算属性在模版中使用方式相当于是一个状态数据
							
							如果你现在需要一个数据,可惜你手头没有该数据,
								但是可以通过现有的某些数据计算得到,那么就选择使用computed
								
							例如:购物车模块的总价等功能
							
						watch
							监视是当被监视的响应式属性发生变化的时候,会自动执行回调函数
							回调函数的返回值无效
							
							如果现在某个数据发生变化,你需要做一些事情,那么就选择使用watch
							
							例如:搜索页面再次搜索某个商品,需要根据最新的关键字信息发送请求
							
					2.computed有可能在页面上多次使用到,所以computed具有缓存功能
						只要被监视的响应式属性没有发生变化,computed就不会重新执行计算,会直接复用上一次计算的结果
						
					小总结:个人认为computed更注重于结果,watch更注重于过程
		*/
	   // initData2(){
		  //  return this.$store.state.home.initData;
	   // },
	   // ...mapState({
		  //  initData3:state=>state.home.initData
	   // })
	   // ...mapState("home",["initData"])
	   // ...mapState("home",{
		  //  initData5:"initData"
	   // })
		...mapState("home",["indexData"])
	},
	watch:{
		
	},
	components:{
		CateList,
		Recommend
	}
};
</script>

<style lang="stylus">
.indexContainer
	.header
		display flex
		align-items center
		padding-top 20upx
		.logo
			width 118upx
			height 40upx
			margin 0 20upx
		.search
			position relative
			height 60upx
			background-color #ccc
			border-radius 10upx
			padding-left 60rpx
			flex-grow 1
			.iconfont
				position absolute
				top 50%
				transform translateY(-50%)
				left 20rpx
			.searchInput
				height 100%
				.placeholder
					font-size 24rpx
					text-align center
					text-indent -60rpx
		.username
			width 140upx
			height 60upx
			font-size 24upx
			margin 0 20upx
	.navScroll
		// display flex
		white-space nowrap
		.navItem
			display inline-block
			width 140upx
			height 80upx
			font-size 28upx
			flex-shrink 0
			text-align center
			line-height 80upx
			&.active
				border-bottom 4upx solid red
	.contentScroll
		height calc( 100vh - 80upx - 84upx - var(--window-top) - var(--window-bottom))
		
</style>
