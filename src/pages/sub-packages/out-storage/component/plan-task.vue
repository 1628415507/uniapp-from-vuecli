<template>
	<view class="plan-task">
		<!-- 列表 -->
		<scroll-view :scroll-y="true" :style="{ height: 'calc(100vh - 140rpx)' }" @scroll="scroll"
			@scrolltolower="scrollToLower" :scroll-top="scrollTop">
			<view class="list-wrap">
				<view class="list-item" v-for="(item, index) in tempData" :key="index">
					<view class="item-header-wrap">
						<u-swipe-action :show="isShow" :index="index" class="swipe-action-wrap"
							@click="clickSwipeAction" @open="clickSwipeAction">
							<u-swipe-action-item :options="optList" :show="item.show" @click="clickSwipeActionItem">
								<view class="item-header">
									<view class="item-header__title flex-sb">
										<view class="title">入库任务号:RTG1234567890</view>
										<view class="status" :class="STATUS[item.status] || 'red'">登记中</view>
									</view>
									<view class="item-header__info">
										<view class="flex-sb">
											<text class="text">实际总数量:1234567</text>
											<text class="text">明细行:5行</text>
											<text class="text">操作人:张师傅</text>
										</view>
										<view class="text">实际完成时间:2023-12-12</view>
										<view class="submit flex-c" @click="handleSubmit"> 提交登记 </view>
									</view>
									<view v-if="!item.isExpand" class="item-header-footer flex-c">
										<view class="flex-c" style="width: 15%" @click="handleExpand(item)">
											<view class="arrow-icon">
												<u-icon :name="item.isExpand ? 'arrow-left' : 'arrow-right'"
													color="#86909C" size="36"></u-icon>
											</view>
										</view>
									</view>
								</view>
							</u-swipe-action-item>
						</u-swipe-action>
					</view>
					<view v-if="item.isExpand" class="item-content">
						<u-swipe-action @click="clickSwipeAction">
							<u-swipe-action-item v-for="(subItem, subIndex) in 3" :key="subIndex" :options="optList"
								:show="subItem.show" @click="clickSwipeActionItem">
								<view class="sublist-item">
									<!-- <view class="divider-row"></view> -->
									<view class="content-top flex-sb">
										<view class="content-top__left">
											<u--image :src="require('@/static/image/out-store.png')" width="192rpx"
												height="108rpx"></u--image>
										</view>
										<view class="content-top__right flex-col-sa">
											<view class="desc ellipsis"> 货品名称货品名称货品名货品名称货品名称货品名称货品货称货品货 </view>
											<view class="count"> 20个/箱 </view>
										</view>
									</view>
									<view class="content-middle">
										<view class="text ellipsis">货品编码:123456789012</view>
										<view class="text ellipsis">已登记/计划数:100/1000个</view>
										<view class="text ellipsis">生产日期:2023-12-12</view>
										<view class="text ellipsis">失效日期:2023-12-12</view>
										<view class="text ellipsis" v-for="item in 6" :key="item.key">
											批次属性01:这里是批次属性 批次属性01:这里是批次属性
										</view>
										<view class="divider"></view>
									</view>
								</view>
							</u-swipe-action-item>
						</u-swipe-action>
					</view>
					<view v-if="item.isExpand" class="item-footer flex-c">
						<view class="flex-c" style="width: 15%" @click="handleExpand(item)">
							<view class="arrow-icon">
								<u-icon :name="item.isExpand ? 'arrow-left' : 'arrow-right'" color="#86909C"
									size="36"></u-icon>
							</view>
						</view>
					</view>
					<!-- <u-empty v-if='isRequested && (dataList.length === 0)' text="暂无数据" mode="list" margin-top="200"
					iconSize="100" textSize="28rpx"></u-empty> -->
				</view>
			</view>
			<!-- 上拉加载更多 -->
			<!-- 	<u-loadmore @loadmore="getDataList" :status="loadStatus" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" margin-top="30" fontSize="30rpx"
				iconSize="35rpx" lineColor="#fff" /> -->
		</scroll-view>
		<view class="g-footer-btn flex-c" style="bottom:50rpx">
			<u-button type="primary" @click="logout">出库登记</u-button>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/mixin/pageMixin.js';
	import {
		getList,
		updateNode
	} from '@/apis/loading-detail.js';
	const tempData = [{
			mtsDispatchId: '1',
			dispatchNo: 'CN091231231',
			stationDatetime: '2023-12-12',
			num: '0.00 CDM',
			isExpand: false,
			taskStationList: [{
					stationName: '深圳龙湖分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				},
				{
					stationName: '厦门吉联分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				},
				{
					stationName: '厦门吉联分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				}
			]
		},
		{
			mtsDispatchId: '2',
			dispatchNo: 'CN091231231',
			stationDatetime: '2023-12-12',
			num: '0.00 CDM',
			isExpand: false,
			taskStationList: [{
					stationName: '深圳龙湖分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				},
				{
					stationName: '厦门吉联分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				},
				{
					stationName: '厦门吉联分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				}
			]
		},
		{
			mtsDispatchId: '3',
			dispatchNo: 'CN091231231',
			stationDatetime: '2023-12-12',
			num: '0.00 CDM',
			isExpand: false,
			taskStationList: [{
					stationName: '深圳龙湖分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				},
				{
					stationName: '厦门吉联分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				},
				{
					stationName: '厦门吉联分拨中心',
					stationDatetime: '2023-12-12 12:12:12'
				}
			]
		}
	];
	export default {
		mixins: [pageMixin],
		components: {},
		data() {
			return {
				isShow: true,
				optList: [{
					disabled: false,
					text: '删除',
					show: false,
					style: {
						backgroundColor: 'rgba(229,60,60,0.8)',
						'border-radius': '16rpx 0rpx 0rpx 16rpx',
						// width: '144rpx',
						'text-align': 'center',
						'box-sizing': 'border-box'
					}
				}],
				tempData,
				STATUS: {
					COMPLETE: 'green',
					SIGNIN: 'red'
				},
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				// 状态栏
				// 列表
				isRequested: false, //是否请求完
				dataList: [],
				STATION_TYPE: {
					UNLOAD: '卸',
					LOAD: '装'
				},
				clickItem: {},
				// 确认框
				confirmShow: false
			};
		},
		watch: {
			isShow(val) {
				console.log('【isShow】', val);
			}
		},
		onLoad() {
			uni.hideTabBar(); //隐藏原生的导航栏
			this.getDataList(true);
		},
		methods: {
			clickSwipeAction(val) {
				console.log('【clickSwipeAction】', val);
			},
			clickSwipeActionItem(val) {
				console.log('【clickSwipeActionItem】', val);
			},
			handleSubmit(item) {
				console.log('【handleSubmit】', item);
			},
			// 获取列表数据
			getDataList(isInit = false) {
				this.isRequested = false;
				this.currentPage = isInit ? 1 : this.currentPage;
				this.loadStatus = 'loading';
				getList({
						currentPage: this.currentPage,
						pageSize: this.pageSize
					})
					.then(res => {
						const _res = res.data;
						let newData = _res.records.map(item => {
							return {
								...item,
								createTime: item.createTime.substring(0, 10),
								isExpand: false //默认收起
							};
						});
						this.dataList = isInit ? newData : this.dataList.concat(newData);
						console.log('【dataList】', this.dataList);
						// 分页处理
						this.pageStatus(newData.length, this.dataList.length);
						// if (this.dataList.length > 20) {
						// 	console.log('【33345345】', this.dataList);
						// 	this.pageStatus(5, this.dataList.length)
						// } else {
						// 	this.pageStatus(newData.length, this.dataList.length)
						// }
					})
					.catch(err => {
						console.error(err);
						if (isInit) {
							this.dataList = [];
						}
						this.loadStatus = 'loadmore';
						this.loadmoreText = '加载失败';
					})
					.finally(() => {
						this.isRequested = true;
					});
			},
			goDetail(item, type) {
				console.log('【 goDetail 】-168', type);
				if (type === 'loading') {
					uni.navigateTo({
						url: `/pages/sub-packages/loading-detail/index?id=${item.mtsDispatchId}`
					});
				}
				// if (type === 'map') {
				// 	uni.navigateTo({
				// 		url: `/pages/sub-packages/example/amap`
				// 	})
				// }
			},
			// 展开收起
			handleExpand(item = {}) {
				this.$set(item, 'isExpand', !item.isExpand);
			},
			handleItemClick(item) {
				this.confirmShow = true;
				this.clickItem = item;
			}
		}
	};
</script>
<style lang="scss" scoped>
	::v-deep .u-swipe-action-item__right__button__wrapper {
		background-color: #E53C3C !important;
	}
</style>
<style lang="scss" scoped>
	page {
		background: linear-gradient(to bottom, #e7f3f4 0%, rgba(231, 243, 244, 0) 50%, #fefefe, #fdfdfd, #fff) !important;
	}

	.plan-task {
		.list-wrap {
			padding-bottom: 110rpx;

			.list-item {
				margin-bottom: 24rpx;
				box-sizing: border-box;
				width: 100%;
				background: #ffffff;
				box-shadow: 0rpx 1rpx 6rpx 0rpx rgba(0, 0, 0, 0.07) !important;
				// padding: 24rpx 0rpx 24rpx 24rpx;
				box-sizing: border-box;
				overflow: hidden;
				border-radius: 16rpx;

				.item-header-wrap {
					border-radius: 16rpx;
					overflow: hidden;
				}

				.item-header {
					padding: 24rpx 24rpx 0 24rpx;

					.item-header__title {
						color: #1d2129;
						font-size: 28rpx;
						font-weight: 500;

						.status {
							&.green {
								color: #4f9b0e;
							}

							&.red {
								color: #e53c3c;
							}
						}
					}

					.item-header__info {
						position: relative;
						margin: 24rpx auto;
						font-size: 24rpx;
						color: #4e5969;
						font-weight: 400;
						line-height: 56rpx;

						.submit {
							position: absolute;
							right: 0rpx;
							top: 64rpx;
							box-sizing: border-box;
							width: 160rpx;
							height: 64rpx;
							border-radius: 12rpx;
							border: 2rpx solid #008474;
							font-size: 28rpx;
							font-weight: 500;
							color: #008474;
						}
					}

					.item-header-footer {
						margin-top: 48rpx;
						height: 64rpx;
						border-top: 2rpx solid;
						border-image: linear-gradient(90deg, rgba(229, 230, 235, 0), rgba(229, 230, 235, 0.8), rgba(229, 230, 235, 0)) 2 2;
						width: 100%;
					}
				}


				.item-content {
					margin-top: 24rpx;

					.sublist-item {
						padding: 24rpx;
						border-top: 2rpx solid;
						border-image: linear-gradient(90deg, rgba(229, 230, 235, 0), rgba(229, 230, 235, 0.8), rgba(229, 230, 235, 0)) 2 2;

						.content-top {
							height: 108rpx;
							color: #4e5969;
							font-size: 24rpx;

							.content-top__left {
								width: 192rpx;
								height: 100%;
								background-color: #bcf;
								border-radius: 8rpx;
								overflow: hidden;
							}

							.content-top__right {
								margin-left: 22rpx;
								height: 100%;
								width: calc(100% - 192rpx - 22rpx);
								color: #86909c;

								.desc {
									width: 100%;
									font-size: 28rpx;
									color: #1d2129;
								}
							}
						}

						.content-middle {
							position: relative;
							box-sizing: border-box;
							margin-top: 24rpx;
							display: grid;
							grid-template-columns: 49% 49%;
							grid-gap: 24rpx;
							font-size: 24rpx;
							color: #4e5969;

							// line-height: 35rpx;
							.text {
								&:nth-child(odd) {
									padding-right: 16rpx;
								}

								&:nth-child(even) {
									padding-left: 16rpx;
								}
							}

							.divider {
								position: absolute;
								top: 0;
								right: 48.5%;
								width: 0rpx;
								height: 100%;
								border: 2rpx solid;
								border-image: linear-gradient(180deg, rgba(229, 230, 235, 0), rgba(229, 230, 235, 1), rgba(229, 230, 235, 0)) 2 2;
							}
						}
					}
				}

				.arrow-icon {
					transform-origin: center;
					transform: rotate(90deg);
				}

				.item-footer {
					border-top: 2rpx solid;
					border-image: linear-gradient(90deg, rgba(229, 230, 235, 0), rgba(229, 230, 235, 0.8), rgba(229, 230, 235, 0)) 2 2;
					box-sizing: border-box;
					height: 64rpx;
					color: #86909c;
				}
			}
		}
	}
</style>