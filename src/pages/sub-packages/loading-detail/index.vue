<!--
 * @Description: 装车详情
 * @Date: 2023-08-17 09:45:35
 * @LastEditTime: 2023-08-17 10:28:52
-->

<template>
	<view class="loading-detail-page">
		<!-- 列表 -->
		<scroll-view scroll-y="" :style="{height: 'calc(100vh - 50rpx)'}">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in dataList" :key="index">
					<view class="list-item__content">
						<view class="content-top">
							<view class="content-top__value flex-sb">
								<text>任务单：{{item.carNum+index}}</text>
							</view>
							<view class="content-top__tips flex-sb">
								<u-icon name="car" color="#86909C" size="33"></u-icon>
								提货任务
							</view>
						</view>
						<view class="content-middle">
							<u-steps :current="0" direction="column">
								<view v-for="(stepsItem,stepsIndex) in item.stepsList" :key="stepsIndex"
									class="steps-item-wrap">
									<u-steps-item :title="stepsItem.address" :desc="'计划发车时间：'+stepsItem.time">
										<text :class="stepsIndex>0?'steps-icon':'steps-icon blue'" slot="icon">
											{{stepsIndex>0?'卸':'装'}}
										</text>
									</u-steps-item>
									<!-- 	<view class="map-icon">
										<u-icon name="map" color="#2572CC" size="32"></u-icon>
									</view> -->
								</view>
							</u-steps>
						</view>
						<view class="content-bottom">
							<view class="content-bottom__value flex-sb">
								<text class="content-bottom__value--txt">重量：{{item.num ||'-'}}</text>
								<text class="content-bottom__value--txt">体积：{{item.num ||'-'}}</text>
								<text class="content-bottom__value--txt">件数：{{item.num ||'-'}}</text>
							</view>
							<!-- <view class="content-bottom__tips flex-c">
								<view v-if="item.isExpand" class="content-bottom__tips-item flex-sb">
									<view class="arrow-icon">
										<u-icon name="arrow-left-double" color="#86909C" size="32"></u-icon>
									</view>
									收起
								</view>
								<view v-else class="content-bottom__tips-item flex-sb">
									<view class="arrow-icon">
										<u-icon name="arrow-right-double" color="#86909C" size="32"></u-icon>
									</view>
									展开
								</view>
							</view> -->
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
	import ReportPopup from "./component/report-popup.vue";
	import TabBar from '@/components/tab-bar'
	export default {
		components: {
			TabBar,
			ReportPopup
		},
		data() {
			return {
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				s_top: '', //胶囊距离顶部距离
				s_height: '', //胶囊行高	
				// 异常上报
				reportPopupShow: false,
				// 列表
				dataList: [{
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
					}, {
						address: '厦门吉联分拨中心',
						time: '2023-12-12 12:12:12'
					}]
				}],
			}
		},
		onLoad() {},
		methods: {
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
						margin-bottom: 15rpx;

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

						.content-bottom__value--txt {
							width: 30%;
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

	//步骤条-默认样式修改
	::v-deep .content-middle .u-steps {

		// 左侧-图标
		.u-steps-item__wrapper {
			width: 32px !important;
			height: 32px;
		}

		// 左侧-步骤线
		.u-steps-item__line--column {
			left: 32rpx !important;
			background-color: $colorBorder !important;
		}

		.u-steps-item--column {
			padding-bottom: 13px !important;
		}

		.u-steps-item__content--column {
			margin-top: 0rpx !important;
		}

		// 右侧-文字、描述
		.u-text__value {
			font-size: 28rpx !important;
		}

		.u-text__value--tips {
			font-size: 24rpx !important;
			color: #86909C !important;
		}
	}

	// 底部菜单栏-默认样式修改
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