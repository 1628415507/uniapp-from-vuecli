<!--
 * @Description: 底部菜单栏
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-18 09:30:36
-->
<template>
	<u-tabbar :border="false" :value="activeTab" :fixed="true" :placeholder="false" :safeAreaInsetBottom="false"
		:activeColor="colorTheme" inactiveColor="#666666" @change="handleTabChange">
		<u-tabbar-item text="首页" icon="grid-fill" name="home"> </u-tabbar-item>
		<view class="scan-wrap flex-c" @click="getScanVal">
			<u-icon name="scan" size="50rpx" color="#fff"></u-icon>
		</view>
		<u-tabbar-item text="我的" icon="account" name="account"> </u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				colorTheme: this.$store.getters.colorTheme,
				activeTab: this.$store.getters.activeTab,
				tabList: [{
						text: '首页',
						name: 'home',
						icon: 'grid-fill',
						url: '/pages/home/index'
					},
					// {
					// 	text: 'Demo',
					// 	name: 'demo',
					// 	icon: 'photo',
					// 	url: '/pages/demo/index'
					// },
					{
						text: '我的',
						name: 'account',
						icon: 'account',
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
			// 扫描
			getScanVal() {
				uni.navigateTo({
					url: `/pages/sub-packages/sign-in/index`
				});
				console.log('getScanVal')
				// 调用uni扫一扫的方法，允许从相机和相册扫码
				// uni.scanCode({
				// 	scanType: ['qrCode'], //条形码
				// 	success: (res) => {

				// 		// console.log('scanCode', res)
				// 		// TODO:取值
				// 		// if (res.errMsg == "scanCode:ok") {
				// 		// 	const val = res.result
				// 		// 	//  this.$set(原数组, 索引值, 需要赋的值)
				// 		// 	uni.navigateTo({
				// 		// 		url: `/pages/sub-packages/sign-in/index`
				// 		// 	});
				// 		// } else {
				// 		// 	console.log("未识别到二维码，请重新尝试！")
				// 		// 	uni.$u.toast('未识别到二维码，请重新尝试！')
				// 		// }
				// 	}
				// });
			}
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