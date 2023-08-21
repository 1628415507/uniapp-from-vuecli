<!--
 * @Description: 装车详情
 * @Date: 2023-08-17 09:45:35
 * @LastEditTime: 2023-08-21 16:44:18
-->

<template>
	<view class="loading-detail-page">
		<!-- 列表 -->
		<scroll-view scroll-y="" :style="{height: 'calc(100vh - 50rpx)'}">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in dataList" :key="index">
					<view class="list-item__content">
						<view class="content-top">
							<view class="content-top__value ellipsis">
								任务单：{{item.taskNo}}
							</view>
							<view class="content-top__tips flex-sb">
								<u-icon name="car" color="#86909C" size="40"></u-icon>
								提货任务
							</view>
						</view>
						<view class="content-middle g-steps-wrap">
							<u-steps :current="0" direction="column">
								<view v-for="(stepsItem,stepsIndex) in item.stepsList" :key="stepsIndex"
									class="steps-item-wrap">
									<u-steps-item :title="stepsItem.stationName"
										:desc="'计划发车时间：'+stepsItem.stationTime">
										<text class="steps-icon" :class="stepsItem.stationType==='LOAD'?'blue':''"
											slot="icon">
											{{STATION_TYPE[stepsItem.stationType]}}
										</text>
									</u-steps-item>
								</view>
							</u-steps>
						</view>
						<view class="content-bottom">
							<view class="content-bottom__value flex-sb">
								<text class="txt ellipsis">重量：{{item.planTotalWeight ||'-'}}</text>
								<text class="txt ellipsis">体积：{{item.planTotalVolume ||'-'}}</text>
								<text class="txt ellipsis">件数：{{item.planTotalQty ||'-'}}</text>
							</view>
						</view>
					</view>
					<view class="list-item__footer flex-sb">
						<view class="btn-item" @click="reportAbnormal(item)">异常上报</view>
						<view class="btn-item" @click="goDetail(item)">任务详情</view>
						<view class="btn-item highlight">装车完成</view>
					</view>
				</view>
				<!-- <u-empty v-if='isRequired && (dataList.length == 0)' text="暂无数据" mode="data"  margin-top="200"></u-empty> -->
			</view>
		</scroll-view>

		<!-- 异常上报 -->
		<ReportPopup v-if="reportPopupShow" :show.sync="reportPopupShow" @confirm="confirmReportPopup">
		</ReportPopup>

	</view>
</template>

<script>
	import {
		getDetailList
	} from '@/apis/loading-detail.js'
	import ReportPopup from "./component/report-popup.vue";
	import TabBar from '@/components/tab-bar'
	const tempData = [{
		id: '1',
		carNum: 'CN091231231',
		date: '2023-12-12',
		num: '0.00 CDM',
		isExpand: true,
		stepsList: [{
			address: '深圳龙湖分拨中心',
			time: '2023-12-12 12:12:12'
		}, {
			address: '厦门吉联分拨中心',
			time: '2023-12-12 12:12:12'
		}]
	}, {
		id: '2',
		carNum: 'CN091231231',
		date: '2023-12-12',
		num: '0.00 CDM',
		isExpand: false,
		stepsList: [{
			address: '深圳龙湖分拨中心',
			time: '2023-12-12 12:12:12'
		}, {
			address: '厦门吉联分拨中心',
			time: '2023-12-12 12:12:12'
		}]
	}, {
		id: '3',
		carNum: 'CN091231231',
		date: '2023-12-12',
		num: '0.00 CDM',
		isExpand: false,
		stepsList: [{
			address: '深圳龙湖分拨中心',
			time: '2023-12-12 12:12:12'
		}, {
			address: '厦门吉联分拨中心',
			time: '2023-12-12 12:12:12'
		}]
	}]
	export default {
		components: {
			TabBar,
			ReportPopup
		},
		data() {
			return {
				// 公共
				// 异常上报
				reportPopupShow: false,
				// 列表
				dataList: [],
				STATION_TYPE: {
					UNLOAD: '卸',
					LOAD: '装'
				}
			}
		},
		onLoad(opt) {
			console.log('opt', opt)
			this.getDataList(opt.id)
		},
		methods: {
			getDataList(id) {
				// this.dataList = tempData
				getDetailList({
					mtsDispatchId: id
				}).then(res => {
					this.dataList = res.data.taskList.map(item => {
						return {
							...item,
							planTotalWeight: item.planTotalWeight?.toFixed(2),
							planTotalVolume: item.planTotalVolume?.toFixed(2),
							planTotalQty: item.planTotalQty?.toFixed(2),
							stepsList: [{
									stationName: item.originStationName,
									stationAddress: item.originStationAddress,
									stationTime: item.reqPickupTime,
									stationType: 'LOAD'
								},
								{
									stationName: item.destStationName,
									stationAddress: item.destStationAddr,
									stationTime: item.reqArrivalTime,
									stationType: 'UNLOAD'
								}
							]
						}
					})
				})
			},
			reportAbnormal() {
				this.reportPopupShow = true
			},
			confirmReportPopup() {},
			goDetail(item) {
				console.log('item', item)
				uni.navigateTo({
					url: `/pages/sub-packages/loading-detail/detail?id=${item.id}`
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	.loading-detail-page {
		padding: 0 32rpx;
	}

	.list-wrap {
		// padding-bottom: 50rpx;

		.list-item {
			margin-bottom: 24rpx;
			box-sizing: border-box;
			width: 100%;
			background: #FFFFFF;
			border-radius: 16rpx;

			.list-item__content {
				box-sizing: border-box;
				padding: 24rpx;

				.content-top {
					border-bottom: 2rpx solid $colorBorder;
					padding-bottom: 24rpx;


					.content-top__tips {
						width: 140rpx;
						margin-top: 16rpx;
						font-size: 24rpx;
						color: #86909C;
					}
				}

				// 步骤条
				.content-middle {
					// padding: 24rpx 0;
					margin-top: 24rpx;

					.steps-item-wrap {
						position: relative;
						height: 76rpx;
						margin-bottom: 20rpx;

						.map-icon {
							position: absolute;
							top: 38rpx;
							right: 117rpx
						}

						.steps-icon {
							width: 64rpx;
							height: 64rpx;
							line-height: 64rpx;
							text-align: center;
							background: #008474;
							border-radius: 50%;
							font-size: 28rpx;
							color: #FFFFFF;
						}

						.blue {
							background: #2572CC;
						}
					}

				}

				.content-bottom {
					font-size: 24rpx;

					.content-bottom__value {

						.txt {
							min-width: 25%;
							color: #4E5969;
						}
					}

					.content-bottom__tips {
						margin-top: 24rpx;

						.content-bottom__tips-item {
							width: 90rpx;
							color: #86909C;

							.arrow-icon {
								transform-origin: center;
								transform: rotate(90deg);
							}
						}
					}
				}
			}

			.list-item__footer {
				height: 96rpx;
				line-height: 96rpx;
				border-top: 2rpx solid $colorBorder;
				color: $colorFontTitle;

				.btn-item {
					text-align: center;
					width: 100%;
					font-size: 34rpx;
					font-weight: 400;
					border-right: 2rpx solid $colorBorder;

					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>