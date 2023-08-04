<template>
	<view class="content">
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
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
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true
			}
		},
		onLoad() {
			// uni.hideTabBar()
		},
	}
</script>