<!--
 * @Description: 委托明细
 * @Date: 2023-08-18 16:55:29
 * @LastEditTime: 2023-08-24 09:36:59
-->
<template>
	<view class="task-detail-page">
		<!-- 表单信息 -->
		<view class="info-wrap">
			<view class="title">总里程 1234.45</view>
			<u-form labelPosition="left" :model="info" ref="formRef" :labelWidth="labelWidth" :labelStyle="labelStyle">
				<u-form-item label="标题" borderBottom>
					<view class="txt">{{info.taskNo}}</view>
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<view class="txt" @click="call">
						{{info.taskStatusName}}
					</view>
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<view class="txt"> {{info.originStationName}}</view>
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<view class="txt"> {{info.destStationName}}</view>
				</u-form-item>
				<u-form-item label="说明说明" borderBottom>
					<view class="txt">{{info.planTotalQty}} CT</view>
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<view class="txt">{{info.planTotalQty}} CT</view>
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<view class="txt">{{info.planTotalVolume}} CDM</view>
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<view class="txt">{{info.planTotalVolume}} CDM</view>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	import {
		taskDetail
	} from '@/apis/quoted-detail.js'

	export default {
		components: {},
		data() {
			return {
				// 公共
				// 表单
				labelWidth: '200rpx',
				labelStyle: {
					fontSize: '28rpx !important;',
					color: '#4E5969 !important;'
				},
				info: {},
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
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	::v-deep .task-detail-page .u-form-item__body {
		// padding: 10rpx 0 !important;
		font-size: 28rpx !important;
		font-weight: 400;
		color: #1D2129 !important;

		.u-form-item__body__left__content__label {
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
		}
	}

	.txt {
		font-size: 28rpx;
		text-align: right;
	}
</style>