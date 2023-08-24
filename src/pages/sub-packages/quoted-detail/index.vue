<!--
 * @Description:报价详情
 * @Date: 2023-08-18 14:57:03
 * @LastEditTime: 2023-08-24 17:15:36
-->

<template>
	<view class="detail-page">
		<u-form labelPosition="left" :model="formData" ref="formRef" :rules="formRules" :labelStyle="labelStyle"
			:labelWidth="labelWidth">
			<!-- 倒计时 -->
			<view class="time-wrap">
				<view class="time-wrap__top flex-sb">
					<view class="label flex">
						<u-image :src="require('@/static/image/icons/trophy.svg')" width="48rpx"
							height="48rpx"></u-image>
						<text style="margin-left: 15rpx;">
							{{biddingStatus===BINDING_STATUS.END?'竞价结束':'竞价剩余时间'}}
						</text>
					</view>
					<view v-if="biddingStatus===BINDING_STATUS.QUOTING" class="countdown">
						<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm" autoStart @change="countDownChange">
							<view class="time flex">
								<view class="time__item">{{ timeData.days }}</view>
								<text class="time__txt">天</text>
								<view class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</view>
								<text class="time__txt">时</text>
								<view class="time__item">{{ timeData.minutes }}</view>
								<text class="time__txt">分</text>
							</view>
						</u-count-down>
					</view>
				</view>
				<view class="time-wrap__bottom">
					<view class="value">2</view>
					<view class="label">
						{{biddingStatus===BINDING_STATUS.END?'竞价排名':'当前竞价排名'}}
					</view>
				</view>
			</view>
			<!-- 报价信息 -->
			<view class="info-wrap">
				<view class="box-title">报价信息</view>
				<view class="form--required">
					<u-form-item v-if="biddingStatus===BINDING_STATUS.QUOTING" label="税率" prop="taxRate" borderBottom
						@click="showSelectPopup=true">
						<u--input v-model="formData.taxRate" readonly placeholder="请选择" border="none"
							inputAlign="right"></u--input>
						<u-icon slot="right" name="arrow-right" color="#86909C"></u-icon>
					</u-form-item>
				</view>
				<u-form-item v-if="biddingStatus!==BINDING_STATUS.QUOTING" label="税率" borderBottom>
					<view class="form-txt">{{info.taxRate||'-'}}</view>
				</u-form-item>
				<view class="form--required">
					<u-form-item v-if="biddingStatus===BINDING_STATUS.QUOTING" label="含税总额" borderBottom
						labelPosition="top" prop="includingTaxPriceTotal">
						<u--input v-model="formData.includingTaxPriceTotal" type="digit" border="none" placeholder=" "
							prefixIcon="rmb" prefixIconStyle="fontSize:48rpx;color:#4E5969"
							customStyle="marginTop:20rpx" fontSize="48rpx"></u--input>
					</u-form-item>
				</view>
				<template v-if="biddingStatus!==BINDING_STATUS.QUOTING">
					<u-form-item label="含税总额">
						<view class="form-txt bold">657.456</view>
					</u-form-item>
					<u-form-item label="不含税总额" borderBottom>
						<view class="form-txt bold">657.456</view>
					</u-form-item>
				</template>
				<view class="form--required">
					<u-form-item label="报价说明" borderBottom class="form-label" prop="quotationExplain">
						<u-textarea v-if="biddingStatus===BINDING_STATUS.QUOTING" v-model="formData.quotationExplain"
							border="none" count maxlength="140" placeholder="请输入内容" height="100rpx"
							inputAlign="right"></u-textarea>
						<view v-else class="txt">报价说明报价说明，报价说明报价说明 报价说明报价说明</view>
					</u-form-item>
				</view> <u-form-item label="询价说明" borderBottom>
					<view class="txt">报价说明报价说明，报价说明报价说明 报价说明报价说明</view>
				</u-form-item>
			</view>
			<!-- 委托明细 -->
			<view class="info-wrap">
				<view class="box-title">委托明细</view>
				<view class="list-wrap">
					<view class="list-item" v-for="(item,index) in 2" :key="index">
						<view class="content-top flex-sb">
							<view class="flex">
								<u-image :src="require('@/static/image/icons/compass-light.svg')" width="40rpx"
									height="40rpx"></u-image>
								<text class="txt ellipsis">总里程 {{index||'-'}}</text>
							</view>
							<view class="flex" @click="goUrl(item)">
								<text class="txt">水运</text>
								<u-icon name="arrow-right" color="#86909C"></u-icon>
							</view>
						</view>
						<view class="content-middle">
							<view class="flex-sb">
								<view class="content-middle__item">
									<view class="label">计划总数量</view>
									<view>{{item.planTotalQty ||'-'}} KG</view>
								</view>
								<view class="content-middle__item">
									<view class="label">计划总体积</view>
									<view>{{item.planTotalVolume ||'-'}} CDM</view>
								</view>
								<view class="content-middle__item">
									<view class="label">计划总重量</view>
									<view>{{item.planTotalWeight ||'-'}} CT</view>
								</view>
							</view>
						</view>
						<view class="content-bottom">
							<view class="g-steps-wrap">
								<u-steps :current="0" direction="column">
									<u-steps-item title="深圳龙湖分拨中心" desc="起运地">
										<text slot="icon" class="steps-icon blue">装</text>
									</u-steps-item>
									<u-steps-item title="深圳龙湖分拨中心分拨中心分拨中心" desc="目的地">
										<text slot="icon" class="steps-icon">卸</text>
									</u-steps-item>
								</u-steps>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 询价信息 -->
			<view class="info-wrap">
				<view class="box-title">询价信息</view>
				<u-form-item label="询价标题" borderBottom>
					<view class="form-txt">{{info.dispatchNo}}</view>
				</u-form-item>
				<u-form-item label="询价日期" borderBottom>
					<view class="form-txt">{{info.taskNo}}</view>
				</u-form-item>
				<u-form-item label="询价方" borderBottom>
					<view class="form-txt">{{info.taskNo}}</view>
				</u-form-item>
				<u-form-item label="询价有效期" borderBottom>
					<view class="form-txt">{{info.taskNo}}</view>
				</u-form-item>
			</view>
		</u-form>
		<view class="footer-btn flex-sb">
			<view class="btn-item">
				<u-button text="弃标" @click="confirmShow = true"></u-button>
			</view>
			<view class="btn-item">
				<u-button type="primary" text="提交报价" @click="submit"></u-button>
			</view>
		</view>
		<!-- 确认框 -->
		<u-modal :show="confirmShow" :showCancelButton="true" :confirmColor="colorTheme" @cancel="confirmShow=false"
			@confirm="confirmModal">
			<view style="width: 100%;">
				<view style="margin:10rpx 0">弃标理由：</view>
				<u--textarea v-model="reason" placeholder="请输入"></u--textarea>
			</view>
		</u-modal>
		<!-- 下拉框 -->
		<select-popup v-if="showSelectPopup" :show.sync="showSelectPopup" value-prop="value" label-prop="label"
			:defaultValue="selectDefaultValue" :multiple="false" @getInfo="getSelectInfo" :list="selectList">
		</select-popup>
	</view>
</template>

<script>
	import SelectPopup from "@/components/select-popup/index.vue";
	import {
		taskDetail,
		signedNode,
		uploadFile
	} from '@/apis/quoted-detail.js'
	import {
		validFloatNumber
	} from '@/utils/validator.js'
	export default {
		components: {
			SelectPopup
		},
		data() {
			return {
				// 公共
				loadInfo: {},
				colorTheme: this.$store.getters.colorTheme,
				biddingStatus: '1',
				BINDING_STATUS: {
					QUOTING: '1', //待报价
					QUOTED: '2', //已报价
					END: '3' //竞价结束
				},
				// 倒计时
				timeData: {},
				// 表单
				labelWidth: '170rpx',
				labelStyle: {
					color: '#4E5969 !important' //#4E5969
				},
				date: Number(new Date()),
				info: {},
				formData: {
					taxRate: '',
					includingTaxPriceTotal: '',
					quotationExplain: ''
				},
				formRules: {
					'taxRate': [{
						type: 'string',
						required: true,
						message: '请选择税率',
						trigger: ['blur', 'change']
					}],
					'includingTaxPriceTotal': [{
						type: 'string',
						required: true,
						message: '请输入含税总额',
						trigger: ['blur', 'change']
					}, {
						validator: validFloatNumber,
						trigger: ['blur', 'change']
					}],
					'quotationExplain': {
						type: 'string',
						required: true,
						message: '请输入报价说明',
						trigger: ['blur', 'change']
					}
				},
				// 确认框
				confirmShow: false,
				reason: "",
				// 下拉框
				showSelectPopup: false,
				selectDefaultValue: 1,
				selectList: [{
						label: '选项一',
						value: 1
					},
					{
						label: '选项二',
						value: 2
					},
					{
						label: '选项三',
						value: 3
					}, {
						label: '禁用选项',
						value: 4,
						disabled: true,
					},
					{
						label: '选项五',
						value: 5
					}, {
						label: '选项六',
						value: 6
					}, {
						label: '选项七',
						value: 7
					},
					{
						label: '选项八',
						value: 8
					}, {
						label: '选项六',
						value: 9
					}
				],

			}
		},
		computed: {
			SIGN_MODE() {
				return this.$dict.getDictOptions('SIGN_MODE') || []
			}
		},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs.formRef.setRules(this.formRules)
		},
		onLoad(opt) {
			this.loadInfo = opt
			this.getDetailInfo(opt.id)
		},
		methods: {
			getDetailInfo(id) {
				taskDetail({
					mtsTaskTmId: id
				}).then(res => {
					this.info = res.data || {}
				})
			},
			goUrl(item) {
				uni.navigateTo({
					url: `/pages/sub-packages/quoted-detail/detail?id=${item.mtsDispatchId}`
				});
			},
			countDownChange(e) {
				this.timeData = e
			},
			// 确认弹框
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
					this.confirmShow = false
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 300)
				})
			},
			submit() {
				this.$refs.formRef?.validate().then(res => {
					signedNode({
						mtsTaskTmId: this.loadInfo.id,
						taskStatus: this.info.taskStatus,
						...this.formData
					}).then(res => {
						uni.showToast({
							icon: 'none',
							title: '操作成功',
							duration: 2000
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 300)
					})
				});
			},
			getSelectInfo(info) {
				this.formData.taxRate = info.label
				this.selectDefaultValue = info.value
				this.$refs.formRef.validateField('taxRate')
				console.log('=下拉getSelectInfo==', info)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	.form--required {
		.u-form-item__body__left__content__label {
			&::after {
				content: '*';
				margin-left: 5rpx;
				color: red;
			}
		}
	}

	.bold {
		font-weight: 600;
		font-size: 35rpx;
		color: #1D2129;
	}

	.detail-page {
		position: relative;
		background-color: #fff;
		padding: 5rpx;
		box-sizing: border-box;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
	}

	.time-wrap {
		height: 320rpx;
		background: linear-gradient(to bottom, #f0f7f6, #fdfefe) !important;
		border-radius: 30rpx 30rpx 0 0;
		box-sizing: border-box;
		padding: 24rpx 32rpx;

		.time-wrap__top {
			.label {
				width: 230rpx;
				font-size: 28rpx;
			}

			.time {

				&__item {
					color: #fff;
					font-size: 22rpx;
					text-align: center;
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					background: #008474;
					border-radius: 4rpx;
				}

				.time__txt {
					color: #1D2129;
					font-size: 26rpx;
					padding: 0px 4px;
				}
			}
		}

		.time-wrap__bottom {
			margin-top: 28rpx;
			width: 100%;
			height: 196rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 24rpx 56rpx 0rpx rgba(209, 233, 230, 0.3);
			border-radius: 16rpx;
			text-align: center;

			.value {
				font-size: 88rpx;
				font-weight: bold;
				color: #008474;
			}

			.label {
				font-size: 28rpx;
			}
		}
	}

	// ::v-deep .form-label .u-form-item__body__left {
	// 	display: flex;
	// 	flex-direction: row;
	// 	align-items: flex-start !important;
	// }

	.info-wrap {
		padding: 24rpx 32rpx;

		.box-title {
			margin-bottom: 24rpx;
			box-sizing: border-box;
			width: 100%;
			padding-left: 16rpx;
			border-left: 4rpx solid $colorTheme;
			font-size: 32rpx;
			font-weight: 500;
			color: #1D2129;
		}

		.steps-icon {
			width: 64rpx;
			height: 64rpx;
			line-height: 64rpx;
			text-align: center;
			background: #008474;
			border-radius: 50%;
			font-size: 28rpx;
			color: #FFFFFF;
		}

		.blue {
			background: #2572CC;
		}

		.form-txt {
			text-align: right;
		}
	}

	.list-wrap {
		.list-item {
			margin-bottom: 24rpx;
			box-sizing: border-box;
			width: 100%;
			background: #FFFFFF;
			border-radius: 16rpx;
			border: 3rpx solid #E5E6EB;
			padding: 24rpx;

			.label {
				font-size: 24rpx;
				color: #86909C;
			}

			.content-top {
				border-bottom: 2rpx solid $colorBorder;
				padding-bottom: 24rpx;
				font-size: 32rpx;
				font-weight: 500;

				.txt {
					margin: auto 12rpx;
				}
			}

			.content-middle {
				margin: 24rpx auto;
				font-size: 30rpx;
				font-weight: 500;
				color: #1D2129;
				font-size: 24rpx;

				.content-middle__item {
					text-align: center;
					line-height: 45rpx;
					font-size: 30rpx;
				}
			}
		}
	}

	.footer-btn {
		padding: 24rpx 32rpx;

		.btn-item {
			width: 48%;
		}
	}
</style>