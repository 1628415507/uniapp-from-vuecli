<!--
 * @Description: 登录页
 * @Date: 2023-08-04 17:34:31
 * @LastEditTime: 2023-08-29 16:10:16
-->
<template>
	<!-- 账号登录 -->
	<view class="login-page">
		<u-swiper :list="swiperList" height="422rpx" indicator indicatorStyle="bottom:70rpx"
			:indicatorActiveColor="colorTheme" indicatorMode="dot"></u-swiper>
		<view class="login-content">
			<view class="title"> 欢迎登录 </view>
			<view class="tabs-wrap">
				<u-tabs :list="tabsList" itemStyle="font-size: 32px;color: #1D2129; height:65rpx" @click="tabClick"
					:lineColor="colorTheme" :current="currentTab" lineWidth="80rpx" lineHeight="6rpx"></u-tabs>
			</view>
			<!-- 登录方式 -->
			<!-- APP支持 :rules="formRules" -->
			<u-form :ref="formRef" :model="formData" labelPosition="left" labelWidth="0">
				<!-- 手机号登录 -->
				<view v-if="loginMethod==='phone'" class="phone-method">
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

				<!-- 密码登录 -->
				<view v-if="loginMethod==='pwd'" class="pwd-method">
					<view class="pwd-method-form">
						<u-form-item label=" " prop="username">
							<u-input v-model="formData.username" placeholder-class="placeholder-tips"
								placeholder="请输入账号">
							</u-input>
						</u-form-item>
						<u-form-item label=" " prop="password">
							<u-input v-model="formData.password" :password="!pwdVisible"
								placeholder-class="placeholder-tips" placeholder="请输入密码">
								<template slot="suffix">
									<u-icon :name="pwdVisible?'eye-fill':'eye-off'" size="28"
										@click="pwdVisible=!pwdVisible"></u-icon>
								</template>
							</u-input>
						</u-form-item>
						<u-form-item label=" ">
							<u-checkbox-group v-model="formData.isRemember" placement="row" size="28rpx" iconSize="13px"
								activeColor="#008474">
								<u-checkbox label="记住我" :activeColor="colorTheme" name="remember" labelSize="28rpx">
								</u-checkbox>
							</u-checkbox-group>
						</u-form-item>
					</view>
					<u-button type="primary" @click="loginByPwd">登录</u-button>
				</view>

				<!-- 同意协议 -->
				<view class="protocol-wrap">
					<view style="margin-top: 9rpx;">
						<u-checkbox-group v-model="formData.isAgree" placement="row" size="28rpx" iconSize="13px"
							activeColor="#008474">
							<u-checkbox label=" " :activeColor="colorTheme" :name="true" labelSize="28rpx">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<view class="protocol-txt">
						未注册的手机号，登录时将自动注册，且代表您已 同意<text class="highlight">《某某注册协议》</text>和 <text
							class="highlight">《某某隐私政策》</text>
					</view>
				</view>
			</u-form>
			<!-- 更多登录方式 -->
			<view class="more-methods">
				<u-divider text="更多登录方式" lineColor="#E5E6EB" textColor="#86909C" textSize="28rpx"></u-divider>
				<!-- APP登录 -->
				<!-- #ifdef APP-PLUS  -->
				<view class="flex-sb">
					<view class="btn-item-wrap flex-c">
						<view class="btn-item flex-c" @click="loginOnAppByWechat">
							<u-icon name="weixin-fill" color="#09BB07" size="48"></u-icon>
							<text class="label">微信登录</text>
						</view>
					</view>
					<view class="btn-item-wrap flex-sb">
						<view class="btn-item flex-c" @click="loginOnAppByDDing">
							<u--image :src="require('@/static/image/icons/dingding.png')" width="48rpx"
								height="48rpx"></u--image>
							<text class="label">钉钉登录</text>
						</view>
					</view>
				</view>
				<!-- #endif  -->
				<!-- 微信 -->
				<!-- #ifdef MP-WEIXIN  -->
				<view class="weixin-btn flex-c">
					<!-- 			<view v-if="!formData.isAgree[0]" class="btn-item-wrap flex-c" style="width: 100%;">
						<view class="btn-item flex-c" @click="loginByWeChat">
							<u-icon name="weixin-fill" color="#09BB07" size="48"></u-icon>
							<text class="label">微信授权登录</text>
						</view>
					</view> -->
					<u-button v-if="!formData.isAgree[0]" icon="weixin-fill" iconColor="#09BB07" class="custom-style"
						@click="loginByWeChat">微信授权登录
					</u-button>
					<u-button v-else open-type="getPhoneNumber" icon="weixin-fill" iconColor="#09BB07"
						class="custom-style" @getphonenumber="getPhoneNumber">微信授权登录
					</u-button>
				</view>
				<!-- #endif  -->
			</view>
		</view>

		<!-- 电话区码弹框 -->
		<TelCodesPopup v-if="showTelCodesPopup" :show.sync="showTelCodesPopup" @getInfo="getTelCodesInfo">
		</TelCodesPopup>
		<!-- 输入验证码 -->
		<SetCodesPopup v-if="setCodesPopup" :show.sync="setCodesPopup" @confirm="getVerificationCode">
		</SetCodesPopup>
		<!-- 同意协议提示框 -->
		<u-modal :show="showAgreeModal" title="提示" @confirm="handleAgree" ref="uModal" width="600rpx"
			:showCancelButton="true" confirmText="同意" :confirmColor="colorTheme" @cancel="showAgreeModal=false">
			<view class="slot-content">
				<!-- <rich-text :nodes="content"></rich-text> -->
				<view class="protocol-txt">
					请先同意<text class="highlight">《某某注册协议》</text>和 <text class="highlight">《某某隐私政策》</text>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import TelCodesPopup from "@/components/tel-codes/index.vue";
	import SetCodesPopup from "./component/code-popup.vue";
	import {
		login
	} from '@/apis/login.js'
	export default {
		components: {
			TelCodesPopup,
			SetCodesPopup
		},
		data() {
			return {
				// 公共
				colorTheme: '#008474',
				showAgreeModal: false,
				swiperList: [
					require('@/static/image/demo/swiper1.png'),
				],
				loginMethod: 'phone',
				currentTab: '0',
				tabsList: [{
					name: '手机号',
					value: 'phone'
				}, {
					name: '密码登录',
					value: 'pwd'
				}],
				// 手机号登录
				telCode: "86",
				// 验证码
				codeTips: '',
				codeDisabled: false,
				codeLoading: false,
				showTelCodesPopup: false,
				setCodesPopup: false,
				// 密码登录
				pwdVisible: false,
				formRef: 'loginFormRef',
				formData: {
					username: 'admin',
					password: '123456',
					isRemember: [], //记住我
					phoneNumber: '13960081319',
					isAgree: [], //同意协议
					// wechatCode: '',
				},
				formRules: {
					username: {
						type: 'string',
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					},
					password: {
						type: 'string',
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					// phoneNumber: [{
					// 		required: true,
					// 		message: '请输入手机号',
					// 		trigger: ['change', 'blur'],
					// 	},
					// 	{
					// 		validator: (rule, value, callback) => {
					// 			// 上面有说，返回true表示校验通过，返回false表示不通过
					// 			// uni.$u.test.mobile()就是返回true或者false的
					// 			return uni.$u.test.mobile(value);
					// 		},
					// 		message: '手机号格式不正确',
					// 		trigger: ['change', 'blur'],
					// 	}
					// ],
				}
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
			// 公共-登录方式切换
			tabClick(item) {
				this.loginMethod = item.value
				this.currentTab = item.index
				console.log('item', item);
			},
			// 公共-验证是否同意授权
			validAgree() {
				if (!this.formData.isAgree[0]) {
					this.showAgreeModal = true
					return false
				} else {
					return true
				}
			},
			// 公共-同意
			handleAgree() {
				// console.log('handleAgree', this.formData.isAgree[0]);
				this.formData.isAgree = [true]
				this.showAgreeModal = false
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
				if (!this.validAgree()) {
					return
				}
				this.codeLoading = true
				// 模拟调接口
				setTimeout(() => {
					this.codeLoading = false
					this.setCodesPopup = true
				}, 2000);
			},
			// 手机号登录-获取验证码
			getVerificationCode(code) {
				this.getCommonInfo()
			},
			// 密码登录
			loginByPwd() {
				this.$refs[this.formRef]?.validate().then(res => {
					if (!this.validAgree()) {
						return
					}
					// 调接口
					//   login(this.formData).then(res => {
					//     console.log('【 login-success 】-30', res);
					this.getCommonInfo()
					//   }).catch((err) => {
					//       uni.showToast({
					//         icon: 'none',
					//         title: err.message || '登录失败',
					//         duration: 2000
					//       })
					//   })
				});
			},
			// APP端-微信登录
			loginOnAppByWechat() {
				if (!this.validAgree()) {
					return
				}
				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, // 微信登录仅请求授权认证
					success: function(event) {
						const {
							code
						} = event
						console.log('登录成功，获取登录凭证', code);
					},
					fail: function(err) {
						console.log('登录授权失败', err);
						// 登录授权失败  
						// err.code是错误码
					}
				})
			},
			// APP端-钉钉登录
			loginOnAppByDDing() {
				uni.login({
					provider: 'dingtalk',
					success: function(res) {
						var code = res.code;
						console.log('钉钉-登录成功，获取登录凭证', code);
						// 登录成功，获取登录凭证 res.code
						// 发起请求将 code 发送到服务器进行登录验证，获取用户信息等操作
					},
					fail: function(err) {
						console.log('钉钉-登录授权失败', err);
					}
				});
			},
			// 小程序-微信授权登录
			loginByWeChat() {
				if (!this.validAgree()) {
					return
				}
			},
			// 小程序-手机授权登录
			getPhoneNumber(e) {
				console.log('手机授权登录')
				if (!this.validAgree()) {
					return
				}
				if (e.detail.errMsg === 'getPhoneNumber:ok') {
					console.log(e.detail, '手机授权')
					// login({
					// 	...this.formData,
					// 	wechatCode: e.detail.code // 授权码
					// }).then(res => {
					// 	console.log('【 login-success 】-30', res);
					this.getCommonInfo()
					// }).catch((err) => {
					// 	uni.showToast({
					// 		icon: 'none',
					// 		title: err.message || '登录失败',
					// 		duration: 2000
					// 	})
					// })
				}
				// console.log('getPhoneNumber', e)
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
	::v-deep .weixin-btn .u-icon__icon {
		font-size: 48rpx !important;
	}

	::v-deep .u-form-item__body__left {
		width: 0rpx !important;
	}

	::v-deep .u-input__content__prefix-icon {
		width: 170rpx !important;
	}

	// ::v-deep .u-checkbox {
	// 	min-width: 32rpx !important;
	// 	height: 32rpx !important;
	// }

	// ::v-deep .u-checkbox__icon-wrap {
	// 	width: 32rpx !important;
	// 	height: 32rpx !important;
	// }


	//
	.login-page {
		position: relative;

		.login-content {
			position: relative;
			z-index: 100;
			margin-top: -40rpx;
			box-sizing: border-box;
			width: 100%;
			// height: 80vh;
			padding: 70rpx 40rpx 30rpx 40rpx;
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

			.tabs-wrap {
				margin: 20rpx auto;
			}
		}

		// 协议
		.protocol-wrap {
			margin-top: 30rpx;
			display: flex;
			align-items: flex-start;
			font-size: 28rpx;
			font-weight: 400;
			color: #4E5969;
			line-height: 44rpx;
		}

		// 更多方式
		.more-methods {
			margin-top: 150rpx;

			.btn-item-wrap {
				width: 48%;
				height: 90rpx;
				border-radius: 12rpx;
				border: 2rpx solid #D9DCE1;

				.btn-item {
					width: 100%;
					line-height: 90rpx;
					text-align: center;

					.label {
						display: inline-block;
						padding: 0 10rpx;
						min-width: 125rpx;
					}
				}
			}
		}
	}

	// 手机号登录
	.phone-method {

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
			margin: 48rpx auto;
		}
	}

	// 密码登录
	.pwd-method {
		.pwd-method-form {
			margin-bottom: 30rpx;
		}

		.tips {
			margin-top: 32rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: $colorTheme;
			line-height: 40rpx;
			text-align: center;
		}
	}
</style>