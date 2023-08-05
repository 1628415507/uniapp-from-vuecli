<!--
 * @Description: 首页
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-04 17:21:32
-->
<template>
	<view>
		<u-swiper :list="swiperList"></u-swiper>
	  <u-search placeholder="请输入" v-model="keyword"></u-search>
		<!-- <u-icon name="photo" color="#2979ff" size="28"></u-icon> -->
		<!-- 底部菜单栏 -->
		<TabBar></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/tab-bar'
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				keyword:'',
				swiperList: [
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
</style>