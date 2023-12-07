<!--
 * @Description: 
 * @Date: 2023-08-05 14:40:11
 * @LastEditTime: 2023-08-05 14:44:33
-->
<template>
	<view class="noData" :style="{marginTop:marginTop+'rpx'}">
		<view class="img-wrap">
			<image :src="icon" mode="widthFix"></image>
		</view>
		<view class="empty-text">{{text}}</view>
	</view>
</template>

<script>
	export default {
		// import引入的组件需要注入到对象中才能使用
		props: {
			text: {
				type: String,
				default: ''
			},
			marginTop: {
				type: Number,
				default: 0
			}
		},
		data() {
			// 这里存放数据
			return {
				icon: require('@/static/image/empty.png')
			}
		},

		// 监听属性 类似于data概念
		computed: {},

		// 监控data中的数据变化
		watch: {},

		// 生命周期 - 创建完成（可以访问当前this实例）
		onLoad(options) {},

		// 生命周期 - 页面展示（不可以访问DOM元素）
		onShow() {},

		// 生命周期 - 挂载完成（可以访问DOM元素）
		onReady() {},

		// 存放方法事件 - 会在数据变化时被调用
		methods: {}

	}
</script>

<style lang="scss" scoped>
	.noData {
		/* width: 100%; */
		margin: 0 auto;
		box-sizing: border-box;
		width: 576rpx;
		padding: 34rpx 72rpx;
		height: 432rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.img-wrap {
			width: 100%;
			height: 100%;
			// margin-bottom: 22rpx;

			image {
				width: 100%;
			}
		}

		.empty-text {
			position: relative;
			top: -45rpx;
			color: #A9AEB8;
			font-size: 24rpx;
			font-weight: 400;
		}
	}
</style>