<!--
 * @Description: 首页
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-07 17:03:41
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
				keyword: '',
				swiperList: [
					require('@/static/image/demo/swiper1.png'),
					require('@/static/image/demo/swiper2.png'),
				]
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		methods: {}
	}
</script>

<style scoped>
</style>