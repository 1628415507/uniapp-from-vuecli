<template>
	<view class="plan-info">
		<!-- 折叠信息 -->
		<view class="info-wrap">
			<view class="info-content">
				<view class="info-item">
					<text class="label">计划单号：</text>
					<text>1234567890123</text>
				</view>
				<view class="info-item">
					<text class="label">供应商:</text>
					<text>供应商</text>
				</view>
				<view class="info-item">
					<text class="label">急单:</text>
					<text>是</text>
				</view>
				<template v-if="isInfoExpand">
					<view class="info-item">
						<text class="label">货主:</text>
						<text>是</text>
					</view>
					<view class="info-item">
						<text class="label">车牌号:</text>
						<text>是</text>
					</view>
					<view class="info-item">
						<text class="label">司机:</text>
						<text>是</text>
					</view>
					<view class="info-item">
						<text class="label">仓库:</text>
						<text>是</text>
					</view>
				</template>

			</view>
			<view class="info-footer">
				<view class="flex-c" @click="handleExpand(item)">
					<view class="flex-sb" style="width:15%">
						<view class="arrow-icon">
							<u-icon :name="isInfoExpand?'arrow-left':'arrow-right'" color="#86909C" size="32"></u-icon>
						</view>
						<text> {{isInfoExpand?'收起':'展开'}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<scroll-view :scroll-y="true" :style="{height: `calc(100vh - ${isInfoExpand?'641rpx':'420rpx'})`}"
			@scroll="scroll" @scrolltolower="scrollToLower" :scroll-top="scrollTop">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in 6" :key="index">
					<view class="list-item__content">
						<view class="content-top flex-sb">
							<view class="content-top__left">
								<u--image :src="require('@/static/image/out-store.png')" width="192rpx"
									height="108rpx"></u--image>
							</view>
							<view class="content-top__right flex-col-sa">
								<view class="desc ellipsis">
									货品名称货品名称货品名货品名称货品名称货品名称货品货称货品货
								</view>
								<view class="count">
									20个/箱
								</view>
							</view>
						</view>
						<view class="content-middle">
							<view class="text ellipsis">货品编码:123456789012</view>
							<view class="text ellipsis">已登记/计划数:100/1000个</view>
							<view class="text ellipsis">生产日期:2023-12-12</view>
							<view class="text ellipsis">失效日期:2023-12-12</view>
							<view class="text ellipsis" v-for="item in 6" :key="item.key">
								批次属性01:这里是批次属性
								批次属性01:这里是批次属性
							</view>
							<view class="divider"></view>
						</view>
					</view>
				</view>
				<!-- <u-empty v-if='isRequested && (dataList.length === 0)' text="暂无数据" mode="list" margin-top="200"
					iconSize="100" textSize="28rpx"></u-empty> -->
			</view>
			<!-- 上拉加载更多 -->
			<!-- 	<u-loadmore @loadmore="getDataList" :status="loadStatus" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" margin-top="30" fontSize="30rpx"
				iconSize="35rpx" lineColor="#fff" /> -->
		</scroll-view>
		<view class="g-footer-btn flex-c" style="bottom:50rpx">
			<u-button type="primary" @click="handleRegister">入库登记</u-button>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/mixin/pageMixin.js'
	import {
		getList,
		updateNode
	} from '@/apis/loading-detail.js'
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
		mixins: [pageMixin],
		components: {
			TabBar,
		},
		data() {
			return {
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				isInfoExpand: false,
				// 状态栏
				current: 0,
				// 列表
				isRequested: false, //是否请求完
				dataList: [],
				clickItem: {},
				// 确认框
				confirmShow: false
			}
		},
		onLoad() {
			uni.hideTabBar() //隐藏原生的导航栏
			this.getDataList(true)
		},
		methods: {
			// 获取列表数据
			getDataList(isInit = false) {
				// this.dataList = tempData
				this.isRequested = false
				this.currentPage = isInit ? 1 : this.currentPage
				this.loadStatus = 'loading'
				getList({
					currentPage: this.currentPage,
					pageSize: this.pageSize,
				}).then(res => {
					const _res = res.data
					let newData = _res.records.map((item) => {
						return {
							...item,
							createTime: item.createTime.substring(0, 10),
							isExpand: false, //默认收起
						}
					})
					this.dataList = isInit ? newData : this.dataList.concat(newData)
					console.log('【dataList】', this.dataList);
					// 分页处理
					this.pageStatus(newData.length, this.dataList.length)
					// if (this.dataList.length > 20) {
					// 	console.log('【33345345】', this.dataList);
					// 	this.pageStatus(5, this.dataList.length)
					// } else {
					// 	this.pageStatus(newData.length, this.dataList.length)
					// }
				}).catch(err => {
					console.error(err)
					if (isInit) {
						this.dataList = []
					}
					this.loadStatus = "loadmore"
					this.loadmoreText = "加载失败"
				}).finally(() => {
					this.isRequested = true
				})
			},
			handleRegister(item = {}) {
				uni.navigateTo({
					url: `/pages/sub-packages/in-storage/register?id=${item.mtsDispatchId}`
				});
			},
			// 展开收起
			handleExpand(item) {
				this.$set(this, 'isInfoExpand', !this.isInfoExpand)
			},
		}
	}
</script>

<style lang="scss">
	.plan-info {
		// padding: 0 32rpx;

		.info-wrap {
			margin: 24rpx auto;
			box-sizing: border-box;
			padding: 24rpx 48rpx;
			width: 100%;
			// height: 602rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-shadow: 0rpx 1rpx 6rpx 0rpx rgba(0, 0, 0, 0.07) !important;

			.info-content {
				line-height: 60rpx;

				.info-item {
					font-size: 28rpx;
					color: #1D2129;
					font-weight: 500;

					.label {
						display: inline-block;
						// justify-content: ;
						color: #4E5969;
						width: 150rpx;
						font-weight: 400;
					}
				}
			}

			.info-footer {
				font-size: 24rpx;
				color: #86909C;

				.flex-sb {
					width: 20%;
					// margin o auto;
				}

				.arrow-icon {
					transform-origin: center;
					transform: rotate(90deg);
				}
			}
		}
	}

	.list-wrap {
		padding-bottom: 110rpx;

		.list-item {
			margin-bottom: 24rpx;
			box-sizing: border-box;
			width: 100%;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-shadow: 0rpx 1rpx 6rpx 0rpx rgba(0, 0, 0, 0.07) !important;
			padding: 24rpx;

			.list-item__content {
				box-sizing: border-box;

				.content-top {
					height: 108rpx;
					color: #4E5969;
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
						color: #86909C;

						.desc {
							width: 100%;
							font-size: 28rpx;
							color: #1D2129;
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
					color: #4E5969;

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
	}
</style>