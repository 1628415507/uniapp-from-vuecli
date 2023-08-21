<!--
 * @Description: 首页
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-21 09:06:11
-->
<template>
	<view class="home-page">
		<!-- 状态栏 -->
		<view class="subsection-wrap">
			<u-subsection :current="current" :list="subsectionList" mode="button" @change="sectionChange"
				activeColor="#fff" fontSize="28rpx"></u-subsection>
		</view>
		<!-- 列表 -->
		<scroll-view scroll-y="" :style="{height: 'calc(100vh - 265rpx)'}">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in dataList" :key="index">
					<view class="list-item__content">
						<view class="content-top">
							<view class="content-top__value flex-sb">
								<text>装车单：{{item.carNum+index}}</text>
								<view class="content-top__value--right flex-sb">
									<u-icon name="car" :color="colorTheme" size="40"></u-icon>
									<text>整车调度</text>
								</view>
							</view>
							<view class="content-top__tips flex-sb">
								<u-icon name="calendar" color="#86909C" size="40"></u-icon>
								{{item.date||'-'}}
							</view>
						</view>
						<view class="content-middle g-steps-wrap">
							<u-steps :current="0" direction="column">
								<template v-for="(stepsItem,stepsIndex) in item.stepsList">
									<!-- 展开：展示全部； 收起：只展示前两条 -->
									<view v-show="item.isExpand?stepsIndex>=0:stepsIndex<2" :key="stepsIndex"
										class="steps-item-wrap" :class="!item.isExpand&&stepsIndex>=1?'hiddenLine':''">
										<u-steps-item :title="stepsItem.address" :desc="'计划发车时间：'+stepsItem.time">
											<text class="steps-icon" :class="stepsIndex>0?'':'blue'" slot="icon">
												{{stepsIndex>0?'卸':'装'}}
											</text>
										</u-steps-item>
										<view class="map-icon" @click="goDetail(item,'map')">
											<u-icon name="map" color="#2572CC" size="32"></u-icon>
										</view>
									</view>
								</template>
							</u-steps>
						</view>
						<view class="content-bottom">
							<view class="content-bottom__value flex-sb">
								<text class="txt">重量：{{item.num ||'-'}}</text>
								<text class="txt">体积：{{item.num ||'-'}}</text>
								<text class="txt">件数：{{item.num ||'-'}}</text>
							</view>
							<view class="content-bottom__tips flex-c" @click="handleExpand(item,index)">
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
							</view>
						</view>
					</view>
					<view class="list-item__footer flex-sb">
						<view class="btn-item" @click="goDetail(item,'loading')">装车详情</view>
						<view class="btn-item highlight">装车完成</view>
					</view>
				</view>
				<!-- <u-empty v-if='isRequired && (dataList.length == 0)' text="暂无数据" mode="data"  margin-top="200"></u-empty> -->
			</view>
		</scroll-view>

		<!-- 底部菜单栏 -->
		<TabBar class="g-tabbar-wrap"></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/tab-bar'
	const tempData = [{
		id: '1',
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
	}]
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				// 状态栏
				current: 0,
				subsectionList: [{
					name: '未完成',
				}, {
					name: '已完成',
				}],
				// 列表
				dataList: [],
			}
		},
		onLoad() {
			uni.hideTabBar() //隐藏原生的导航栏
			this.getDataList()
		},
		methods: {
			getDataList() {
				this.dataList = tempData
			},
			sectionChange(index) {
				this.current = index;
			},
			// 装车详情
			goDetail(item, type) {
				console.log('【 goDetail 】-168', type)
				if (type === 'loading') {
					uni.navigateTo({
						url: `/pages/sub-packages/loading-detail/index?id=${item.id}`
					});
				}
				if (type === 'map') {
					// uni.navigateTo({
					// 	url: `/pages/sub-packages/example/amap`
					// })
				}
			},
			// 展开收起
			handleExpand(item, index) {
				console.log('【 item 】-168', item)
				this.$set(item, 'isExpand', !item.isExpand)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	.home-page {
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

			.list-item__content {
				box-sizing: border-box;
				padding: 24rpx;

				.content-top {
					border-bottom: 2rpx solid $colorBorder;
					padding-bottom: 24rpx;

					.content-top__value {
						.content-top__value--right {
							width: 140rpx;
							font-size: 24rpx;
							color: $colorTheme;
							line-height: 34rpx;
						}
					}

					.content-top__tips {
						width: 175rpx;
						margin-top: 16rpx;
						font-size: 24rpx;
						color: #86909C;
					}
				}

				// 步骤条
				.content-middle {
					// padding: 24rpx 0;
					margin-top: 24rpx;
					margin-bottom: 14rpx;

					.steps-item-wrap {
						position: relative;
						height: 76rpx;
						margin-bottom: 20rpx;

						.map-icon {
							position: absolute;
							top: 39rpx;
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

				// 信息
				.content-bottom {
					font-size: 24rpx;

					.content-bottom__value {

						.txt {
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
				color: #1D2129;

				.btn-item {
					text-align: center;
					width: 50%;
					font-size: 34rpx;
					font-weight: 400;

					&:first-child {
						border-right: 2rpx solid $colorBorder;
					}
				}
			}
		}
	}

	// //步骤条-默认样式修改
	::v-deep .content-middle .u-steps {

		// 收起状态下第二竖条线隐藏
		.hiddenLine {
			.u-steps-item__line--column {
				display: none !important;
			}
		}
	}

	// 分段器-默认样式修改
	::v-deep .subsection-wrap {
		margin: 20rpx auto 32rpx auto;
		box-sizing: border-box;
		background: linear-gradient(90deg, rgba(0, 132, 116, 1), rgba(255, 255, 255, 0.3));
		border-radius: 72rpx;
		padding: 2rpx;

		.u-subsection {
			background-color: rgba(255, 255, 255, 0.8) !important;
			border-radius: 72rpx !important;

			.u-subsection__item {
				border-radius: 72rpx !important;
			}

			.u-subsection__item__text {
				font-weight: normal !important;
			}

			.u-subsection--button__bar {
				background-color: #008474 !important;
				border-radius: 72px !important;
			}
		}
	}
</style>