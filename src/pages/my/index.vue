<!--
 * @Description: 
 * @Date: 2023-08-04 09:26:48
 * @LastEditTime: 2023-08-04 16:46:12
-->
<template>
	<view>
		<u-action-sheet :actions="list" :title="title" :show="show"></u-action-sheet>
		<u-button @click="show = true">打开ActionSheet</u-button>
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
		onLoad() {
			// uni.hideTabBar()
		},
	}
</script>