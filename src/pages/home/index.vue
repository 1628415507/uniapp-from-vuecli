<!--
 * @Description: 首页
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-25 18:22:29
-->
<template>
	<view class="home-page">
		<!-- 状态栏 -->
		<view class="subsection-wrap" :class="GRADIENT_CLASS[dispatchStatus]">
			<u-subsection :current="current" :list="subsectionList" mode="button" @change="sectionChange"
				activeColor="#fff" fontSize="28rpx"></u-subsection>
		</view>
		<!-- 列表 -->
		<scroll-view :scroll-y="true" :style="{height: 'calc(100vh - 265rpx)'}" @scroll="scroll"
			@scrolltolower="scrollToLower" :scroll-top="scrollTop">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,index) in dataList" :key="index">
					<view class="list-item__content">
						<view class="content-top flex-sb">
							<view class="content-top__left flex-col-sb">
								<text class="title ellipsis">询价标题</text>
								<view class="label">
									截止时间 {{item.createTime||'-'}}
								</view>
							</view>
							<view v-if="dispatchStatus==='COMPLETED'" class="content-top__right flex-c">
								<view class="tag" :class="true?'tag--active':''">报价中</view>
							</view>
							<view v-if="dispatchStatus==='BIDING'" class="content-top__right">
								<view class="num">{{index+1}}</view>
								<view class="label">当前排名</view>
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
					<view class="list-item__footer flex-sb">
						<view class="btn-item" @click="handleItemClick(item)">弃标</view>
						<view class="btn-item highlight" @click="goUrl(item)">
							去报价
						</view>
					</view>
				</view>
				<!-- 	<u-empty v-if='isRequested && (dataList.length === 0)' text="暂无数据" mode="list" margin-top="200"
					iconSize="100" textSize="28rpx"></u-empty> -->
			</view>
		<u-loadmore @loadmore="getDataList" :status="loadStatus" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" margin-top="30" fontSize="30rpx"
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
		updateNode
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
					UNQUOTE: 'gradient--right',
					BIDING: 'gradient--center',
					COMPLETED: 'gradient--left'
				},
				dispatchStatus: 'UNQUOTE',
				subsectionList: [{
						name: '待报价',
						value: 'UNQUOTE',
					},
					{
						name: '待开标',
						value: 'BIDING',
					}, {
						name: '已完成',
						value: 'COMPLETED',
					}
				],
				// 列表
				isRequested: false, //是否请求完
				dataList: [],
				clickItem: {},
				// 确认框
				confirmShow: false,
				reason: ""
			}
		},
		onLoad() {
			uni.hideTabBar() //隐藏原生的导航栏
			this.getDataList(true)
		},
		methods: {
			// 完成状态切换
			sectionChange(index) {
				this.current = index;
				this.dispatchStatus = this.subsectionList[index].value
				this.getDataList(true)
				this.goTop() //回到顶部

			},
			// 获取列表数据
			getDataList(isInit=false) {
				// this.dataList = tempData
				this.isRequested = false
				this.currentPage = isInit ? 1 : this.currentPage
				this.loadStatus = 'loading'
				getList({
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					dispatchStatus: this.dispatchStatus
				}).then(res => {
						const _res = res.data
					  let newData = _res.records.map(item => {
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
					console.log(err)
					this.loadStatus = "nomore"
					this.nomoreText = "加载失败"
				}).finally(() => {
					this.isRequested = true
				})
			},
			// 路径跳转
			goUrl(item) {
				uni.navigateTo({
					url: `/pages/sub-packages/quoted-detail/index?id=${item.mtsDispatchId}`
				});
			},
			handleItemClick(item) {
				this.confirmShow = true
				this.clickItem = item
			},
			// 更新节点状态
			confirmModal() {
				if (!this.reason) {
					uni.showToast({
						icon: 'none',
						title: '理由不能为空',
						duration: 2000
					})
					return
				}
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
						height: 100%;

						.title {
							font-size: 32rpx;
							font-weight: 500;
						}
					}

					.content-top__right {
						height: 100%;
						text-align: center;

						.num {
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
		height: 68rpx;
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
		height: 68rpx;
		border-radius: 0 72rpx 72rpx 0;
	}

	::v-deep .home-page .subsection-wrap {
		margin: 20rpx auto 32rpx auto;
		height: 68rpx;
		box-sizing: border-box;
		border-radius: 72rpx;
		padding: 2rpx;

		.u-subsection {
			background-color: rgba(255, 255, 255, 0.8) !important;
			border-radius: 72rpx !important;
			z-index: 999;

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