<!--
 * @Description: 已中标
 * @Date: 2023-08-23 10:56:33
 * @LastEditTime: 2023-08-23 15:13:32
-->
<template>
	<view class="bidding-page">
		<!-- 列表 -->
		<scroll-view scroll-y="" :style="{height: 'calc(100vh - 150rpx)'}">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in dataList" :key="index">
					<view class="list-item__content">
						<view class="content-top flex-sb">
							<view class="content-top__left flex-col-sb">
								<text class="title ellipsis">询价标题</text>
								<view class="price">
									中标价格 {{index||'-'}}
								</view>
							</view>
						</view>
						<view class="content-middle">
							<view class="content-middle__item flex">
								<u-image class="img-icon" :src="require('@/static/image/icons/compass.svg')"
									width="37rpx" height="37rpx"></u-image>
								<text class="cm-txt">总里程 {{item.planTotalWeight}}</text>
							</view>
							<view class="content-middle__item flex">
								<u-image class="img-icon" :src="require('@/static/image/icons/frame.svg')" width="37rpx"
									height="37rpx"></u-image>
								<text class="cm-txt">运输方式 水运</text>
							</view>
						</view>
						<view class="content-bottom">
							<view class="flex-sb">
								<view class="content-bottom__item">
									<view class="label">计划总数量</view>
									<view class="value">{{item.planTotalQty ||'-'}} KG</view>
								</view>
								<view class="content-bottom__item">
									<view class="label">计划总体积</view>
									<view class="value">{{item.planTotalVolume ||'-'}} CDM</view>
								</view>
								<view class="content-bottom__item">
									<view class="label">计划总重量</view>
									<view class="value">{{item.planTotalWeight ||'-'}} CT</view>
								</view>
							</view>
						</view>
					</view>

				</view>
				<u-empty v-if='isRequired && (dataList.length === 0)' text="暂无数据" mode="list" margin-top="200"
					iconSize="100" textSize="28rpx"></u-empty>
			</view>
		</scroll-view>
		<!-- 确认框 -->
		<u-modal :show="confirmShow" content='是否确认操作?' :showCancelButton="true" :confirmColor="colorTheme"
			@cancel="confirmShow=false" @confirm="confirmUpdateStatus">
		</u-modal>
		<!-- 底部菜单栏 -->
		<TabBar class="g-tabbar-wrap"></TabBar>
	</view>
</template>

<script>
	import {
		getList,
		updateNode
	} from '@/apis/quoted-detail.js'
	import TabBar from '@/components/tab-bar'
	const tempData = [{
		mtsDispatchId: '1',
		dispatchNo: 'CN091231231',
		stationDatetime: '2023-12-12',
		num: '0.00 CDM',
		isExpand: false,
		taskStationList: [{
			stationName: '深圳龙湖分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}, {
			stationName: '厦门吉联分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}, {
			stationName: '厦门吉联分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}]
	}, {
		mtsDispatchId: '2',
		dispatchNo: 'CN091231231',
		stationDatetime: '2023-12-12',
		num: '0.00 CDM',
		isExpand: false,
		taskStationList: [{
			stationName: '深圳龙湖分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}, {
			stationName: '厦门吉联分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}, {
			stationName: '厦门吉联分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}]
	}, {
		mtsDispatchId: '3',
		dispatchNo: 'CN091231231',
		stationDatetime: '2023-12-12',
		num: '0.00 CDM',
		isExpand: false,
		taskStationList: [{
			stationName: '深圳龙湖分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}, {
			stationName: '厦门吉联分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}, {
			stationName: '厦门吉联分拨中心',
			stationDatetime: '2023-12-12 12:12:12'
		}]
	}]
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				// 列表
				isRequired: false, //是否请求完
				dataList: [],
				clickItem: {},
				// 确认框
				confirmShow: false
			}
		},
		onLoad() {
			uni.hideTabBar() //隐藏原生的导航栏
			this.getDataList()
		},
		methods: {
			// 获取列表数据
			getDataList() {
				// this.dataList = tempData
				this.isRequired = false
				getList({
					dispatchStatus: this.dispatchStatus
				}).then(res => {
					this.dataList = res.data.map(item => {
						return {
							...item,
							planTotalWeight: item.planTotalWeight.toFixed(2),
							planTotalVolume: item.planTotalVolume.toFixed(2),
							planTotalQty: item.planTotalQty.toFixed(2),
						}
					})
				}).finally(() => {
					this.isRequired = true
				})
			},
			// 路径跳转
			goUrl(item, type) {
				console.log('【 goUrl 】-168', type)
				if (type === 'loading') {
					uni.navigateTo({
						url: `/pages/sub-packages/quoted-detail/index?id=${item.mtsDispatchId}`
					});
				}
			},
			handleItemClick(item) {
				this.confirmShow = true
				this.clickItem = item
			},
			// 更新节点状态
			confirmUpdateStatus() {
				const {
					mtsDispatchId,
					overallNextTaskStatus
				} = this.clickItem
				updateNode({
					mtsDispatchId,
					taskStatus: overallNextTaskStatus,
				}).then(res => {
					uni.showToast({
						icon: 'none',
						title: '操作成功',
						duration: 2000
					})
					this.getDataList()
					this.confirmShow = false
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	.bidding-page {
		padding: 0 32rpx;
	}

	.list-wrap {
		padding-bottom: 50rpx;

		.list-item {
			margin-bottom: 24rpx;
			box-sizing: border-box;
			width: 100%;
			background: #FFFFFF;
			border-radius: 16rpx;

			.label {
				font-size: 24rpx;
				color: #86909C;
			}

			.list-item__content {
				box-sizing: border-box;
				padding: 24rpx;

				.content-top {
					border-bottom: 2rpx solid $colorBorder;
					padding-bottom: 24rpx;

					.content-top__left {
						height: 100%;

						.title {
							font-size: 32rpx;
							font-weight: 500;
						}

						.price {
							margin-top: 10rpx;
							font-size: 30rpx;
							font-weight: 400;
							color: #4E5969;
						}
					}
				}

				.content-middle {
					margin: 24rpx auto;
					font-size: 30rpx;
					font-weight: 500;
					color: #1D2129;

					.content-middle__item {
						margin: 15rpx;
					}

					.cm-txt {
						margin-left: 15rpx;
					}
				}

				// 信息
				.content-bottom {
					font-size: 24rpx;

					.content-bottom__item {
						text-align: center;

						.value {
							margin-top: 10rpx;
							font-size: 30rpx;
						}
					}
				}
			}
		}
	}
</style>