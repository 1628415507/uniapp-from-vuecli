<!--
 * @Description: 临时预约登记
 * @Date: 2023-08-04 17:34:31
 * @LastEditTime: 2023-08-29 16:10:16
-->
<template>
	<!-- 账号登录 -->
	<view class="booking-page">
		<view class="login-content">
			<!-- 车牌号 -->
			<plate-input :plate="plateNo" @export="setPlate" class="plate-input" />
			<u-form :ref="formRef" :model="formData" labelPosition="left" labelWidth="0">
				<view class="phone-method">
					<u-form-item label=" " border="none">
						<u-input v-model="formData.phoneNumber" placeholder="请输入手机号">
							<template slot="prefix">
								<view class="phone-prefix" @click="showTelCodesPopup = true">
									<text class="num">+{{telCode}}</text>
									<u-icon name="arrow-down"></u-icon>
									<text class="line">|</text>
								</view>
							</template>
						</u-input>
					</u-form-item>
					<view class="code-wrap">
						<u-button :loading="codeLoading" loadingText="获取验证码" @click="setVerificationCode"
							:disabled="!formData.phoneNumber" type="primary">获取验证码</u-button>
					</view>
				</view>
			</u-form>
		</view>
		<view class="g-footer-btn flex-c" style="bottom:100rpx">
			<u-button type="primary" @click="goNext">下一步</u-button>
		</view>
		<!-- 电话区码弹框 -->
		<TelCodesPopup v-if="showTelCodesPopup" :show.sync="showTelCodesPopup" @getInfo="getTelCodesInfo">
		</TelCodesPopup>
		<!-- 输入验证码 -->
		<SetCodesPopup v-if="setCodesPopup" :show.sync="setCodesPopup" @confirm="getVerificationCode">
		</SetCodesPopup>
	</view>
</template>

<script>
	import PlateInput from '@/components/uni-plate-input/uni-plate-input.vue';
	import TelCodesPopup from "@/components/tel-codes/index.vue";
	import SetCodesPopup from "./component/code-popup.vue";
	import {
		login
	} from '@/apis/login.js'
	export default {
		components: {
			TelCodesPopup,
			SetCodesPopup,
			PlateInput
		},
		data() {
			return {
				plateNo: '',
				plateShow: false,
				// 公共
				colorTheme: '#008474',
				// 手机号登录
				telCode: "86",
				// 验证码
				codeLoading: false,
				showTelCodesPopup: false,
				setCodesPopup: false,
				// 密码登录
				formRef: 'loginFormRef',
				formData: {
					phoneNumber: '13960081319',
				},
				formRules: {}
			};
		},
		mounted() {},
		onReady() {
			this.$nextTick(() => {
				// 需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
				this.$refs[this.formRef]?.setRules(this.formRules);
			})
		},
		onLoad() {},
		methods: {
			goNext() {
				if (this.plateNo.length < 7) {
					return uni.showToast({
						title: '请输入完整的车牌号码!',
						icon: 'none'
					})
				} else {}
			},
			setPlate(plate) {
				if (plate.length >= 7) {
					this.plateNo = plate
				}
				console.log('setPlate', plate);
				// this.plateShow = true
			},
			// 手机号登录-获取手机号区码
			getTelCodesInfo(info) {
				this.telCode = info.value
			},
			// 手机号登录-发送验证码
			setVerificationCode() {
				if (!uni.$u.test.mobile(this.formData.phoneNumber)) {
					uni.$u.toast('手机号格式不正确');
					return
				}
				this.codeLoading = true
				// 模拟调接口
				// setTimeout(() => {
				// 	this.codeLoading = false
				// 	this.setCodesPopup = true
				// }, 2000);
			},
			// 手机号登录-获取验证码
			getVerificationCode(code) {
				this.getCommonInfo()
			},
			// 公共-获取需要的公共信息
			getCommonInfo() {
				this.$store.dispatch('user/setActiveTab', 'home'); //设置激活的tab，默认首页
				this.$store.dispatch('user/setUserInfo', this.formData); //设置激活的tab，默认首页
				this.$store.dispatch('dictionary/setDicts') // 获取字典
				// 跳转
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
		}
	};
</script>
<style lang="scss" scoped>
	::v-deep .plate-input .u-radio-group {
		justify-content: space-between !important;
	}

	::v-deep .weixin-btn .u-icon__icon {
		font-size: 48rpx !important;
	}

	::v-deep .u-form-item__body__left {
		width: 0rpx !important;
	}

	::v-deep .u-input__content__prefix-icon {
		width: 170rpx !important;
	}

	page {
		background: #e8f3f5 !important;
	}

	.booking-page {
		position: relative;
		background: #e8f3f5 !important;

		.login-content {
			position: relative;
			z-index: 99999;
			box-sizing: border-box;
			width: 100%;
			// height: 80vh;
			padding: 48rpx 32rpx 30rpx 32rpx;
			border-radius: 50rpx 50rpx 0 0;
			background: #FFFFFF;
			overflow: hidden;

			.title {
				margin-bottom: 50rpx;
				font-size: 52rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #1D2129;
			}

		}
	}

	// 手机号登录
	.phone-method {
		margin-top: 36rpx;

		// 手机号前缀
		.phone-prefix {
			display: flex;
			font-size: 32rpx;
			font-weight: 400;
			color: #1D2129;
			line-height: 48rpx;

			.num {
				width: 110rpx;
			}

			.line {
				color: #D9DCE1;
				padding: 0 10rpx;
			}
		}

		.code-wrap {
			margin: 32rpx auto;
		}
	}
</style>