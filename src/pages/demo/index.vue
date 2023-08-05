<!--
 * @Description: 示例
 * @Date: 2023-08-04 11:42:45
 * @LastEditTime: 2023-08-05 16:51:14
-->
<template>
	<view>
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- uView组件测试 -->
		<u-line dashed margin="20rpx 0"></u-line>
		<!-- vuex测试 -->
		<text class="title">Vuex：{{ userName }}</text>
		<!-- http测试 -->
		<u-line dashed margin="20rpx 0"></u-line>
		<u-button type="primary" @click="handleApi">http</u-button>
		<!-- 公共组件示例 -->
		<u-button type="success" @click="goDetail">Demo详情页</u-button>
		<!-- 字典 -->
		<u-line dashed margin="20rpx 0"></u-line>
		方法：
		<view style="width:100%">
		  YES_OR_NO_EM.YES/NO: {{YES_OR_NO_EM.YES}},{{YES_OR_NO_EM.NO}}
			<u-button @click="show = true">getDictOptions</u-button>
		</view>
		<u-picker :show="show" :columns="YES_OR_NO" keyName="name" @cancel="show=false"></u-picker>
		<!-- 底部菜单栏 -->
		<TabBar></TabBar>
	</view>
</template>
<script>
	import TabBar from '@/components/tab-bar'
	import {
		login
	} from '@/apis/login.js'
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				userName: '',
				show: false
			};
		},
		computed: {
			// 获取字典列表
			YES_OR_NO() {
				return [this.$dict.getDictOptions('YES_OR_NO')]
			},
			// 获取字典枚举
			YES_OR_NO_EM() {
				return this.$dict.getDictsEnum('YES_OR_NO', {
					type: 'number'
				})
			}
		},
		onLoad() {
			// uni.hideTabBar()
		},
		mounted() {
			console.log("获取字典列表", this.YES_OR_NO)
			console.log("获取字典枚举", this.YES_OR_NO_EM)
			console.log("获取字典名称", this.$dict.getDictNameByCode('YES_OR_NO', 'YES', 'nameEn'))
			this.userName = this.$store.state.user.userName;
		},
		methods: {
			goDetail(){
				uni.navigateTo({
					url: `/pages/sub-packages/demo-detail`
				})
			},
			handleApi() {
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
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}
</style>