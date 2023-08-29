<!--
 * @Description: 委托明细
 * @Date: 2023-08-18 16:55:29
 * @LastEditTime: 2023-08-29 15:10:59
-->
<template>
	<view class="task-detail-page">
		<!-- 表单信息 -->
		<view class="info-wrap">
			<view class="title">总里程 {{info.totalMileage}}</view>
			<u-form labelPosition="left" :model="info" ref="formRef" :labelWidth="labelWidth" :labelStyle="labelStyle">
				<u-form-item v-for="(item,index) in fieldList" :key="index" :label="item.label" borderBottom>
					<view class="txt">{{info[item.prop]||'-'}}</view>
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
				// 表单
				labelWidth: '200rpx',
				labelStyle: {
					fontSize: '28rpx !important;',
					color: '#4E5969 !important;'
				},
				fieldList: [{
					label: '委托方编码',
					prop: 'consignorCode'
				}, {
					label: '委托方名称',
					prop: 'consignorName'
				}, {
					label: '货主编码',
					prop: 'ownerCode'
				}, {
					label: '货主名称',
					prop: 'ownerName'
				}, {
					label: '起运地名称',
					prop: 'originName'
				}, {
					label: '目的地名称',
					prop: 'destName'
				}, {
					label: '计划数量',
					prop: 'planQty'
				}, {
					label: '计划体积',
					prop: 'planVolume'
				}, {
					label: '计划重量',
					prop: 'planWeight'
				}, {
					label: '线路编码',
					prop: 'routeCode'
				}, {
					label: '线路名称',
					prop: 'routeName'
				}, {
					label: '运输方式',
					prop: 'transMode'
				}, {
					label: '配载方式',
					prop: 'stowageMode'
				}, {
					label: '车型要求',
					prop: 'reqVehicleMode'
				}, {
					label: '总里程',
					prop: 'totalMileage'
				}, {
					label: '参考价',
					prop: 'referencePrice'
				}, {
					label: '计划类型',
					prop: 'planType'
				}, {
					label: '计划编码',
					prop: 'planCode'
				}, {
					label: '计划名称',
					prop: 'planName'
				}],
				info: {},
			}
		},
		onLoad(opt) {
			const info = JSON.parse(opt.info)
			this.getDetailInfo(info)
		},
		methods: {
			getDetailInfo(info) {
				this.info = {
					...info,
					transMode: this.$dict.getDictNameByCode('TRANS_MODE', info.transMode)
				}
				console.log('【 this.info 】-104', this.info)
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
		padding: 20rpx 32rpx 60rpx 32rpx;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 30rpx 30rpx 0 0;
		font-size: 28rpx;


		.info-wrap {
			padding: 24rpx;

			.title {
				margin-left: -20rpx;
				margin-bottom: 24rpx;
				width: 100%;
				box-sizing: border-box;
				padding-left: 16rpx;
				border-left: 4rpx solid $colorTheme;
				font-size: 32rpx;
				font-weight: 500;
				color: #1D2129;
			}
		}
	}

	.txt {
		width: 100%;
		font-size: 28rpx;
		text-align: right;
	}
</style>