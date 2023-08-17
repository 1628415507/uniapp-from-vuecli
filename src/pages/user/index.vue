<!--
 * @Description: 
 * @Date: 2023-08-04 09:26:48
 * @LastEditTime: 2023-08-17 18:37:58
-->
<template>
	<view>
		<text>用户名：{{userName}}</text>
		<view @click="goDetail"> 详情页跳转</view>
		<view class="com-footer-btn flex-c">
			<u-button type="error" @click="logout">退出登录</u-button>
		</view>
		<!-- 弹框 -->
		<!-- <u-button @click="show = true">打开ActionSheet</u-button> -->
		<!-- <u-action-sheet :actions="list" :title="title" :show="show"></u-action-sheet> -->
		<!-- 底部菜单栏 -->
		<TabBar class="tabbar-wrap"></TabBar>
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
				userName: '',
				title: '标题',
				list: [{
						name: '选项一',
						subname: "选项一描述",
						color: '#ffaa7f',
						fontSize: '20'
					},
					{
						name: '选项二禁用',
						disabled: true
					},
					{
						name: '开启load加载', //开启后文字不显示
						loading: true
					}
				],
				show: false
			}
		},
		created() {
			this.userName = this.$store.state.user.userName;
		},
		onLoad() {
			uni.hideTabBar()
		},
		methods: {
			goDetail() {
				uni.navigateTo({
					url: `/pages/sub-packages/example/detail`
				})
			},
			logout() {
				this.$store.dispatch('user/logout'); // 清除
				uni.redirectTo({
					url: `/pages/login/index`
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	::v-deep .tabbar-wrap {
		.u-tabbar__content {
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.15) !important;
		}

		.u-icon__icon {
			font-size: 43rpx !important;
		}

		.u-tabbar-item__text {
			font-size: 24rpx !important;
		}
	}
</style>