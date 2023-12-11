<template>
	<view class="register-page">
		<view class="top-wrap">
			<view class="title flex-sb">
				<text>出库任务号:RK202307020001</text>
			</view>
			<view class="list-item divider-bottom">
				<view class="list-item__content ">
					<view class="content-top flex-sb">
						<view class="content-top__left">
							<u--image :src="require('@/static/image/out-store.png')" width="192rpx"
								height="108rpx"></u--image>
						</view>
						<view class="content-top__right flex-col-sa">
							<view class="desc ellipsis">
								货品名称货品名称货品名货品名称货品名称货品名称货品货称货品货
							</view>
							<view class="count">20个/箱</view>
						</view>
					</view>
					<view class="content-middle">
						<view class="text ellipsis">货品编码:123456789012</view>
						<view class="text ellipsis">已登记/计划数:100/1000个</view>
						<view class="text ellipsis">生产日期:2023-12-12</view>
						<view class="text ellipsis">失效日期:2023-12-12</view>
						<view class="text ellipsis" v-for="item in 4" :key="item.key">
							批次属性01:这里是批次属性
						</view>
						<view class="divider"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="middle-wrap divider-bottom">
			<view class="search-warp flex-sb">
				<u-input v-model="keyword" placeholder="请扫描货品条码" :customStyle="inputCustomStyle" border="none">
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
			<view class="flex-sb num-info" style="width: 80%;">
				<text>本次挑选数量:10</text>
				<text>计划可登记数量:80</text>
			</view>
		</view>
		<view v-if="hasRes" class="bottom-wrap">
			<!-- calc(100vh - 500rpx) -->
			<scroll-view :scroll-y="true" :style="{ height:  '100%'}">
				<u--form labelPosition="left" :model="formData" :rules="rules" ref="formRef" labelAlign="right"
					:labelStyle="labelStyle">
					<view class="form-wrap">
						<view v-for="item in 6" class="form-item  divider-bottom">
							<view class="text">库存可用数:1000个</view>
							<u-form-item label="本次登记数:" prop="name" labelWidth="auto" labelAlign="right">
								<view class="form-input-item flex">
									<u-input v-model="formData.name" type="number"
										:customStyle="formInputCustomStyle"></u-input>
									<text class="suffix">个</text>
								</view>
							</u-form-item>
							<view class="batch-props">
								<text class="ellipsis">生产日期:2023-12-12</text>
								<text class="ellipsis">失效日期:2023-12-12</text>
								<text class="ellipsis" v-for="item in 6" :key="item.key">
									批次属性01:这里是批次属性
								</text>
							</view>
						</view>
					</view>
					<!-- <Empty text="请扫货品条码" marginTop="100"></Empty> -->
				</u--form>
			</scroll-view>
		</view>
		<view class="g-footer-btn flex-c" style="bottom:140rpx">
			<u-button type="primary" @click="handleRegister">出库登记</u-button>
		</view>
		<view class="g-footer-btn flex-c" style="bottom:50rpx">
			<u-button type="primary" plain @click="handleRegister">下一条</u-button>
		</view>
	</view>
</template>

<script>
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
		padding: '5rpx',
		background: '#fff',
		height: '64rpx !important',
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
			Empty
		},
		data() {
			return {
				// 输入框
				keyword: '',
				inputCustomStyle,
				// 表单
				labelStyle,
				formData: {},
				rules: {},
				hasRes: true
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

	::v-deep .form-input-item .u-input {
		height: 64rpx;
		box-sizing: border-box;
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

			.title {
				margin-bottom: 24rpx;
				font-weight: 500;
				font-size: 32rpx;
				color: #1D2129;
			}

			.list-item {
				padding-bottom: 24rpx;
				box-sizing: border-box;
				width: 100%;

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
		}

		// 查询
		.middle-wrap {
			margin-top: 24rpx;
			padding-bottom: 24rpx;

			.search-warp {
				margin-bottom: 24rpx;

				.search-icon {
					width: 70rpx;
				}

				.scan-wrap {
					margin-left: 36rpx;
				}
			}

			.num-info {
				font-size: 28rpx;
				font-weight: 400;
				color: #1D2129;
				line-height: 44rpx;
			}
		}

		.bottom-wrap {
			overflow: hidden;
			height: calc(100vh - 625rpx);
			overflow-y: hidden;

			.form-wrap {
				padding-bottom: 250rpx;

				.form-item {
					padding: 24rpx 0;
					width: 100%;
					font-size: 28rpx;
					color: #4E5969;

					.form-input-item {
						width: 230rpx;

						.suffix {
							text-align: right;
							margin-left: 24rpx;
						}
					}

					.batch-props {
						display: grid;
						grid-template-columns: 48% 48%;
						grid-gap: 24rpx;
					}
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