<template>
	<view class="main-mask">
		<view class="main-plate-type">
			<u-radio-group v-model="type" @change="changeType" activeColor="#008474" :size="28" placement="row"
				:iconSize="20">
				<u-radio label="普通车牌" :name="1" labelSize="28rpx">
				</u-radio>
				<u-radio label="新能源车牌" :name="2" labelSize="28rpx">
				</u-radio>
			</u-radio-group>
		</view>
		<view class="main-plate-body">
			<view class="main-plate-word" :class="{ active: currenttIndex == 0 }" @tap="inputSwitch" data-index="0">
				<text>{{ currentInputValue[0] }}</text>
			</view>
			<view class="main-plate-word" :class="{ active: currenttIndex == 1 }" @tap="inputSwitch" data-index="1">
				<text>{{ currentInputValue[1] }}</text>
			</view>
			<view class="main-plate-divide"></view>
			<view class="main-plate-word" :class="{ active: currenttIndex == 2 }" @tap="inputSwitch" data-index="2">
				<text>{{ currentInputValue[2] }}</text>
			</view>
			<view class="main-plate-word" :class="{ active: currenttIndex == 3 }" @tap="inputSwitch" data-index="3">
				<text>{{ currentInputValue[3] }}</text>
			</view>
			<view class="main-plate-word" :class="{ active: currenttIndex == 4 }" @tap="inputSwitch" data-index="4">
				<text>{{ currentInputValue[4] }}</text>
			</view>
			<view class="main-plate-word" :class="{ active: currenttIndex == 5 }" @tap="inputSwitch" data-index="5">
				<text>{{ currentInputValue[5] }}</text>
			</view>
			<view class="main-plate-word" :class="{ active: currenttIndex == 6 }" @tap="inputSwitch" data-index="6">
				<text>{{ currentInputValue[6] }}</text>
			</view>
			<view class="main-plate-word" :class="{ active: currenttIndex == 7 }" @tap="inputSwitch" v-if="type == 2"
				data-index="7">
				<text>{{ currentInputValue[7] }}</text>
			</view>
		</view>
		<u-popup :show="show" @close="close" @open="open" :overlay="false">
			<view class="plate-keyboard-popup">
				<view class="content-top">
					<text>车牌号</text>
					<view @click="show = false">
						<u-icon name="close" color="#86909C" size="26"></u-icon>
					</view>
					<!-- 	<view>
						<button class="main-plate-btn main-plate-btn--cancel" @tap="$emit('close')">取消</button>
					</view>
					<view>
						<button class="main-plate-btn main-plate-btn--delete" @tap="deleteKey">删除</button>
						<button class="main-plate-btn main-plate-btn--submit" @tap="exportPlate">选择</button>
					</view> -->
				</view>
				<view class="main-plate-foot">
					<view class="main-plate-keyboard" :style="{height:keyboardHeight}">
						<view id="keyboard" class="key-wrap">
							<!-- 省简称 -->
							<block v-if="inputType == 1">
								<view v-for="el of provincesText" :key="el" hover-class="hover" class="main-plate-key"
									:data-value="el" @tap="chooseKey">{{ el }}</view>
							</block>
							<!-- 字母 -->
							<block v-if="inputType >= 2">
								<view v-for="el of wordText" :key="el" hover-class="hover" class="main-plate-key"
									:data-value="el" @tap="chooseKey">{{ el }}</view>
							</block>
							<!-- 占位 -->
							<block v-if="inputType >= 2">
								<text class="main-plate-key fill-block"></text>
							</block>
							<!-- 数字 -->
							<block v-if="inputType >= 3">
								<view hover-class="hover" class="main-plate-key" v-for="el of numberText" :key="el"
									:data-value="el" @tap="chooseKey">{{ el }}</view>
							</block>
							<!-- 特殊字符 -->
							<block v-if="inputType == 4">
								<view v-for="el of lastWordText" :key="el" hover-class="hover" class="main-plate-key"
									:data-value="el" @tap="chooseKey">{{ el }}</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	export default {
		name: 'uni-plate-input',
		data() {
			return {
				type: 1, //车牌类型
				currenttIndex: 0, //当前编辑的输入框
				currentInputValue: ['', '', '', '', '', '', ''],
				keyboardHeightInit: false,
				keyboardHeight: 'auto',
				provincesText: [
					'京', '冀', '沪', '津', '晋', '蒙', '辽', '吉',
					'黑', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
					'鄂', '湘', '桂', '琼', '渝', '川', '贵', '云',
					'粤', '藏', '陕', '甘', '青', '宁', '新'
				],
				numberText: ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
				wordText: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
					'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				lastWordText: ['港', '澳', '军', '警', '学', '领'],
				show: false
			};
		},
		props: {
			plate: {
				type: String
			}
		},
		computed: {
			inputType() {
				switch (this.currenttIndex) {
					case 0:
						return 1;
						break;
					case 1:
						return 2;
						break;
					case 2:
						return 3;
						break;
					case 3:
						return 3;
						break;
					case 4:
						return 3;
						break;
					case 5:
						return 3;
						break;
					case 6:
						return this.type == 2 ? 3 : 4;
						break;
					case 7:
						return 4;
						break;
					default:
						return 1;
						break;
				}
			}
		},
		watch: {
			currenttIndex: function(n, o) {
				if (!this.keyboardHeightInit) return
				this.$nextTick(() => {
					this.changeKeyboardHeight()
				})
			},
			currentInputValue(val) {
				// console.log('currentInputValue', val);
				this.exportPlate()
			}
		},
		methods: {
			open() {
				console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			inputSwitch(e) {
				this.show = true
				const {
					index
				} = e.currentTarget.dataset;
				this.currenttIndex = parseInt(index);
			},
			changeType(value) {
				console.log('changeType', value)
				this.type = parseInt(value)
				this.currenttIndex = 0
				if (value == 1) {
					this.currentInputValue = ['', '', '', '', '', '', '']
				} else {
					this.currentInputValue = ['', '', '', '', '', '', '', '']
				}
			},
			chooseKey(e) {
				const {
					value
				} = e.currentTarget.dataset;
				this.$set(this.currentInputValue, this.currenttIndex, value);
				if (this.type == 1 && this.currenttIndex < 6) {
					this.currenttIndex++
				}
				if (this.type == 2 && this.currenttIndex < 7) {
					this.currenttIndex++
				}
			},
			deleteKey() {
				this.$set(this.currentInputValue, this.currenttIndex, '')
				if (this.currenttIndex != 0) this.currenttIndex--
			},
			exportPlate() {
				const plate = this.currentInputValue.join('')
				let err = false
				if (this.type === 1 && plate.length != 7) {
					err = true
				} else if (this.type === 2 && plate.length != 8) {
					err = true
				}
				// if (err) return uni.showToast({
				// 	title: '请输入完整的车牌号码!',
				// 	icon: 'none'
				// })
				this.$emit('export', plate)
			},
			changeKeyboardHeight() {
				const that = this
				const query = uni.createSelectorQuery().in(this);
				query.select('#keyboard').boundingClientRect();
				query.exec(function(res) {
					if (res && res[0]) {
						that.keyboardHeight = res[0].height + uni.upx2px(30) + 'px'
						that.keyboardHeightInit = true
					}
				});
			}
		},
		mounted() {
			const plateKey = this.plate.split('')
			if (plateKey.length === 7) {
				this.type = 1
			} else if (plateKey.length === 8) {
				this.type = 2
			}
			if (plateKey.length === 7 || plateKey.length === 8) {
				this.currentInputValue = plateKey
				this.currenttIndex = plateKey.length - 1
			}
			setTimeout(() => { //在动画结束之后才开始获取
				this.$nextTick(() => {
					this.changeKeyboardHeight()
				})
			}, 600);
		}
	};
</script>
<style scoped lang="scss">
	@import './uni-plate-input';

	.plate-keyboard-popup {
		box-sizing: border-box;
		width: 100%;
		min-height: 450rpx;
		background: #F7F8FA;
		padding: 32rpx;
		border-radius: 26rpx 26rpx 0 0;

		.content-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #1D2129;
			font-size: 32rpx;
			font-weight: 500;
		}
	}
</style>