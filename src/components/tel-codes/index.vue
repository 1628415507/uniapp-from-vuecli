<template>
	<u-popup :show="visible" mode="bottom" :closeOnClickOverlay="true" @close="handlePopupClose" duration="400" overlay
		zIndex="1000000">
		<view class="select-popup">
			<view class="top-wrap">
				<u-icon name="close" class="close" color="#1D2129" size="31" @click="handlePopupClose"></u-icon>
				<view class="title">
					选择国家和地区
				</view>
			</view>
			<view class="search-wrap">
				<u-search v-model="keyword" bgColor="#F5F6F7" :showAction="false" placeholder="搜索"
					searchIconSize="30rpx" shape="square" :animation="false" height="60rpx" @custom="handleSearchCancel"
					@change="handleSearchChange">
				</u-search>
			</view>
			<view class="list-wrap">
				<u-index-list v-if="false" :index-list="indexList" @select="handleSelect">
					<template v-for="(item, index) in itemArr">
						<!-- #ifdef APP-NVUE -->
						<u-index-anchor :text="indexList[index]"></u-index-anchor>
						<!-- #endif -->
						<u-index-item>
							<!-- #ifndef APP-NVUE -->
							<u-index-anchor :text="indexList[index]"></u-index-anchor>
							<!-- #endif -->
							<view class="list-cell" v-for="(cell, index) in item">
								{{cell}}
							</view>
						</u-index-item>
					</template>
				</u-index-list>
				<SortPickerList ref="sortPickerList" @clickItem="handleItemChange" :keyword="keyword"></SortPickerList>
			</view>
		</view>
	</u-popup>
</template>
<script>
	import SortPickerList from "@/components/International-sortPickerList/index.vue";
	export default {
		components: {
			SortPickerList,
		},
		props: {
			show: {
				type: Boolean, //显示弹框
				default: false
			},
			pageSize: {
				type: Number,
				default: 20 //分页，默认每页20条
			},
		},
		data() {
			const cellStyle = {
				fontSize: '32rpx !important',
				// height: '80rpx !important',
			}
			const newCellStyle = {
				fontSize: '32rpx !important',
				color: '#D40411',
			}
			return {
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U", "V", "W", "X", "Y", "Z",
				],
				itemArr: [
					['列表A1', '列表A2', '列表A3', '列表A1', '列表A2', '列表A3', '列表A1', '列表A2', '列表A3', '列表A1', '列表A2', '列表A3'],
					['列表B1', '列表B2', '列表B3'],
					['列表C1', '列表C2', '列表C3'],
					['列表D1', '列表D2', '列表D3'],
					['列表F1', '列表F2', '列表F3']
				],
				// 当前组件
				visible: false,
				// 搜索
				keyword: '',
				// 分页
				currentPage: 1, //当前页数
				total: 0,
				// 列表
				cellStyle,
				newCellStyle,
				dataList: [],
				// 列表加载提示
				status: 'loadmore',
				loadText: {
					loadmore: "上拉或点击加载更多",
					loading: "努力加载中",
					nomore: "没有更多了"
				},
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
			handleSelect(val) {
				console.log('===handleSelect');
			},
			clickData() {
				console.log('===clickData');
			},
			// 当前弹框-关闭
			handlePopupClose() {
				this.visible = false;
			},
			// 搜索框-输入框内容发生变化时触发,防抖??
			handleSearchChange(keyword) {
				this.keyword = keyword
				this.dataList = []
				this.currentPage = 1
				// this.loadmore()
			},
			// 搜索框-取消按钮
			handleSearchCancel() {
				this.handlePopupClose()
			},
			// 列表-点击列表项触发
			handleItemChange(item) {
				this.$emit('getInfo', item);
				this.handlePopupClose()
			},
			// 列表-触底
			scrollToLower() {
				if (this.currentPage < this.total) {
					this.currentPage++
					// this.loadmore()
				}
				// this.loadmore()
			},
			// 加载状态提示
			handleLoadStatus() {
				// 不分页 、总页数都加载完毕
				if (!this.pagingEnabled || this.currentPage === this.total) {
					this.status = "nomore" // 没有更多了
				}
				if (this.currentPage < this.total) {
					this.status = "loadmore" // 加载更多
				}
				// 总数据等于0
				if (this.dataList.length === 0) {
					this.loadText.nomore = "暂无数据"
					this.status = "nomore"
				}
			},
		},
		onReady() {
			// createAble为true时，valueProp和labelProp传的值不能一样
			if (this.createAble) {
				if (this.valueProp === this.labelProp) {
					console.log('createAble为true时，valueProp和labelProp传的值不能一样')
				}
			}
			this.$nextTick(() => {
				this.$refs["sortPickerList"]?.initPage();
			})
			console.log('fieldList===,', this.fieldList)
		},
		onLoad() {},
		onShow() {},
		mounted() {
			this.visible = this.show;
		}
	};
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.select-popup {
		padding: 33rpx 0;
		height: 91vh;

		.top-wrap {
			display: flex;
			padding: 0 24rpx;
			position: relative;

			// .close{
			// 	position: absolute;
			// }
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

			.field-list {
				display: flex;
				align-items: center;
				// height: 60rpx;
				// line-height: 60rpx;
				font-size: 30rpx !important;
				border-bottom: 1rpx solid #e5e6e7;
				box-sizing: border-box;
				padding: 10px 15px;
				color: #303133;
			}
		}
	}
</style>