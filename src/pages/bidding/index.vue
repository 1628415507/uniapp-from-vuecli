<!--
 * @Description: 已中标
 * @Date: 2023-08-23 10:56:33
 * @LastEditTime: 2023-08-29 18:21:53
-->
<template>
	<view class="bidding-page">
		<!-- 列表 -->
		<scroll-view :scroll-y="true" :style="{height: 'calc(100vh - 130rpx)'}" @scroll="scroll"
			@scrolltolower="scrollToLower" :scroll-top="scrollTop">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in dataList" :key="index">
					<view class="list-item__content">
						<view class="content-top flex-sb">
							<view class="content-top__left flex-col-sb">
								<text class="title ellipsis">{{item.inquiryTitle}}</text>
								<view class="price">
									<!-- TODO:字段 -->
									中标价格 {{item.includingTaxPriceTotal||'-'}}
								</view>
							</view>
						</view>
						<view class="content-middle">
							<view class="content-middle__item flex">
								<u-image class="img-icon" :src="require('@/static/image/icons/compass.svg')"
									width="37rpx" height="37rpx"></u-image>
								<text class="cm-txt">总里程 {{item.totalMileage}}</text>
							</view>
							<view class="content-middle__item flex">
								<u-image class="img-icon" :src="require('@/static/image/icons/frame.svg')" width="37rpx"
									height="37rpx"></u-image>
								<text class="cm-txt">运输方式 {{TRANS_MODE[item.transMode]||'-'}}</text>
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
			</view>
			<u-loadmore @loadmore="getDataList" :status="loadStatus" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" margin-top="30" fontSize="30rpx"
				iconSize="35rpx" lineColor="#fff" />
		</scroll-view>
		<!-- 底部菜单栏 -->
		<TabBar class="g-tabbar-wrap"></TabBar>
	</view>
</template>

<script>
	import pageMixin from '@/mixin/pageMixin.js'
	import {
		getList,
		updateNode
	} from '@/apis/quoted-detail.js'
	import TabBar from '@/components/tab-bar'
	export default {
		mixins: [pageMixin],
		components: {
			TabBar,
		},
		data() {
			return {
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				// 列表
				isRequested: false, //是否请求完
				dataList: []
			}
		},
		computed: {
			// 运输方式
			TRANS_MODE() {
				return this.$dict.getDictsEnum('TRANS_MODE', {
					keyProp: 'value',
					valueProp: 'text'
				})
			},
		},
		onLoad() {
			uni.hideTabBar() //隐藏原生的导航栏
			this.getDataList(true)
		},
		methods: {
			// 获取列表数据
			getDataList(isInit = false) {
				this.isRequested = false
				this.currentPage = isInit ? 1 : this.currentPage
				this.loadStatus = 'loading'
				getList({
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					tabStatus: 'WINNING_BIDDER'
				}).then(res => {
					let newData = res.records.map(item => {
						return {
							...item,
							planTotalWeight: item.planTotalWeight.toFixed(2),
							planTotalVolume: item.planTotalVolume.toFixed(2),
							planTotalQty: item.planTotalQty.toFixed(2),
						}
					})
					this.dataList = isInit ? newData : this.dataList.concat(newData)
					console.log('【dataList】', this.dataList);
					// 分页处理
					this.pageStatus(newData.length, this.dataList.length)
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
			// 路径跳转
			goUrl(item, type) {
				if (type === 'loading') {
					uni.navigateTo({
						url: `/pages/sub-packages/quoted-detail/index?id=${item.mtsDispatchId}`
					});
				}
			}
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