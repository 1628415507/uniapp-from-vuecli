<!--
 * @Description: 
 * @Date: 2023-08-04 09:26:48
 * @LastEditTime: 2023-08-05 15:15:55
-->
<template>
	<view>
		<text>用户名：{{userName}}</text>
		<view @click="goDetail"> 详情页跳转</view>
		<view class="footer-btn" >
			<u-button type="error" @click="logout">退出登录</u-button>
		</view>
		<!-- 弹框 -->
		<!-- <u-button @click="show = true">打开ActionSheet</u-button> -->
		<!-- <u-action-sheet :actions="list" :title="title" :show="show"></u-action-sheet> -->
		<!-- 底部菜单栏 -->
		<TabBar></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar'
	export default {
		components: {
			TabBar,
		},
		data() {
			return {
				userName:'',
			  title:'标题',
				list: [{
					name:'选项一',
					subname:"选项一描述",
					color:'#ffaa7f',
					fontSize:'20'
				},
				{
					name: '选项二禁用',
					disabled:true
				},
				{
					name: '开启load加载', //开启后文字不显示
					loading:true
				}],
				show: false
			}
		},
		created() {
			this.userName = this.$store.state.user.userName;
		},
		onLoad() {
		},
		methods: {
			goDetail(){
				uni.navigateTo({
					url: `/pages/sub-packages/detail`
				})
			},
			logout() {
				this.$store.dispatch('user/logout'); // 清除
				uni.redirectTo({
					url: `/pages/login/index`
				})
			},
		}
	}
</script>