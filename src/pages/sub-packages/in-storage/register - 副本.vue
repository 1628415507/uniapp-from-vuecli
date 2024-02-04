<template>
	<view class="register-page">
		<scroll-view :scroll-y="true" :style="{ height: '100%' }">
			<view class="top-wrap">
				<view class="flex-sb">
					<text>入库任务号:RK202307020001</text>
					<view class="btn flex-c" @click="getScanVal">提交 </view>
				</view>
				<view class="flex-sb text" style="width: 40%;">
					<text>已登记:5行</text>
					<text>总数量:5</text>
				</view>
			</view>
			<view class="middle-wrap flex-sb">
				<u-input v-model="keyword" placeholder="货品条码" :customStyle="inputCustomStyle" border="none">
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
			<view class="bottom-wrap">
				<view class="list-item">
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
				<view class="form-wrap">
					<u--form labelPosition="left" :model="formData" :rules="rules" ref="formRef" labelAlign="right"
						:labelStyle="labelStyle">
						<view class="dynamic-form">
							<u-form-item v-for="item in formItemData" :key="item.key" :label="item.batchAttriName"
								labelPosition="top" prop="name" labelWidth="274rpx" labelAlign="left">
								<view class="form-item flex">
									<view class="form-input-item">
										<DynamicInputItem :type="item.uiControlType" :config="item">
										</DynamicInputItem>
										<!-- <u-input v-model="formData.name" :customStyle="formInputCustomStyle"></u-input> -->
									</view>
								</view>
							</u-form-item>
						</view>
						<view class="static-form">
							<u-form-item label="登记数/可登记数:" prop="name" labelWidth="274rpx" labelAlign="right">
								<view class="form-item flex-sb">
									<view class="form-input-item">
										<u-input v-model="formData.name" :customStyle="formInputCustomStyle"></u-input>
									</view>
									<text class="suffix"> / 80 单位</text>
								</view>
							</u-form-item>
							<u-form-item label="登记体积/可登记体积:" prop="name" labelWidth="274rpx">
								<view class="form-item flex">
									<view class="form-input-item">
										<u-input v-model="formData.name" :customStyle="formInputCustomStyle"></u-input>
									</view>
									<text class="suffix"> / 80 单位</text>
								</view>
							</u-form-item>
							<u-form-item label="登记毛重/可登记毛重:" prop="name" labelWidth="274rpx" labelAlign="right">
								<view class="form-item flex">
									<view class="form-input-item">
										<u-input v-model="formData.name" :customStyle="formInputCustomStyle"></u-input>
									</view>
									<text class="suffix"> / 80 单位</text>
								</view>
							</u-form-item>
							<u-form-item label="登记净重/可登记净重:" prop="name" labelWidth="274rpx" labelAlign="right">
								<view class="form-item flex">
									<view class="form-input-item">
										<u-input v-model="formData.name" :customStyle="formInputCustomStyle"></u-input>
									</view>
									<text class="suffix"> / 80 单位</text>
								</view>
							</u-form-item>
						</view>
					</u--form>
				</view>
			</view>
			<Empty text="请扫货品条码" marginTop="100"></Empty>
		</scroll-view>
		<view class="g-footer-btn flex-c" style="bottom:50rpx">
			<u-button type="primary" @click="handleRegister">登记</u-button>
		</view>
	</view>
</template>

<script>
	import {
		formItemData
	} from './mock.js'
	import DynamicInputItem from '@/components/dynamic-input-item/index.vue';
	import Empty from '@/components/empty/index.vue';
	const inputCustomStyle = {
		boxSizing: 'border-box',
		background: '#fff',
		padding: '10rpx 10rpx 10rpx 30rpx',
		height: '64rpx',
		borderRadius: '8rpx',
		border: '2rpx solid #D9DCE1',
		fontSize: '28rpx'
	};
	const formInputCustomStyle = {
		boxSizing: 'border-box',
		width: '200rpx',
		background: '#fff',
		height: '64rpx',
		borderRadius: '8rpx',
		border: '2rpx solid #D9DCE1',
		fontSize: '28rpx'
	};
	const labelStyle = {
		color: '#4E5969',
		fontSize: '28rpx'
	}

	export default {
		components: {
			Empty,
			DynamicInputItem
		},
		data() {
			return {
				formItemData,
				// 输入框
				keyword: '',
				inputCustomStyle,
				// 表单
				labelStyle,
				formData: {},
				rules: {},
				hasRes: false
			}
		},
		onLoad() {},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #E7F3F4 0%, rgba(231, 243, 244, 0) 50%, #fefefe, #fdfdfd, #fff) !important;
	}

	.register-page {
		width: 750rpx;
		height: 100vh;
		background: #FFFFFF;
		border-radius: 24rpx 24rpx 0 0;
		box-sizing: border-box;
		padding: 32rpx 48rpx;

		.top-wrap {
			font-size: 32rpx;
			color: #1D2129;
			font-weight: 500;

			.btn {
				box-sizing: border-box;
				width: 112rpx;
				height: 64rpx;
				border-radius: 12rpx 12rpx 12rpx 12rpx;
				border: 2rpx solid #008474;
				font-size: 28rpx;
				font-weight: 400;
				color: #008474;
			}

			.text {
				margin: 24rpx 0;
				font-size: 24rpx;
				font-weight: 400;
				color: #4E5969;
				// line-height: 48rpx;
			}
		}

		// 查询
		.middle-wrap {
			margin-bottom: 24rpx;

			.search-icon {
				width: 70rpx;
			}

			.scan-wrap {
				margin-left: 36rpx;
			}
		}

		.bottom-wrap {
			padding-bottom: 150rpx;

			.form-wrap {
				.dynamic-form {
					width: 100%;
					box-sizing: border-box;
					display: grid;
					grid-template-columns: 47% 47%;
					column-gap: 40rpx;
					row-gap: 0rpx;
				}

				.static-form {
					.form-item {
						width: 100%;

						.form-input-item {
							width: 100%;
						}

						.suffix {
							text-align: right;
							width: 120rpx;
							margin-left: 24rpx;
							font-size: 28rpx;
							color: #4E5969;
						}
					}
				}
			}
		}
	}

	.list-item {
		padding-bottom: 24rpx;
		box-sizing: border-box;
		width: 100%;
		border-bottom: 2rpx solid;
		border-image: linear-gradient(90deg, rgba(229, 230, 235, 0), rgba(229, 230, 235, 0.8), rgba(229, 230, 235, 0)) 2 2;

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
					border: 1rpx solid;
					border-image: linear-gradient(180deg, rgba(229, 230, 235, 0), rgba(229, 230, 235, 0.8), rgba(229, 230, 235, 0)) 2 2;
				}
			}
		}
	}
</style>
<style lang="scss" scoped>
	::v-deep .form-wrap .u-form-item__body {
		padding: 12rpx 0 !important;

		.u-form-item__body__left__content {
			text-align: left !important;
			margin-bottom: 10rpx;
		}

		.u-form-item__body__left__content__label {
			color: #4E5969;
			text-align: left !important;
			justify-content: flex-start !important;
		}
	}
</style>