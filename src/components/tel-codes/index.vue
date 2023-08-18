<!--
 * @Description: 选择国家和地区
 * @Date: 2023-08-10 16:01:41
 * @LastEditTime: 2023-08-14 13:41:32
-->
<template>
	<u-popup :show="visible" mode="bottom" :closeOnClickOverlay="true" @close="closePopup" duration="400" overlay
		zIndex="1000000" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.8)'}">
		<view class="select-popup">
			<view class="title-wrap">
				<u-icon name="close" class="close" color="#1D2129" size="31" @click="closePopup"></u-icon>
				<view class="title">
					选择国家和地区
				</view>
			</view>
			<!-- 搜索框 -->
			<view class="search-wrap">
				<u-search v-model="keyword" bgColor="#F5F6F7" :showAction="false" placeholder="搜索"
					searchIconSize="30rpx" shape="square" :animation="false" height="60rpx"
					@change="handleSearchChange">
				</u-search>
			</view>
			<!-- 列表 -->
			<view class="list-wrap">
				<SortPickerList ref="sortPickerListRef" @clickItem="handleItemChange" :keyword="keyword">
				</SortPickerList>
			</view>
		</view>
	</u-popup>
</template>
<script>
	import SortPickerList from "./International-sortPickerList/index.vue";
	export default {
		components: {
			SortPickerList,
		},
		props: {
			show: {
				type: Boolean, //显示弹框
				default: false
			}
		},
		data() {
			return {
				// 公共
				visible: false,
				// 搜索
				keyword: '',
			};
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
			// 弹框-关闭
			closePopup() {
				this.visible = false;
			},
			// 搜索框-输入框内容发生变化时触发,防抖??
			handleSearchChange(val) {
				this.keyword = val
			},
			// 列表-点击列表项触发
			handleItemChange(item) {
				this.$emit('getInfo', item);
				this.closePopup()
			}
		},
		onReady() {
			// this.$nextTick(() => {
			// 	this.$refs["sortPickerListRef"]?.initPage();
			// 	console.log('this.$refs["sortPickerListRef"]===,', this.$refs["sortPickerListRef"])
			// })
		},
		onLoad() {},
		onShow() {},
		mounted() {
			this.visible = this.show;
		}
	};
</script>

<style lang="scss" scoped>
	.select-popup {
		padding: 33rpx 0;
		height: 91vh;

		.title-wrap {
			display: flex;
			padding: 0 24rpx;
			position: relative;

			.title {
				width: 100%;
				text-align: center;
				font-size: 34rpx;
				font-weight: 500;
				color: #1D2129;
			}
		}

		.search-wrap {
			padding: 23rpx 32rpx;
		}

		.list-wrap {
			height: 82vh;
		}
	}
</style>