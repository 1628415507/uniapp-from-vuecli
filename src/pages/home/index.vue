<!--
 * @Description: 首页
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-04 15:03:27
-->
<template>
	<view class="content">
		{{'首页'}}
		<!-- <u-swiper :list="list1"></u-swiper> -->
		<!-- 底部tabbar -->
		<TabBar></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar'
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				list1: [
						'https://cdn.uviewui.com/uview/swiper/swiper1.png',
						'https://cdn.uviewui.com/uview/swiper/swiper2.png',
						'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			}
		},
		onLoad() {
      // uni.hideTabBar()
		},
		methods: {}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>