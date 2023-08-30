<!--
 * @Description: 底部菜单栏
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-30 15:33:07
-->
<template>
	<u-tabbar :border="false" :value="activeTab" :fixed="true" :placeholder="false" :safeAreaInsetBottom="false"
		:activeColor="colorTheme" inactiveColor="#666666" @change="handleTabChange">
		<u-tabbar-item v-for="item in tabList" :key="item.name" :text="item.text" :name="item.name">
			<u-image slot="active-icon" :src="item.activeIcon" width="40rpx" height="40rpx"></u-image>
			<u-image slot="inactive-icon" :src="item.inactiveIcon" width="40rpx" height="40rpx"></u-image>
		</u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				colorTheme: this.$store.getters.colorTheme,
				activeTab: this.$store.getters.activeTab,
				tabList: [{
						text: '报价',
						name: 'home',
						activeIcon: require('@/static/image/icons/quote-active.svg'),
						inactiveIcon: require('@/static/image/icons/quote-inactive.svg'),
						url: '/pages/home/index'
					},
					{
						text: '已中标',
						name: 'bidding',
						activeIcon: require('@/static/image/icons/bidding-active.svg'),
						inactiveIcon: require('@/static/image/icons/bidding-inactive.svg'),
						url: '/pages/bidding/index'
					},
					// {
					// 	text: 'Demo',
					// 	name: 'demo',
					// 	activeIcon: 'https://cdn.uviewui.com/uview/common/bell-selected.png',
					// 	inactiveIcon: 'https://cdn.uviewui.com/uview/common/bell.png',
					// 	url: '/pages/demo/index'
					// },
					{
						text: '我的',
						name: 'account',
						activeIcon: require('@/static/image/icons/account-active.svg'),
						inactiveIcon: require('@/static/image/icons/account-inactive.svg'),
						url: '/pages/user/index'
					}
				]
			};
		},
		onLoad() {},
		methods: {
			handleTabChange(val) {
				this.$store.dispatch('user/setActiveTab', val);
				const activeTabInfo = this.tabList.find(item => item.name === val);
				console.log('handleTabChange', val, activeTabInfo, activeTabInfo.url);
				uni.switchTab({
					url: activeTabInfo.url
				});
			},
		}
	};
</script>
<style lang="scss" scoped>
	.scan-wrap {
		margin-top: -30rpx;
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #008474;
		border-radius: 50%;
		text-align: center;
		border: 8rpx solid #fff;
	}
</style>