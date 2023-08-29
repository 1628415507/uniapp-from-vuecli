<!--
 * @Description: 首页
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-29 15:59:57
-->
<template>
	<view class="home-page">
		<view class="search-wrap flex-sb">
			<u-input v-model="keyword" placeholder="询价标题/单号/关键词" shape="circle"
				customStyle="background:#fff;padding: 10rpx 10rpx 10rpx 30rpx;" border="none">
				<template slot="suffix">
					<view class="search-icon flex-c" @click="getDataList(true)">
						<u-icon name="search" size="45rpx" color="#fff"></u-icon>
					</view>
				</template>
			</u-input>
		</view>
		<!-- 状态栏 -->
		<view class="tabs-wrap">
			<u-tabs :list="subsectionList" itemStyle="font-size: 32px;color: #1D2129; height:65rpx" @click="tabClick"
				:lineColor="colorTheme" :current="current" lineWidth="80rpx" lineHeight="6rpx"
				:scrollable="false"></u-tabs>
		</view>
		<!-- <view class="subsection-wrap" :class="GRADIENT_CLASS[tabStatus]">
			<u-subsection :current="current" :list="subsectionList" mode="button" @change="sectionChange"
				activeColor="#fff" fontSize="28rpx"></u-subsection>
		</view> -->
		<!-- 列表 -->
		<scroll-view :scroll-y="true" :style="{height: 'calc(100vh - 300rpx)'}" @scroll="scroll"
			@scrolltolower="scrollToLower" :scroll-top="scrollTop">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in dataList" :key="item.scctQuotationId">
					<view class="list-item__content" @click="goUrl(item)">
						<view class="content-top flex-sb">
							<view class="content-top__left flex-col-sb">
								<text class="title ellipsis">{{item.inquiryTitle}}</text>
								<view class="label">
									截止时间 {{item.quotationDeadline||'-'}}
								</view>
							</view>
							<view v-if="tabStatus==='QUOTATION_STATUS_END'" class="content-top__right flex-c">
								<view class="tag" :class="item.quotationStatus===30?'tag--active':''">
									{{QUOTATION_STATUS[item.quotationStatus]||'-'}}
								</view>
							</view>
							<view v-if="tabStatus==='HAVE_QUOTATION_NOT_END'" class="content-top__right">
								<view class="num">{{item.ranking||' '}}</view>
								<view class="label">当前排名</view>
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
					<view v-if="tabStatus!=='QUOTATION_STATUS_END'" class="list-item__footer flex-sb">
						<view class="btn-item" @click="handleItemClick(index)">弃标</view>
						<view class="btn-item highlight" @click="goUrl(index)">
							去报价
						</view>
					</view>
				</view>
				<!-- 	<u-empty v-if='isRequested && (dataList.length === 0)' text="暂无数据" mode="list" margin-top="200"
					iconSize="100" textSize="28rpx"></u-empty> -->
			</view>
			<u-loadmore @loadmore="getDataList" :status="loadStatus" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" margin-top="20" fontSize="30rpx"
				iconSize="35rpx" lineColor="#fff" />
		</scroll-view>
		<!-- 确认框 -->
		<u-modal :show="confirmShow" :showCancelButton="true" :confirmColor="colorTheme" @cancel="confirmShow=false"
			@confirm="confirmModal">
			<view style="width: 100%;">
				<view style="margin:10rpx 0">弃标理由：</view>
				<u--textarea v-model="reason" placeholder="请输入"></u--textarea>
			</view>
		</u-modal>
		<!-- 底部菜单栏 -->
		<TabBar class="g-tabbar-wrap"></TabBar>
	</view>
</template>

<script>
	import pageMixin from '@/mixin/pageMixin.js'
	import {
		getList,
		abandoningBid
	} from '@/apis/quoted-detail.js'
	import TabBar from '@/components/tab-bar'
	export default {
		mixins: [pageMixin],
		components: {
			TabBar
		},
		data() {
			return {
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				// 状态栏
				current: 0,
				// 渐变样式类名
				GRADIENT_CLASS: {
					NOT_QUOTATION: 'gradient--right',
					HAVE_QUOTATION_NOT_END: 'gradient--center',
					QUOTATION_STATUS_END: 'gradient--left'
				},
				tabStatus: 'NOT_QUOTATION',
				subsectionList: [{
						name: '待报价',
						value: 'NOT_QUOTATION',
					},
					{
						name: '待开标',
						value: 'HAVE_QUOTATION_NOT_END',
					}, {
						name: '已完成',
						value: 'QUOTATION_STATUS_END',
					}
				],
				// 列表
				keyword: '',
				isRequested: false, //是否请求完
				dataList: [],
				clickItem: {},
				// 确认框
				confirmShow: false,
				reason: ""
			}
		},
		computed: {
			// 中标状态
			QUOTATION_STATUS() {
				return this.$dict.getDictsEnum('QUOTATION_STATUS', {
					keyProp: 'value',
					valueProp: 'text'
				})
			},
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
			// 完成状态切换
			tabClick(item) {
				console.log('【 item 】-177', item)
				this.tabStatus = item.value
				this.current = item.index
				this.getDataList(true)
			},
			// sectionChange(index) {
			// 	this.current = index;
			// 	this.tabStatus = this.subsectionList[index].value
			// 	this.getDataList(true)
			// },
			// 获取列表数据
			getDataList(isInit = false) {
				this.isRequested = false
				this.currentPage = isInit ? 1 : this.currentPage
				this.loadStatus = 'loading'
				getList({
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					tabStatus: this.tabStatus,
					keyword:this.keyword
				}).then(res => {
					let newData = res.records.map(item => {
						return {
							...item,
							planTotalWeight: item.planTotalWeight?.toFixed(2),
							planTotalVolume: item.planTotalVolume?.toFixed(2),
							planTotalQty: item.planTotalQty?.toFixed(2),
						}
					})
					this.dataList = isInit ? newData : this.dataList.concat(newData)
					isInit && this.goTop() //回到顶部
					console.log('【dataList】', this.dataList);
					// 分页处理
					this.pageStatus(newData.length, this.dataList.length)
				}).catch(err => {
					console.error(err)
					this.loadStatus = "loadmore"
					this.loadmoreText = "加载失败"
				}).finally(() => {
					this.isRequested = true
				})
			},
			// 路径跳转
			goUrl(index) {
				const item = this.dataList[index]
				console.log('【 item 】-221', item)
				const {
					scctInquiryId,
					scctQuotationId,
					quotationStatus
				} = item
				const info = {
					scctInquiryId,
					scctQuotationId,
					quotationStatus
				}
				uni.navigateTo({
					url: `/pages/sub-packages/quoted-detail/index?info=${JSON.stringify(info)}`
				});
			},
			handleItemClick(index) {
				const item = this.dataList[index]
				this.reason = ''
				this.confirmShow = true
				this.clickItem = item
			},
			// 确认弹框
			confirmModal() {
				if (!this.reason) {
					uni.showToast({
						icon: 'none',
						title: '弃标理由必填',
						duration: 2000
					})
					return
				}
				abandoningBid({
					scctInquiryId: this.clickItem.scctInquiryId, //询价管理主键
					reason: this.reason,
				}).then(res => {
					console.log('【 abandoningBid-res 】-234', res)
					const success = res
					uni.showToast({
						icon: 'none',
						title: success ? '操作成功' : '操作失败',
						duration: 2000
					})
					if (success) {
						this.getDataList(true)
						this.confirmShow = false
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	.home-page {
		padding: 0 32rpx;

		.tabs-wrap {
			margin: 15rpx auto;
		}

		.search-icon {
			width: 84rpx;
			height: 56rpx;
			background: #008474;
			border-radius: 200rpx;
		}
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
					height: 85rpx;

					.content-top__left {
						max-width: 80%;
						height: 100%;

						.title {
							width: 100%;
							font-size: 32rpx;
							font-weight: 500;
						}
					}

					.content-top__right {
						max-width: 25%;
						height: 100%;
						text-align: center;
						overflow: hidden;

						.num {
							min-height: 50rpx;
							font-size: 43rpx;
							font-weight: 500;
							color: $colorTheme;
						}

						.tag {
							width: 104rpx;
							height: 48rpx;
							background: rgba(134, 144, 156, 0.08);
							border-radius: 6rpx;
							border: 2rpx solid #86909C;
							font-size: 24rpx;
							font-weight: 400;
							color: #86909C;
							line-height: 48rpx;
						}

						.tag--active {
							background: rgba(0, 132, 116, 0.08) !important;
							border: 2rpx solid #008474 !important;
							color: #008474 !important;
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

			.list-item__footer {
				height: 96rpx;
				line-height: 96rpx;
				border-top: 2rpx solid $colorBorder;
				color: #1D2129;

				.btn-item {
					width: 100%;
					min-width: 50%;
					text-align: center;
					font-size: 34rpx;
					font-weight: 400;

					&:first-child {
						border-right: 2rpx solid $colorBorder;
					}
				}
			}
		}
	}

	$subsectionH: 68rpx;

	// 向右渐变
	.gradient--right {
		background: linear-gradient(to right, rgba(0, 132, 116, 1), rgba(0, 132, 116, 0.1));
	}

	// 向左渐变
	.gradient--left {
		background: linear-gradient(to left, rgba(0, 132, 116, 1), rgba(0, 132, 116, 0.1));
	}

	// 中间向两头
	.gradient--center {
		position: relative;
		width: 100%;
		height: 68rpx;
		z-index: 99;
		border-radius: 72rpx;
	}

	.gradient--center:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 50%;
		height: $subsectionH;
		background-image: linear-gradient(to left, rgba(0, 132, 116, 1), rgba(0, 132, 116, 0.1)) !important;
		border-radius: 72rpx 0 0 72rpx;
	}

	.gradient--center:after {
		content: "";
		position: absolute;
		background-image: linear-gradient(to right, rgba(0, 132, 116, 1), rgba(0, 132, 116, 0.1)) !important;
		top: 0;
		left: 50%;
		right: 0;
		height: $subsectionH;
		border-radius: 0 72rpx 72rpx 0;
	}



	::v-deep .home-page .subsection-wrap {
		margin: 20rpx auto 32rpx auto;
		height: $subsectionH;
		box-sizing: border-box;
		border-radius: 72rpx;
		padding: 2rpx;

		.u-subsection {
			background-color: rgba(255, 255, 255, 0.8) !important;
			border-radius: 72rpx !important;
			z-index: 999;
			box-sizing: border-box;
			height: 64rpx !important;

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