<template>
	<!-- <u-popup :show="visible" mode="bottom" :closeOnClickOverlay="true" @close="handlePopupClose" duration="400" overlay
		zIndex="1000000"> -->
	<view class="select-popup">
		<view class="search-wrap">
			<u-search v-model="keyword" :showAction="false" placeholder="搜索" searchIconSize="30rpx" shape="square"
				:animation="false" height="60rpx" @custom="handleSearchCancel" @change="handleSearchChange">
			</u-search>

		</view>

		<view class="list-wrap">
			<u-index-list  :custom-nav-height="50" :index-list="indexList" @select="handleSelect">
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
			<!-- <SortPickerList ref="sortPickerList" @clickData="clickData"></SortPickerList> -->
		</view>
	</view>
	<!-- </u-popup> -->
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
				this.$emit('getData', item);
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

<style lang="scss">
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
		.top-wrap{
			display: flex;
			padding: 0 24rpx;
			position: relative;
			// .close{
			// 	position: absolute;
			// }
			.title{
				width: 100%;
				text-align: center;
				font-size: 34px;
				font-weight: 500;
				color: #1D2129;
			}
		}
		.search-wrap {
			padding: 0 24rpx;
		}

		.list-wrap {
			margin-top:30rpx;
		}
	}
</style>