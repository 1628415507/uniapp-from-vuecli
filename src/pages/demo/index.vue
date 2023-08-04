<!--
 * @Description: 示例
 * @Date: 2023-08-04 11:42:45
 * @LastEditTime: 2023-08-04 17:07:54
-->
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{ title }}</text>
		</view>
		<!-- uView组件测试 -->
		<u-button type="success" text="uView按钮"></u-button>
		<!-- vuex测试 -->
		<text class="title">Vuex：{{ userName }}</text>
		<!-- http测试 -->
		<u-button type="primary" @click="handleLogin">http测试</u-button>
		
		<!-- 底部菜单栏 -->
		<TabBar></TabBar>
	</view>
</template>
<script>
	import TabBar from '@/components/TabBar'
	import {
		login
	} from '@/apis/login.js'
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				title: 'Hello',
				userName: ''
			};
		},
		computed: {},
		onLoad() {
      // uni.hideTabBar()
		},
		created() {
			this.userName = this.$store.state.user.userName;
		},
		methods: {
			handleLogin() {
				login({
					name: 'admin',
					pwd: '123456'
				}).then(res => {
					console.log('【 login-success 】-30', res);
					// uni.redirectTo({
          //   url: activeTabInfo.url
          // });
				}).catch((err) => {
					console.log('【 login-fail 】-30', err);
				})
			}
		}
	};
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>