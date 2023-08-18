<!--
 * @Description: 装车详情-任务详情
 * @Date: 2023-08-17 18:29:58
 * @LastEditTime: 2023-08-17 18:32:07
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
		<!-- 表单信息 -->
		<view class="info-wrap">
			<view class="title">订单信息</view>
			<u--form labelPosition="left" :model="info" ref="formRef">
				<u-form-item label="订单号:" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">CN091231231</view>
				</u-form-item>
				<u-form-item label="电话：" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">
						<u--text mode="phone" text="12345678900" color="#2572CC" size="28rpx" suffixIcon="phone"
							:iconStyle="{color:'#2572CC'}"></u--text>
					</view>
				</u-form-item>
				<u-form-item label="起运地：" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">上海市</view>
				</u-form-item>
				<u-form-item label="目的地：" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt flex">
						<text style="color:#2572CC">大不列颠及北爱尔兰联合王国</text>
						<view class="map-icon">
							<u-icon name="map" color="#2572CC" size="32"></u-icon>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="货物名称：" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">配件</view>
				</u-form-item>
				<u-form-item label="货物件数：" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">12345678900</view>
				</u-form-item>
				<u-form-item label="服务类型：" :labelWidth="labelWidth" :labelStyle="labelStyle">
					港到港
				</u-form-item>
				<u-form-item label="服务时限：" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">64</view>
				</u-form-item>
			</u--form>
		</view>
		<!-- 物流信息 -->
		<view class="info-wrap">
			<view class="title">物流信息</view>
			<u-steps current="0" direction="column">
				<u-steps-item title="2022-12-12 10:25:20已下单">
					<u--image slot="icon" :src="require('@/static/image/icons/order.svg')" width="32rpx"
						height="32rpx"></u--image>
				</u-steps-item>
				<u-steps-item title="2022-12-12 10:25:20已发货">
					<u--image slot="icon" :src="require('@/static/image/icons/plane.svg')" width="32rpx"
						height="32rpx"></u--image>
				</u-steps-item>
				<u-steps-item title="2022-12-12 10:25:20已签收" iconSize="32">
					<u-icon name="calendar" slot="icon" color="#4F9B0E" size="40"></u-icon>
				</u-steps-item>
			</u-steps>
		</view>
		<!-- 签收单管理 -->
		<view class="info-wrap">
			<view class="title">签收单管理</view>
			<view>暂无上传签收单</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				// 公共
				// 搜索栏
				keyword: '',
				// 表单
				labelWidth: '180rpx',
				labelStyle: {
					fontSize: '28rpx !important;'
				},
				info: {
					userInfo: {
						name: 'uView UI',
						sex: '',
						reason: '',
					},
				},
			}
		},
		onLoad() {},
		methods: {
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

		.search-wrap {
			.scan-icon {
				margin-left: 30rpx;
			}
		}

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
	}
</style>