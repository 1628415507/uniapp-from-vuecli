<template>
	<view class="storage-detail">
		<!-- 状态栏 -->
		<view class="subsection-wrap" :class="GRADIENT_CLASS[subsectionValue]">
			<u-subsection :current="current" :list="subsectionList" mode="button" @change="sectionChange"
				activeColor="#fff" fontSize="28rpx"></u-subsection>
		</view>
		<!-- 计划信息 -->
		<PlanInfo v-if="subsectionValue === 'PLAN_INFO'"></PlanInfo>
		<!-- 收货信息 -->
		<PlanTask v-if="subsectionValue === 'PLAN_TASK'"></PlanTask>
	</view>
</template>

<script>
	import PlanInfo from './component/plan-info.vue'
	import PlanTask from './component/plan-task.vue'
	export default {
		components: {
			PlanInfo,
			PlanTask
		},
		data() {
			return {
				// 渐变样式类名
				GRADIENT_CLASS: {
					PLAN_INFO: 'gradient--right',
					PLAN_TASK: 'gradient--left'
				},
				// 状态栏
				current: 1,
				subsectionValue: 'PLAN_TASK',
				subsectionList: [{
					name: '计划信息',
					value: 'PLAN_INFO',
				}, {
					name: '收货信息',
					value: 'PLAN_TASK',
				}],
			}
		},
		onLoad() {
			uni.hideTabBar() //隐藏原生的导航栏
		},
		methods: {
			// 完成状态切换
			sectionChange(index) {
				this.current = index;
				this.subsectionValue = this.subsectionList[index].value
				// this.goTop() //回到顶部
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #E7F3F4 0%, rgba(231, 243, 244, 0) 50%, #fefefe, #fdfdfd, #fff) !important;
	}

	.storage-detail {
		padding: 0 32rpx;

		// 向右渐变
		.gradient--right {
			background: linear-gradient(to right, rgba(0, 132, 116, 1), rgba(0, 132, 116, 0.1)) !important;
		}

		// 向左渐变
		.gradient--left {
			background: linear-gradient(to left, rgba(0, 132, 116, 1), rgba(0, 132, 116, 0.1)) !important;
		}
	}

	// 分段器-默认样式修改
	::v-deep .storage-detail .subsection-wrap {
		margin: 20rpx auto 32rpx auto;
		// height: 70rpx;
		box-sizing: border-box;
		// background: linear-gradient(90deg, rgba(0, 132, 116, 1), rgba(255, 255, 255, 0.3));
		border-radius: 72rpx;
		padding: 2rpx;

		.u-subsection {
			background-color: rgba(255, 255, 255, 0.8) !important;
			border-radius: 72rpx !important;

			.u-subsection__item {
				border-radius: 72rpx !important;
			}

			.u-subsection__item__text {
				font-weight: normal !important;
			}

			.u-subsection--button__bar {
				background-color: #008474 !important;
				border-radius: 72px !important;
			}
		}
	}
</style>