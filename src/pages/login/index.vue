<template>
	<!-- 账号登录 -->
	<view class="login-wrap">
		<u-swiper :list="swiperList" height="422rpx" indicator indicatorStyle="bottom:70rpx"
			indicatorActiveColor="#008474" indicatorMode="dot"></u-swiper>
		<view class="login-content">
			<view class="title"> 欢迎登录 </view>
			<view class="tabs-wrap">
				<u-tabs :list="tabsList" itemStyle="font-size: 32px;color: #1D2129; height:50rpx" @click="tabClick"
					:current="currentTab"></u-tabs>
			</view>
			<!-- 密码登录 -->
			<u-form :ref="formRef" :model="formData" :rules="rules" labelPosition="left" labelWidth="0">
				<view v-if="loginMethod==='pwd'" class="account-content">
					<view class="form-wrap">
						<u-form-item label=" " prop="username">
							<u-input v-model="formData.username" placeholder-class="placeholder-tips"
								placeholder="请输入账号">
							</u-input>
						</u-form-item>
						<u-form-item label=" " prop="password" border="none">
							<u-input v-model="formData.password" :password="!pwdVisible"
								placeholder-class="placeholder-tips" placeholder="请输入密码">
								<template slot="suffix">
									<u-icon :name="pwdVisible?'eye-fill':'eye-off'" size="28"
										@click="pwdVisible=!pwdVisible"></u-icon>
								</template>
							</u-input>
						</u-form-item>
						<u-form-item label=" " border="none">
							<u-checkbox-group v-model="formData.isRemember" placement="row" @change="checkboxChange">
								<u-checkbox label="记住我" activeColor="#008474" name="remember" labelSize="28rpx">
								</u-checkbox>
							</u-checkbox-group>
						</u-form-item>
					</view>
					<u-button type="primary" @click="loginByAccount">登录</u-button>
					<!-- 	<view class="tips">
					使用手机号快速注册
				</view> -->
				</view>

				<!-- 手机号 -->
				<view v-if="loginMethod==='phone'" class="title">
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<u-form-item label=" " border="none">
						<u-input v-model="formData.phoneNumber" placeholder="请输入手机号">
							<template slot="prefix">
								<view class="phone-prefix" @click="handleTelClick">
									<text class="num">+{{telCode}}</text>
									<u-icon name="arrow-down"></u-icon>
									<text class="line">|</text>
								</view>
							</template>
						</u-input>
					</u-form-item>
					<!-- <u-toast ref="uToast"></u-toast> -->
					<view class="code-wrap">
						<!-- 					<u-code :seconds="15" @end="codeEnd" @start="codeStart" ref="uCode" @change="codeChange"></u-code>
					<u-button :loading="codeLoading" loadingText="获取验证码" @tap="getCode" type="primary"
						:disabled="codeDisabled">获取验证码</u-button> -->
						<u-button :loading="codeLoading" loadingText="获取验证码" @click="getCode"
							type="primary">获取验证码</u-button>
					</view>
				</view>
				<!-- 同意协议 -->
				<view class="protocol-wrap">
					<view style="margin-top: 9rpx;">
						<u-checkbox-group v-model="formData.isAgree" placement="row" @change="checkboxChange">
							<u-checkbox label=" " activeColor="#008474" :name="true" labelSize="28rpx">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<view class="protocol-txt">
						未注册的手机号，登录时将自动注册，且代表您已 同意<text class="hightlight">《某某注册协议》</text>和 <text
							class="hightlight">《某某隐私政策》</text>
					</view>
				</view>
			</u-form>
			<!-- 更多登录方式 -->
			<view class="more-methods">
				<u-divider text="更多登录方式" lineColor="#E5E6EB" textColor="#86909C" textSize="28rpx"></u-divider>
				<view class="flex-sb">
					<view class="btn-item-wrap flex-c">
						<view class="btn-item flex-sb">
							<!-- <u--image :src="require('@/static/image/icons/dingding.png')" width="80px" height="80px" @click="click"></u--image> -->
							<u-icon name="weixin-fill" color="#09BB07" size="48"></u-icon>
							微信登录
						</view>
					</view>
					<view class="btn-item-wrap flex-c">
						<view class="btn-item flex-sb">
							<u--image :src="require('@/static/image/icons/dingding.png')" width="48rpx"
								height="48rpx"></u--image>
							钉钉登录
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 微信手机号快捷登录 -->
		<!-- <u-button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信手机号快捷登录
		</u-button> -->
		<TelCodesPopup v-if="showTelCodesPopup" :show.sync="showTelCodesPopup" @getInfo="getTelCodesInfo">
		</TelCodesPopup>
		<!-- 输入验证码 -->
		<SetCodesPopup v-if="setCodesPopup" :show.sync="setCodesPopup" @login="loginByCode">
		</SetCodesPopup>
		<!-- 同意协议提示框 -->
		<u-modal :show="showAgreeModal" title="提示" @confirm="handleAgree" ref="uModal" width="600rpx"
			:showCancelButton="true" confirmText="同意" confirmColor="#008474" @cancel="showAgreeModal=false">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
				<view class="protocol-txt">
					请先同意<text class="hightlight">《某某注册协议》</text>和 <text class="hightlight">《某某隐私政策》</text>
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
				showAgreeModal: false,
				swiperList: [
					require('@/static/image/demo/swiper1.png'),
					require('@/static/image/demo/swiper2.png'),
					require('@/static/image/demo/swiper1.png'),
				],
				tabsList: [{
					name: '手机号',
					value: 'phone'
				}, {
					name: '密码登录',
					value: 'pwd'
				}],
				// 验证码
				codeTips: '',
				codeDisabled: false,
				codeLoading: false,
				showTelCodesPopup: false,
				setCodesPopup: false,
				telCode: "86",
				loginMethod: 'phone',
				currentTab: '0',
				pwdVisible: false,
				formRef: 'loginFormRef',
				formData: {
					username: 'admin',
					password: '123456',
					isRemember: '', //记住我
					phoneNumber: '',
					isAgree: [], //同意协议
					// wechatCode: '',
				},
				rules: {
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
					phoneNumber: {
						type: 'string',
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				}
			};
		},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs[this.formRef]?.setRules(this.rules);
			// this.$refs["sortPickerList"]?.initPage();
		},
		onLoad() {},
		methods: {
			// 同意
			handleAgree() {
				this.formData.isAgree[0] = true
				this.showAgreeModal = false
			},
			// codeChange(text) {
			// 	this.codeTips = text;
			// },
			// 手机号-获取验证码
			getCode() {
				if (!this.formData.phoneNumber) {
					// this.$refs[this.formRef]?.validateField('formData.phoneNumber');
					uni.$u.toast('手机号不能为空');
					return
				}
				if (!this.formData.isAgree[0]) {
					this.showAgreeModal = true
					return
				}
				// if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				// uni.showLoading({
				// 	title: '正在获取验证码'
				// })
				this.codeLoading = true
				setTimeout(() => {
					this.codeLoading = false
					// this.codeDisabled = true
					this.setCodesPopup = true
					// this.$refs.uCode.start();
					// uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					// uni.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
				}, 2000);
				// } else {
				// 	return
				// 	// uni.$u.toast('倒计时结束后再发送');
				// }
			},
			// // 倒计时结束
			// codeEnd() {
			// 	// uni.$u.toast('倒计时结束');
			// 	this.codeDisabled = false
			// },
			// // 倒计时开始
			// codeStart() {
			// 	// uni.$u.toast('倒计时开始');
			// },
			handleTelClick() {
				console.log('handleTelClick', );
				// uni.navigateTo({
				// 	url:'/pages/common/tel-codes'
				// })
				// uni.navigateTo({
				// 	url: `/pages/sub-packages/${path}`
				// })
				this.showTelCodesPopup = true
			},
			checkboxChange() {
				console.log('checkboxChange', );
			},
			tabClick(item) {
				this.loginMethod = item.value
				this.currentTab = item.index
				console.log('item', item);
			},
			getTelCodesInfo(info) {
				this.telCode = info.value
			},
			// 密码登录
			loginByAccount() {
				// 调接口
				this.$refs[this.formRef].validate().then(res => {
					if (!this.formData.isAgree[0]) {
						this.showAgreeModal = true
						return
					}
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
			// 手机授权登录
			getPhoneNumber(e) {
				if (e.detail.errMsg === 'getPhoneNumber:ok') {
					// console.log(e.detail, '手机授权')
					login({
						...this.formData,
						wechatCode: e.detail.code // 授权码
					}).then(res => {
						console.log('【 login-success 】-30', res);
						this.getCommonInfo()
					}).catch((err) => {
						uni.showToast({
							icon: 'none',
							title: err.message || '登录失败',
							duration: 2000
						})
					})
				}
				// console.log('getPhoneNumber', e)
			},
			// 验证码登录
			loginByCode() {
				this.getCommonInfo()
			},
			// 获取需要的公共信息
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
	// page {
	// 	font-family: PingFang SC-Regular, PingFang SC;
	// }

	::v-deep .u-form-item__body__left {
		width: 0rpx !important;
	}

	::v-deep .u-input__content__prefix-icon {
		width: 170rpx !important;
	}

	::v-deep .u-checkbox {
		min-width: 32rpx !important;
		height: 32rpx !important;
	}

	::v-deep .u-checkbox__icon-wrap {
		width: 32rpx !important;
		height: 32rpx !important;
	}

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

	.login-wrap {
		position: relative;

		.login-content {
			position: relative;
			z-index: 100;
			margin-top: -40rpx;
			box-sizing: border-box;
			width: 100%;
			padding: 70rpx 40rpx;
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

		.tabs-wrap {
			margin: 35rpx auto;
		}

		.code-wrap {
			margin: 48rpx auto;
		}

		.account-content {
			.form-wrap {
				margin-bottom: 30rpx;
				// height: 340rpx;
			}

			.tips {
				margin-top: 32rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: $colorTheme;
				line-height: 40rpx;
				text-align: center;
			}
		}

		.hightlight {
			color: $colorTheme;
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

		.more-methods {
			margin-top: 180rpx;

			.btn-item-wrap {
				width: 48%;
				height: 96rpx;
				border-radius: 12rpx;
				border: 2rpx solid #D9DCE1;

				.btn-item {
					width: 180rpx;
					line-height: 96rpx;
				}
			}
		}
	}
</style>