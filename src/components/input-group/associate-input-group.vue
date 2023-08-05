<template>
	<view class="input-group">
		<view v-for="(dataItem,index) in dataList" :key="dataItem.key" class="input-group-item">
			<view class="input-item">
				<label @click="handlePopupShow(index,0)">
					<u--input readonly v-model="dataItem.item[0]" placeholder="请选择" fontSize="28rpx" @blur="handleBlur">
					</u--input>
				</label>
				<!-- 扫描 -->
				<view class="icon-wrap">
					<view v-if="(!dataItem.item[0]) &&scannable" @click.stop="getScanVal(index,0)">
						<u-icon name="scan" color="#c6c6c6" size="19"></u-icon>
					</view>
					<view v-if="dataItem.item[0]" @tap.stop="handleClear(index,0)">
						<u-icon name="close-circle" color="#c6c6c6" size="16"></u-icon>
					</view>
				</view>
			</view>

			<view class="split">/</view>
			<view class="input-item">
				<label @click="handlePopupShow(index,1)">
					<u-input readonly v-model="dataItem.item[1]" placeholder="请选择" fontSize="28rpx" @blur="handleBlur">
					</u-input>
				</label>
				<!-- 扫描 -->
				<view class="icon-wrap">
					<view v-if="(!dataItem.item[1]) &&scannable" @click.stop="getScanVal(index,1)">
						<u-icon name="scan" color="#c6c6c6" size="19"></u-icon>
					</view>
					<view v-if="dataItem.item[1]" @tap.stop="handleClear(index,1)">
						<u-icon name="close-circle" color="#c6c6c6" size="16"></u-icon>
					</view>
				</view>
			</view>
			<!-- 操作 -->
			<view class="opt">
				<u-icon v-if="index===0" @click="handleAdd" name="plus-circle" color="#D40411" size="19">
				</u-icon>
				<u-icon v-else @click="handleDelete(index)" name="minus-circle" color="#D40411" size="19">
				</u-icon>
			</view>
		</view>
		<!-- 联想控件-gcon :defaultValue="addressDefaultValue"   -->
		<associate-popup v-if="showAssociatePopup" :show.sync="showAssociatePopup" value-prop="basGconId"
			label-prop="gconCode" :fieldList="fieldList" :query-method="queryMethod" @getData="getAssociateData">
		</associate-popup>
	</view>
</template>
<script>
	import AssociatePopup from "@/components/select-popup/index.vue";
	export default {
		components: {
			AssociatePopup,
		},
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
				// 联想控件-车牌号
				showAssociatePopup: false,
				truckNumberDefaultValue: '',
				fieldList: [{
						prop: 'gconCode',
						label: '编码',
						width: '50%',
					},
					{
						prop: 'secondPortCode',
						label: '名称',
						width: '50%',
					},
				],
				// 数据项
				dataList: [],
				index: 0,
				subIndex: 0,
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
			handleClear(index, subIndex) {
				this.$set(this.dataList[index].item, subIndex, '')
			},
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
			getScanVal(index, subIndex) {
				console.log('getScanVal', index, subIndex)
				// 调用uni扫一扫的方法，允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: (res) => {
						// console.log('scanCode', res)
						// TODO:取值
						if (res.errMsg == "scanCode:ok") {
							// 调用后端校验
							const val = res.result
							const isVaild = this.verifyGCon(val) // G-CON校验
							console.log('isVaild', isVaild);
							if (isVaild) {
								//  this.$set(原数组, 索引值, 需要赋的值)
								this.$set(this.dataList[index].item, subIndex, val)
								this.emitData()
							} else {
								uni.$u.toast('该G-CON校验不合法') // TODO提示语
							}
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}
					}
				});
			},
			// G-CON校验
			verifyGCon(gCon) {
				// 调取接口
				let isVaild = false
				this.$http('get', this.$apis.common_GConVerify, {
					gCon
				}).then(res => {
					isVaild = res.data
				})
				return isVaild
			},
			// 联想控件-弹窗
			handlePopupShow(index, subIndex) {
				this.index = index
				this.subIndex = subIndex
				this.showAssociatePopup = true
			},
			// 联想控件-查询方法
			queryMethod(params) {
				const {
					keyword,
					pageSize,
					currentPage
				} = params
				return new Promise((resolve, reject) => {
					// 调取接口
					this.$http('get', this.$apis.common_associateGCon, {
						key: keyword,
						pageSize,
						currentPage
					}).then(res => {
						const records = res.data.records || []
						const total = res.data.totalPage || 0
						// 返回数据（返回的名字必须叫records和total）
						resolve({
							records,
							total
						});
					}).catch(err => {
						// console.log(err);
						reject(err)
					});
				}).catch(err => {
					console.log(err);
				});
			},
			// 联想控件-获取值
			getAssociateData(item) {
				// console.log('getAssociateData', item, )
				this.$set(this.dataList[this.index].item, this.subIndex, item.gconCode)
				this.emitData()
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

			.input-item {
				position: relative;
				z-index: 100;

				.icon-wrap {
					z-index: 1000;
					position: absolute;
					top: 0rpx;
					right: 0rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 90rpx;
					width: 88rpx;
					// background-color: #bcf;
				}

			}

			.split {
				text-align: center;
			}

			&:last-child {
				margin-bottom: 0rpx;
			}
		}
	}
</style>
