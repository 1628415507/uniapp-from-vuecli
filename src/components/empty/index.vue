<!--
 * @Description: 
 * @Date: 2023-08-05 14:40:11
 * @LastEditTime: 2023-08-05 14:44:33
-->
<template>
	<view class="noData">
		<view class="noData-icon">
			<image :src="icon" mode="widthFix"></image>
		</view>
		<view>{{title}}</view>
	</view>
</template>

<script>
	export default {
		// import引入的组件需要注入到对象中才能使用
		components: {},
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			// 这里存放数据
			return {
				icon: '/static/image/noData.png'
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

<style lang='scss' scoped>
	.noData {
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #8c8c8c;
		font-weight: 400;

		.noData-icon {
			width: 160rpx;
			height: 160rpx;
			margin-bottom: 22rpx;

			image {
				width: 100%;
			}
		}
	}
</style>
