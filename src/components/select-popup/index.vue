<!--
 * @Description: 选择控件-多选、单选
 * @Date: 2023-08-05 11:40:54
 * @LastEditTime: 2023-08-24 13:42:49
-->
<template>
	<u-popup :show="visible" mode="bottom" :round="25" :closeOnClickOverlay="false" @close="handlePopupClose"
		overlay="true" zIndex="1000000">
		<view class="select-popup">
			<view class="content-top">
				<view class="close" @click="handlePopupClose">取消</view>
				<view v-if="title" class="title">{{title}}</view>
				<view class="confirm" @click="confirm">确定</view>
			</view>
			<view class="list-wrap" :style="{height:'40vh'}">
				<u-list @scrolltolower="scrollToLower" height="100%">
					<u-list-item v-for="(item, index) in dataList" :key="index">
						<view class="list-item" @click="clickItem(item,index)">
							<view class="label" :class="item.disabled?'disabled':''">
								{{item[labelProp]||'-'}}
							</view>
							<view v-if="checkArr.includes(item[valueProp])" class="">
								<u-icon name="checkmark" color="#036564" size="40"></u-icon>
							</view>
						</view>
					</u-list-item>
				</u-list>
			</view>
		</view>
	</u-popup>
</template>
<script>
	// 测试数据
	const tempData = [{
			label: '选项一',
			value: 1
		},
		{
			label: '选项二',
			value: 2
		},
		{
			label: '选项三',
			value: 3
		}, {
			label: '禁用选项',
			value: 4,
			disabled: true,
		},
		{
			label: '选项五',
			value: 5
		}, {
			label: '选项六',
			value: 6
		}, {
			label: '选项七',
			value: 7
		},
		{
			label: '选项五',
			value: 8
		}, {
			label: '选项六',
			value: 9
		}
	]
	export default {
		props: {
			show: {
				type: Boolean, //显示弹框
				default: false
			},
			list: {
				required: true,
				type: Array,
				default: () => []
			},
			title: {
				type: String,
				default: '标题' // 初始化数据(默认选中的值)
			},
			defaultValue: {
				required: false,
				type: [String, Array, Number],
				default: '' // 初始化数据(默认选中的值)
			},
			valueProp: {
				required: true,
				type: String,
				default: 'value' // 值对应的字段(用作key，尽量选唯一值),默认value
			},
			labelProp: {
				required: true,
				type: String,
				default: 'label' // 显示的字段，默认label
			},
			multiple: {
				type: Boolean, //是否多选
				default: false //默认单选
			},
		},
		data() {
			return {
				// 公共
				visible: false,
				// 
				dataList: [], // 列表
				checkArr: [] //选中的值
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
			initList() {
				this.dataList = this.list //tempData
			},
			// 当前弹框-关闭
			handlePopupClose() {
				this.visible = false;
			},
			// 列表-点击列表项触发
			clickItem(item) {
				if (item.disabled) {
					return false
				}
				// 单选
				if (!this.multiple) {
					this.checkArr = [item[this.valueProp]]
				} else {
					const val = item[this.valueProp]
					const index = this.checkArr.indexOf(val);
					if (index !== -1) {
						this.checkArr.splice(index, 1);
					} else {
						this.checkArr.push(item[this.valueProp])
					}
				}
				console.log('checkArr', this.checkArr)
			},
			// 列表-触底
			scrollToLower() {},
			confirm() {
				this.$emit('confirm', this.multiple ? this.checkArr : this.checkArr[0])
				const checkItems = this.dataList.filter(item => {
					return this.checkArr.includes(item[this.valueProp])
				})
				this.$emit('getInfo', checkItems) //TODO:只适合dataList是同步数据的场景
				this.handlePopupClose()
			}
		},
		onReady() {},
		onLoad() {},
		mounted() {
			this.initList()
			this.visible = this.show;
			// 初始化默认值
			if (this.defaultValue) {
				if (this.multiple) {
					if (!Array.isArray(this.defaultValue)) {
						console.error('select-popup为多选，defaultValue须为Array类型')
					}
				} else {
					if (!['string', 'number'].includes(typeof this.defaultValue)) {
						console.error('select-popup为单选，defaultValue须为string或number类型')
					}
				}
				this.checkArr = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue]
				console.log('this.checkArr===,', this.checkArr)
			}

		}
	};
</script>

<style lang="scss">
	.select-popup {
		padding: 24rpx 32rpx;
		max-height: 50vh;
		color: #1D2129;

		.content-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			font-weight: 400;

			.close {
				color: #4E5969;
			}

			.confirm {
				color: #008474;
			}
		}

		.list-wrap {
			margin-top: 24rpx;

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 70rpx;

				.disabled {
					color: #A9AEB8;
				}
			}
		}
	}
</style>