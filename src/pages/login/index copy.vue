<template>
	<!-- 账号登录 -->
	<view class="account-login">
		<!-- 账号登录 -->
		<view class="account-content">
			<view class="form-wrap">
				<u-form :ref="formRef" :model="formData" :rules="rules" labelPosition="left" labelWidth="0">
					<u-form-item label=" " prop="username">
						<u-input v-model="formData.username" prefixIcon="account-fill"
							placeholder-class="placeholder-tips" placeholder="请输入账号">
						</u-input>
					</u-form-item>
					<u-form-item label=" " prop="password" border="none">
						<u-input v-model="formData.password" prefixIcon="lock-fill" password
							placeholder-class="placeholder-tips" placeholder="请输入密码">
						</u-input>
					</u-form-item>
				</u-form>
			</view>
			<u-button type="primary" @click="loginByAccount">登录</u-button>
		</view>
		<!-- 微信手机号快捷登录 -->
		<!-- <u-button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信手机号快捷登录
		</u-button> -->
	</view>
</template>

<script>
	import {
		login
	} from '@/apis/login.js'
	export default {
		data() {
			return {
				formRef: 'loginFormRef',
				formData: {
					username: 'admin',
					password: '123456',
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
					}
				}
			};
		},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			// this.$refs[this.formRef]?.setRules(this.rules);
		},
		onLoad() {},
		methods: {
			// 账号密码登录
			loginByAccount() {
				this.getCommonInfo()
				// 调接口
				// this.$refs[this.formRef].validate().then(res => {
				//   login(this.formData).then(res => {
				//     console.log('【 login-success 】-30', res);
				//     this.getCommonInfo()
				//   }).catch((err) => {
				//       uni.showToast({
				//         icon: 'none',
				//         title: err.message || '登录失败',
				//         duration: 2000
				//       })
				//   })
				// });
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
			// 获取需要的公共信息
			getCommonInfo() {
      	this.$store.dispatch('user/setActiveTab', 'home'); //设置激活的tab，默认首页
				this.$store.dispatch('user/setUserInfo',this.formData ); //设置激活的tab，默认首页
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
	.account-login {
		margin: 130rpx 28rpx;

		.account-content {
			background: rgba(255, 255, 255, 0.6);
			border-radius: 10rpx;
			padding: 45rpx 50rpx;

			.form-wrap {
				margin-top: 30rpx;
				height: 340rpx;
			}
		}
	}
</style>