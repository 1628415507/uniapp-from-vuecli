<template>
	<view class="home-page">
		<!-- 查询 -->
		<view class="search-wrap flex-sb">
			<u-input v-model="keyword" placeholder="计划单号/货品条码/入场凭证码" :customStyle="inputCustomStyle" border="none">
				<template slot="suffix">
					<view class="search-icon flex-c" @click="getDataList(true)">
						<u-icon name="search" size="45rpx" color="#A9AEB8"></u-icon>
					</view>
				</template>
			</u-input>
			<view class="scan-wrap flex-c" @click="getScanVal">
				<u-icon name="scan" size="50rpx" color="#86909C"></u-icon>
			</view>
		</view>
		<!-- 列表-->
		<scroll-view :scroll-y="true" :style="{ height: 'calc(100vh - 156rpx)' }" @scroll="scroll"
			@scrolltolower="scrollToLower" :scroll-top="scrollTop">
			<!-- v-if="dataList.length" -->
			<view class="list-wrap">
				<view class="list-item" v-for="(item, index) in 10" :key="index">
					<view class="list-item__content flex-sb">
						<view class="content-left flex-col-sb">
							<view class="content-left--top ellipsis">出库计划:RTG1234567890</view>
							<view class="txt ellipsis">车牌号：{{ item.planTotalWeight || '-' }}
							</view>
							<view class="content-left--bottom">
								<text class="txt ellipsis">货主：{{ item.planTotalVolume || '-' }} </text>
								<text class="txt ellipsis">供应商：{{ item.planTotalQty || '-' }} </text>
							</view>
						</view>
						<view class="content-right flex-sb" @click="goDetail(item)">
							<text class="txt ellipsis">收货中</text>
							<u-icon name="arrow-right" color="#86909C" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<Empty v-if="isRequested && (dataList.length === 0)" text="扫描结果为空" marginTop="100"></Empty>
			<!-- 上拉加载更多 -->
			<!-- <u-loadmore @loadmore="getDataList" :status="loadStatus" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" margin-top="30" fontSize="30rpx"
				iconSize="35rpx" lineColor="#fff" /> -->
		</scroll-view>
	</view>
</template>

<script>
	import pageMixin from '@/mixin/pageMixin.js';
	import Empty from '@/components/empty/index.vue';
	import {
		getScanVal
	} from '@/utils/methods.js';
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
	const inputCustomStyle = {
		boxSizing: 'border-box',
		background: '#fff',
		padding: '10rpx 10rpx 10rpx 30rpx',
		height: '64rpx',
		borderRadius: '8rpx',
		border: '2rpx solid #D9DCE1',
		fontSize: '28rpx'
	};
	export default {
		mixins: [pageMixin],
		components: {
			Empty
		},
		data() {
			return {
				keyword: '',
				// 公共
				inputCustomStyle,
				colorTheme: this.$store.getters.colorTheme,
				// 列表
				isRequested: false, //是否请求完
				dataList: [],
			};
		},
		onLoad() {
			uni.hideTabBar(); //隐藏原生的导航栏
			this.getDataList(true);
			// this.getLocationInfo()
		},
		methods: {
			getScanVal,
			// 获取列表数据
			getDataList(isInit = false) {
				// this.dataList = tempData
				this.isRequested = false;
				this.currentPage = isInit ? 1 : this.currentPage;
				this.loadStatus = 'loading';
				getList({
						currentPage: this.currentPage,
						pageSize: this.pageSize,
						dispatchStatus: this.dispatchStatus
					})
					.then(res => {
						const _res = res.data;
						let newData = _res.records.map(item => {
							return {
								...item,
								createTime: item.createTime.substring(0, 10),
								planTotalWeight: item.planTotalWeight.toFixed(2),
								planTotalVolume: item.planTotalVolume.toFixed(2),
								planTotalQty: item.planTotalQty.toFixed(2),
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
			// 装车详情
			goDetail(item, type) {
				console.log('【 goDetail 】-168', type);
				uni.navigateTo({
					url: `/pages/sub-packages/out-storage/detail?id=${item.mtsDispatchId}`
				});

			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: linear-gradient(to bottom, #E7F3F4 0%, rgba(231, 243, 244, 0) 50%, #fefefe, #fdfdfd, #fff) !important;
	}

	.home-page {
		padding: 24rpx 32rpx;

		// 查询
		.search-wrap {
			margin-bottom: 48rpx;

			.search-icon {
				width: 70rpx;
			}

			.scan-wrap {
				margin-left: 36rpx;
			}
		}
	}

	.list-wrap {
		padding: 3rpx;
		padding-bottom: 30rpx;

		.list-item {
			margin-bottom: 24rpx;
			box-sizing: border-box;
			width: 100%;
			height: 172rpx;
			padding: 24rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0rpx 1rpx 6rpx 0rpx rgba(0, 0, 0, 0.07) !important;

			.list-item__content {
				box-sizing: border-box;
				height: 100%;

				.content-left {
					width: 80%;
					height: 100%;

					.content-left--top {
						font-size: 28rpx;
						font-weight: 500;
						color: #1D2129;
					}

					.txt {
						// display: inline-block;
						font-size: 24rpx;
						width: 50%;
						color: #4E5969;
					}

					.content-left--bottom {
						font-size: 24rpx;

						// line-height: 40rpx;
						.txt {
							display: inline-block;

						}
					}
				}


				// 信息
				.content-right {
					font-size: 24rpx;
					width: 18%;
					height: 100%;
					color: #86909C;

					.flex-sb {
						width: 100%;
					}
				}
			}
		}
	}
</style>