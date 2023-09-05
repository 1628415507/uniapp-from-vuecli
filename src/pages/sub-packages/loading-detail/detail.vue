<!--
 * @Description:  装车详情-任务详情
 * @Date: 2023-08-18 16:55:29
 * @LastEditTime: 2023-09-05 18:34:49
-->
<template>
	<view class="task-detail-page">
		<!-- 搜索栏 -->
		<!-- <view class="search-wrap flex-sb">
			<u-search v-model="keyword" :showAction="false" height="64rpx" shape="square" bgColor="#fff"
				placeholder="订单/客户单号" placeholderColor="#A9AEB8" borderColor="#D9DCE1" searchIconSize="35"
				@blur="blurSearch">
			</u-search>
			<view class="scan-icon">
				<u-icon name="scan" size="65rpx" color="#86909C"></u-icon>
			</view>
		</view> -->
		<!-- 订单信息 -->
		<view class="info-wrap">
			<view class="title">订单信息</view>
			<u-form labelPosition="left" :model="info" ref="formRef" :labelWidth="labelWidth" :labelStyle="labelStyle">
				<u-form-item label="任务单号:">
					<view class="txt">{{info.taskNo}}</view>
				</u-form-item>
				<u-form-item label="任务状态：">
					<view class="txt" @click="call">
						{{info.taskStatusName}}
					</view>
				</u-form-item>
				<u-form-item label="起运地站点名称：">
					<view class="txt"> {{info.originStationName}}</view>
				</u-form-item>
				<u-form-item label="目的地站点名称：">
					<view class="txt"> {{info.destStationName}}</view>
					<!-- <view class="txt flex">
						<text style="color:#2572CC">{{info.destStationName}}</text>
						<view v-if="info.destStationName" class="map-icon">
							<u-icon name="map" color="#2572CC" size="32"></u-icon>
						</view>
					</view> -->
				</u-form-item>
				<u-form-item label="任务货物件数：">
					<view class="txt">{{info.planTotalQty}} CT</view>
				</u-form-item>
				<u-form-item label="任务货物重量：">
					<view class="txt">{{info.planTotalWeight}} KG</view>
				</u-form-item>
				<u-form-item label="任务货物体积：">
					<view class="txt">{{info.planTotalVolume}} CDM</view>
				</u-form-item>
			</u-form>
		</view>
		<!-- 物流信息 -->
		<view class="info-wrap">
			<view class="title">物流信息</view>
			<u-steps current="0" direction="column">
				<template v-for="(item,index) in info.nodeLineList">
					<u-steps-item :key="index" :title="item.lastModifyTime+item.nodeName ">
						<u-icon v-if="item.nodeCode==='SIGNED'" name="calendar" slot="icon" color="#4F9B0E" size="40">
						</u-icon>
						<u--image v-else slot="icon" :src="require('@/static/image/icons/order.svg')" width="32rpx"
							height="32rpx">
						</u--image>
					</u-steps-item>
					<!-- <u-steps-item v-else :key="index"
						:title="item.lastModifyTime+item.nodeName ">
						<u--image slot="icon" :src="require('@/static/image/icons/order.svg')" width="32rpx" height="32rpx">
						</u--image>
					</u-steps-item> -->
				</template>
			</u-steps>
		</view>
		<!-- 签收单管理 -->
		<view class="info-wrap">
			<view class="title">签收信息</view>
			<view class="img-list">
				<view v-for="item in fileList" :key="item.fileKey" class="img-item flex-c">
					<u--image :src="item.imgUrl" width="128rpx" height="128rpx" style="margin-bottom:15rpx">
						<!-- <view slot="error" style="font-size: 24rpx;">加载失败</view> -->
					</u--image>
				</view>

			</view>
			<view v-if="!(fileList&&fileList.length)">暂无上传签收单</view>
		</view>
	</view>
</template>

<script>
	import {
		taskDetail,
		getAttachmentInfo,
		getFile
	} from '@/apis/loading-detail.js'

	export default {
		components: {},
		data() {
			return {
				// 公共
				// 搜索栏
				keyword: '',
				// 表单
				labelWidth: '250rpx',
				labelStyle: {
					fontSize: '28rpx !important;'
				},
				info: {},
				fileList: [{
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				}],
			}
		},
		onLoad(opt) {
			this.getDetailInfo(opt.id)
		},
		methods: {
			getDetailInfo(id) {
				taskDetail({
					mtsTaskTmId: id
				}).then(res => {
					this.info = res.data
					// console.log('【 this.$config.baseUrl  】-141', this.$config, this.$config?.baseUrl)
					getAttachmentInfo({
						sourceOrderNo: this.info.taskNo,
						sourceOrderType: 'SIGNED',
					}).then(res => {
						const fileList = res.data || []
						this.fileList = fileList.map(item => {
							return {
								...item,
								imgUrl: `/filesystem/downloadFile/${item.fileKey}`
								// imgUrl: `${this.$config.baseUrl}/filesystem/downloadFile/${item
								// 	.fileKey}`
							}
						})
						console.log('this.fileList', this.fileList)
					})
				})
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: 114
				});
			}
			// blurSearch(val) {
			// 	console.log('blurSearch', val)
			// },
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	::v-deep .task-detail-page .u-form-item__body {
		padding: 10rpx 0 !important;
		font-size: 28rpx !important;
		font-weight: 400;
		color: #1D2129 !important;

		.u-form-item__body__left__content__label {
			font-size: 28rpx !important;
		}
	}

	::v-deep .task-detail-page .u-steps {

		// 右侧-文字、描述
		.u-text__value {
			font-size: 28rpx !important;
		}
	}

	.task-detail-page {
		position: relative;
		padding: 20rpx 32rpx;
		background-color: #fff;
		height: 100vh;
		box-sizing: border-box;
		border-radius: 30rpx 30rpx 0 0;
		font-size: 28rpx;

		// .search-wrap {
		// 	.scan-icon {
		// 		margin-left: 30rpx;
		// 	}
		// }

		.info-wrap {
			padding: 24rpx 0;
			border-bottom: 2rpx solid #E5E6EB;

			&:last-child {
				border-bottom: none;
			}

			.title {
				margin-bottom: 24rpx;
				box-sizing: border-box;
				width: 100%;
				padding-left: 16rpx;
				border-left: 4rpx solid $colorTheme;
				font-size: 32rpx;
				font-weight: 500;
				color: #1D2129;
			}

			.img-list {
				display: grid;
				grid-template-columns: repeat(4, 25%);
				grid-row-gap: 20rpx;

				.img-item {
					width: 100%;
				}
			}
		}
	}


	.txt {
		font-size: 28rpx;
	}
</style>