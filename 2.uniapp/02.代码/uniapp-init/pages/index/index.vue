<template>
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="/static/images/logo.png" mode=""></image>
			<view class="search">
				<view class="iconfont icon-sousuo"></view>
				<input 
				class="searchInput" 
				type="text" 
				placeholder="搜索商品" 
				placeholder-class="placeholder"
				value="" />
			</view>
			<button class="username">七月</button>
		</view>
		
		<scroll-view class="navScroll" scroll-x="true" enable-flex="true">
			<view class="navItem active">推荐</view>
			<view 
			class="navItem"
			v-for="item in indexData.kingKongModule.kingKongList"
			:key="item.L1Id"
			>{{item.text}}</view>
		</scroll-view>
	</view>
	<!-- <div>
		123
	</div> -->
	<!-- uniapp兼容小程序的组件,也支持html的标签,推荐大家使用小程序组件 -->
</template>

<script>
export default {
	data() {
		return {
			indexData:{}
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
	created() {
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
		uni.request({
			url:"http://localhost:3000/getIndexData",
			success:(res)=>{
				// console.log('res',res)
				this.indexData = res.data;
			}
		})
	},
	// onLoad() {
	// 	console.log('onLoad')
	// },
	// mounted() {
	// 	console.log('mounted')
	// },
	methods: {}
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
		display flex
		.navItem
			width 140upx
			height 80upx
			font-size 28upx
			flex-shrink 0
			text-align center
			line-height 80upx
			&.active
				border-bottom 4upx solid red
</style>
