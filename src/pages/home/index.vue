<!--
 * @Description: 首页
 * @Date: 2023-12-04 09:27:20
 * @LastEditTime: 2023-09-05 18:31:07
-->
<template>
	<view class="home-page">
		<view class="item-card-wrap">
			<view class="item-card flex-sb" @click="clickCard('IN')">
				<view class="card-title">
					入库
				</view>
				<u--image :src="require('@/static/image/in-store.png')" width="272rpx" height="167rpx"></u--image>
			</view>
			<view class="item-card  flex-sb" @click="clickCard('OUT')">
				<view class="card-title">
					出库
				</view>
				<u--image :src="require('@/static/image/out-store.png')" width="272rpx" height="167rpx"></u--image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {

			}
		},
		onLoad() {
			uni.hideTabBar() //隐藏原生的导航栏
		},
		methods: {
			// 完成状态切换
			clickCard(type) {
				if (type === 'IN') {
					uni.navigateTo({
						url: `/pages/sub-packages/in-storage/index`
					});
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #E7F3F4 0%, rgba(231, 243, 244, 0) 50%, #fefefe, #fdfdfd, #fff) !important;
	}

	.home-page {
		padding: 0 32rpx;

		.item-card-wrap {
			.item-card {
				margin: 48rpx auto;
				box-sizing: border-box;
				padding: 44rpx 34rpx 44rpx 104rpx;
				width: 100%;
				height: 264rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				border: 2rpx solid #fff;

				.card-title {
					font-size: 48rpx;
					font-weight: 400;
					color: #1D2129;
				}

				&:active {
					background: #DEF2EF;
					border-radius: 16rpx;
					border: 2rpx solid #008474;
				}
			}
		}
	}
</style>