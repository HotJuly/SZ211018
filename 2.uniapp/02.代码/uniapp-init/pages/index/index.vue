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
			title: 'Hello'
		};
	},
	onLoad() {},
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
</style>
