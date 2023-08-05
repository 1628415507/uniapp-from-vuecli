<template>
	<view class="input-group">
		<view v-for="(dataItem,index) in dataList" :key="dataItem.key" class="input-group-item">
			<u-input v-model="dataItem.item[0]" placeholder="请输入" fontSize="28rpx" @blur="handleBlur">
				<!-- 扫描 -->
				<template slot="suffix">
					<u-icon v-if="scannable" name="scan" color="#c6c6c6" size="19" @click="getScanVal(index,0)">
					</u-icon>
				</template>
			</u-input>
			<view class="split">/</view>
			<u-input v-model="dataItem.item[1]" placeholder="请输入" fontSize="28rpx" @blur="handleBlur">
				<!-- 扫描 -->
				<template slot="suffix">
					<u-icon v-if="scannable" name="scan" color="#c6c6c6" size="19" @click="getScanVal(index,1)">
					</u-icon>
				</template>
			</u-input>
			<!-- 操作 -->
			<view class="opt">
				<u-icon v-if="index===0" @click="handleAdd" name="plus-circle" color="#D40411" size="19">
				</u-icon>
				<u-icon v-else @click="handleDelete(index)" name="minus-circle" color="#D40411" size="19">
				</u-icon>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: {},
		props: {
			source: {
				type: Array, //显示弹框
				default: () => ['', '']
			},
			scannable: {
				type: Boolean, //是否可扫描
				default: false
			},
		},
		data() {
			return {
				dataList: [],
			};
		},
		watch: {
			// source(val) {
			// 	this.initData()
			// 	console.log('=11-source==', val)
			// },
			// dataList: {
			// 	deep: true,
			// 	handler(newVal, oldVal) {
			// 		this.emitData()
			// 	}
			// },
		},
		computed: {},
		methods: {
			// 发送数据
			emitData() {
				const arr = this.dataList.map(dataItem => dataItem.item)
				const flatArr = arr.flat(Infinity) //数组扁平化
				// console.log('=Infinity-arr==', flatArr)
				this.$emit('update:source', flatArr);
				this.$emit('handleDataChange', flatArr);
			},
			// 初始格式化数据
			initData() {
				const source = [...this.source] //Json.parse(Json.strify(this.source))
				const arr = []
				if (source.length) {
					// 将数组分为两个两个一组
					for (let i = 0; i < source.length; i += 2) {
						arr.push({
							key: Math.random() + i, // 添加唯一值
							item: source.slice(i, i + 2) //两个两个一组
						})
					}
				} else {
					arr.push({
						key: Math.random(),
						item: ['', '']
					})
				}
				this.dataList = arr
				// console.log('=this.dataList==', this.dataList)
			},
			// 输入框-失去焦点时触发
			handleBlur() {
				// console.log('=失去焦点==', this.dataList)
				this.emitData()
			},
			// 输入框-新增数据
			handleAdd() {
				this.dataList.push({
					key: Math.random(),
					item: ['', '']
				})
				this.emitData()
				// console.log('=handleAdd==', this.dataList)
			},
			// 输入框-删除数据
			handleDelete(index) {
				this.dataList.splice(index, 1)
				this.emitData()
			},
			// 扫描
			getScanVal(index, subIndex, ) {
				console.log('getScanVal', index, subIndex)
				// 调用uni扫一扫的方法，允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: (res) => {
						// console.log('scanCode', res)
						// TODO:取值
						if (res.errMsg == "scanCode:ok") {
							const val = res.result
							//  this.$set(原数组, 索引值, 需要赋的值)
							this.$set(this.dataList[index].item, subIndex, val)
							// console.log('getScanVal==', this.dataList)
							this.emitData()
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}
					}
				});
			},
		},
		onReady() {},
		mounted() {
			this.initData()
			// console.log('=source==', this.source)
		}
	};
</script>

<style lang="scss" scoped>
	.input-group {
		&-item {
			margin-bottom: 20rpx;
			display: grid;
			grid-template-columns: 43% 5% 43% 5%;
			justify-content: space-between;
			align-items: center;

			.split {
				text-align: center;
			}

			&:last-child {
				margin-bottom: 0rpx;
			}
		}
	}
</style>
