<template>
	<u-popup :show="visible" mode="bottom" :round="50" :closeOnClickOverlay="true" @close="handlePopupClose"
		duration="400" overlay zIndex="1000000">
		<view class="select-popup">
			<view class="top-wrap">
				<u-icon name="arrow-left" class="close" color="#1D2129" size="31" @click="handlePopupClose"></u-icon>
				<view class="title"> 输入验证码 </view>
			</view>
			<view class="search-wrap">
				<u-input v-model="code" placeholder=" ">
					<template slot="suffix">
						<u-code ref="uCode" @change="codeChange" @end="codeEnd" @start="codeStart" seconds="10"
							changeText="X秒重新发送" endText="重新发送"></u-code>
						<!-- <u-button @click="getCode" :text="tips" type="primary" :plain="true" size="mini"></u-button> -->
						<text @click="getCode" :class="disabled?'code-txt disabled-txt':'code-txt'">{{tips}}</text>
					</template>
				</u-input>
				<view style="margin:42rpx auto">
					<u-button @click="login" type="primary">登录/注册</u-button>
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	export default {
		components: {},
		props: {
			show: {
				type: Boolean, //显示弹框
				default: false
			}
		},
		data() {
			return {
				// 当前组件
				visible: false,
				tips: '',
				value: '',
				disabled: false,
				code: ''
			}
		},
		watch: {
			show() {
				this.visible = this.show;
			},
			visible() {
				this.$emit('update:show', this.visible);
			}
		},
		computed: {},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				this.$emit('getCode')
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						this.disabled = true
						// this.disabled=false
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			change(e) {
				console.log('change', e);
			},
			// 倒计时结束
			codeEnd() {
				// uni.$u.toast('倒计时结束');
				this.disabled = false
			},
			// 倒计时开始
			codeStart() {
				// uni.$u.toast('倒计时开始');
			},
			login() {
				if (!this.code) {
					uni.$u.toast('验证码不能为空');
					return
				}
				// 验证失败
				if (this.code === '0000') {
					uni.$u.toast('验证码错误');
					return
				}
				this.$emit('login')
			},
			// 当前弹框-关闭
			handlePopupClose() {
				this.visible = false;
			},
		},
		onReady() {

		},
		onLoad() {},
		onShow() {},
		mounted() {
			this.visible = this.show;
			this.disabled = true
			this.$refs.uCode.start();
		}
	};
</script>

<style lang="scss" scoped>
	::v-deep .u-button {
		border: none !important;
		border-color: #fff !important;
	}

	.select-popup {
		padding: 33rpx 0;
		height: 64vh;

		.top-wrap {
			display: flex;
			padding: 0 24rpx;
			position: relative;

			// .close {
			// 	margin-right: 30rpx;
			// }

			.title {
				margin-left: 20rpx;
				width: 100%;
				text-align: left;
				font-size: 53rpx;
				font-weight: 500;
				color: #1D2129;
				width: 260px;
			}
		}

		.search-wrap {
			margin-top: 32rpx;
			padding: 23rpx 32rpx;
			height: 200rpx;

			.code-txt {
				font-size: 30rpx;
				font-weight: 400;
				color: #008474;
			}

			.disabled-txt {
				color: #86909C;
			}

			// display: flex;
			// justify-content: space-between;
			// flex-direction: column;
			// .u-button {
			// 	border-color: #fff !important;
			// }

		}

	}
</style>