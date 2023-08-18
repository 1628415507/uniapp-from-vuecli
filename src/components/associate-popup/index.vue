<!--
 * @Description: 联想控件
 * @Date: 2023-08-18 14:38:42
 * @LastEditTime: 2023-08-18 14:40:13
-->
<template>
	<u-popup :show="visible" mode="bottom" :closeOnClickOverlay="true" @close="handlePopupClose" duration="400" overlay
		zIndex="1000000">
		<view class="select-popup">
			<u-search v-model="keyword" :showAction="true" actionText="取消" :animation="false" height="60rpx"
				@custom="handleSearchCancel" @change="handleSearchChange">
			</u-search>
			<!-- 头部 -->
			<view v-if="fieldList&&fieldList.length" class="list-head">
				<view v-for="(fieldItem) in fieldList" :key="fieldItem.prop"
					:style="{width:(fieldItem.width||'100%')}">
					{{fieldItem.label}}
				</view>
			</view>
			<!-- :pagingEnabled="true" -->
			<view class="list-wrap" :style="{height:(fieldList&&fieldList.length?'75vh':'82vh')}">
				<u-list @scrolltolower="scrollToLower" height="100%">
					<u-list-item v-for="(item, index) in dataList" :key="index">
						<!-- 需要列名 -->
						<!-- 行 -->
						<view v-if="fieldList&&fieldList.length" class="field-list"
							@click="handleItemChange(dataList[index])">
							<!-- 列 -->
							<view v-for="(fieldItem) in fieldList" :key="fieldItem.prop"
								class="field-item" :style="{width:(fieldItem.width||'100%')}">
								{{item[fieldItem.prop]||'-'}}
							</view>
						</view>
						<!-- 不需要列名 -->
						<template v-else>
							<!-- 原始数据 -->
							<u-cell v-if="item.type!=='newItem'" :title="item[labelProp]||'-'"
								:value="item[valueProp]===defaultValue?'√':''" :titleStyle="cellStyle"
								@click="handleItemChange(dataList[index])"></u-cell>
							<!-- 新增数据 -->
							<u-cell v-else :title="item[labelProp]" :value="item[valueProp]===defaultValue?'√':''"
								:titleStyle="newCellStyle" @click="handleItemChange(dataList[index])"></u-cell>
						</template>
					</u-list-item>
				</u-list>
			</view>
			<u-loadmore :status="status" :loading-text="loadText.loading" :loadmore-text="loadText.loadmore"
				:nomore-text="loadText.nomore" @loadmore="loadmore" />
		</view>
	</u-popup>
</template>
<script>
	export default {
		props: {
			show: {
				type: Boolean, //显示弹框
				default: false
			},
			queryMethod: {
				requird: true,
				type: Function, //
				default: () => {} //查询方法
				//参数如下(对象形式{})
				// keyword: 搜索关键字,
				// pageSize: 页面,
				// currentPage: 当前页
			},
			pageSize: {
				// requird: true,
				type: Number,
				default: 20 //分页，默认每页20条
			},
			defaultValue: {
				requird: false,
				type: String,
				default: '' // 初始化数据(默认选中的值)
			},
			valueProp: {
				requird: true,
				type: String,
				default: 'value' // 值对应的字段(用作key，尽量选唯一值),默认value
			},
			labelProp: {
				requird: true,
				type: String,
				default: 'label' // 显示的字段，默认label
			},
			fieldList: {
				requird: false,
				type: Array,
				default: () => {} // 显示的列
			},
			// createAble为true时，valueProp和labelProp传的值不能一样
			createAble: {
				requird: false,
				type: Boolean,
				default: false // 是否将查不到的值作为新增的数据项
			},
			pagingEnabled: {
				requird: false,
				type: Boolean,
				default: true // 是否分页
			}
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
			// 当前弹框-关闭
			handlePopupClose() {
				this.visible = false;
			},
			// 搜索框-输入框内容发生变化时触发,防抖??
			handleSearchChange(keyword) {
				this.keyword = keyword
				this.dataList = []
				this.currentPage = 1
				this.loadmore()
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
					this.loadmore()
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
			// 加载数据
			loadmore() {
				this.status = 'loading'
				this.queryMethod({
					keyword: this.keyword,
					pageSize: this.pageSize,
					currentPage: this.currentPage
				}).then(res => {
					const newData = res.records||[]
					this.total = res.total||0
					this.dataList = this.dataList.concat(newData)
					// 将查不到的值作为新增的数据项
					if (this.createAble && !this.dataList.length) {
						const newItem = {} // 创建新数据
						newItem[this.valueProp] = 'newId'
						newItem[this.labelProp] = this.keyword
						newItem.type = 'newItem' //标识是新数据
						this.dataList.push(newItem) // = this.dataList.concat([newItem])
					}
					// 加载状态处理
					this.handleLoadStatus()
				}).catch(err => {
					// this.handleLoadStatus()
					this.status = "nomore"
					this.loadText.nomore = "加载失败"
				})
			},
		},
		onReady() {
			// createAble为true时，valueProp和labelProp传的值不能一样
			if (this.createAble) {
				if (this.valueProp === this.labelProp) {
					console.log('createAble为true时，valueProp和labelProp传的值不能一样')
				}
			}

			console.log('fieldList===,', this.fieldList)
		},
		onLoad() {
			// this.loadmore()
		},
		onShow() {
			// this.loadmore()
		},
		mounted() {
			this.loadmore()
			this.visible = this.show;
		}
	};
</script>

<style lang="scss">
	.select-popup {
		padding: 33rpx 26rpx 40rpx 26rpx;
		height: 91vh;

		// background: #bfc;
		.list-head {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			height: 60rpx;
			font-size: 32rpx !important;
			font-weight: 500;
			background: rgb(247, 248, 251);
			padding: 0 15px;
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
