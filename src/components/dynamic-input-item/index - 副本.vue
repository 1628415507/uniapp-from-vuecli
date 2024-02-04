<template>
	<view class="dynamic-input-item">
		<!-- 输入框、数字输入框 -->
		<block v-if="type==INPUT_TYPE.INPUT||type==INPUT_TYPE.NUMBER">
			<u-input v-model="value" :customStyle="formInputCustomStyle" clearable
				:type="type==INPUT_TYPE.NUMBER?'number':'text'"></u-input>
		</block>
		<!-- 日期\时间 -->
		<block v-if="type==INPUT_TYPE.DATE||type==INPUT_TYPE.DATETIME">
			<u-input v-model="value" :customStyle="formInputCustomStyle" readonly clearable>
				<template slot="suffix">
					<u-icon @click="datePickerShow = true" name="calendar" color="#c6c6c6" size="36">
					</u-icon>
				</template>
			</u-input>
			<u-datetime-picker v-model="date" :show="datePickerShow" :mode="type==INPUT_TYPE.DATETIME?'datetime':'date'"
				@cancel="datePickerShow=false" @confirm="confirmDate" :confirmColor="themeColor"></u-datetime-picker>
		</block>
		<!-- 复选框 -->
		<block v-if="type==INPUT_TYPE.CHECKBOX">
			<u-checkbox-group v-model="value" placement="row" @change="checkboxChange" size="25">
				<u-checkbox :customStyle="{marginRight: '5px'}" v-for="(item, index) in checkboxList" :key="index"
					:label="item.name" :name="item.name" :labelSize="28" :activeColor="themeColor" iconSize="20rpx">
				</u-checkbox>
			</u-checkbox-group>
		</block>
		<!-- 单选框 -->
		<block v-if="type==INPUT_TYPE.RADIO">
			<u-radio-group v-model="value" placement="row" @change="groupChange" size="25">
				<u-radio :customStyle="{marginRight: '5px'}" v-for="(item, index) in radiolist" :key="index"
					:label="item.name" :name="item.name" @change="radioChange" :labelSize="28" :activeColor="themeColor"
					iconSize="20rpx">
				</u-radio>
			</u-radio-group>
		</block>
		<!-- 下拉框 -->
		<block v-if="type==INPUT_TYPE.SELECT">
			<u-input v-model="value" :customStyle="formInputCustomStyle" readonly clearable>
				<template slot="suffix">
					<u-icon @click="selectShow = true" name="arrow-down" color="#c6c6c6" size="36">
					</u-icon>
				</template>
			</u-input>
			<u-picker :show="selectShow" :columns="columns" @cancel="selectShow=false" @confirm="confirmSelect"
				:confirmColor="themeColor"></u-picker>
		</block>
		<!-- 联想控件 -->
		<block v-if="type==INPUT_TYPE.ASSOCIATE">
			<u-input v-model="label" :customStyle="formInputCustomStyle" readonly clearable>
				<template slot="suffix">
					<u-icon @click="showAssociatePopup = true" name="list" color="#c6c6c6" size="36">
					</u-icon>
				</template>
			</u-input>
			<associate-popup v-if="showAssociatePopup" :show.sync="showAssociatePopup" value-prop="addressCode"
				label-prop="addressCode" :fieldList="associateFieldList" :query-method="queryAssociateMethod"
				@getData="getAssociateData">
			</associate-popup>
		</block>
	</view>
</template>
<script>
	import AssociatePopup from "@/components/associate-popup/index.vue";
	const formInputCustomStyle = {
		boxSizing: 'border-box',
		width: '100%',
		background: '#fff',
		height: '64rpx',
		borderRadius: '8rpx',
		border: '2rpx solid #D9DCE1',
		fontSize: '28rpx',
		flex: 'unset !important'
	};
	const INPUT_TYPE = {
		INPUT: 'LubanInput', //输入框
		NUMBER: 'LubanNumberInput', //数字输入框
		ASSOCIATE: 'LubanAssociate', //联想控件
		SELECT: 'LubanSelect', //下拉
		DATETIME: 'LubanDateTimePicker', //时间
		DATE: 'LubanDatePicker', //日期
		RADIO: 'LubanRadio',
		CHECKBOX: 'LubanCheckbox',
	}
	export default {
		components: {
			AssociatePopup
		},
		props: {
			value: {
				type: [String, Array], //显示弹框
				default: ''
			},
			type: {
				type: String, //显示弹框
				default: 'LubanInput'
			},
		},
		data() {
			return {
				themeColor: '#008474',
				INPUT_TYPE,
				label: '', //显示值
				// 实际值
				// value: '', //[INPUT_TYPE.INPUT, INPUT_TYPE.DATE, INPUT_TYPE.CHECKBOX].includes(this.type) ? '' : [],
				formInputCustomStyle,
				// 日期
				date: Number(new Date()),
				datePickerShow: false,
				// 下拉
				selectShow: false,
				columns: [
					['中国', '美国', '日本']
				],
				// 联想控件
				showAssociatePopup: false,
				associateDefaultValue: '',
				associateFieldList: [{
						prop: 'addressCode',
						label: '编码',
						width: '45%',
					},
					{
						prop: 'addressName',
						label: '名称',
						width: '55%',
					},
				],
				// 复选框
				checkboxList: [{
						name: '苹果',
						disabled: false
					},
					{
						name: '香蕉',
						disabled: false
					},
					{
						name: '橙子',
						disabled: false
					}
				],
				// 单选框
				radiolist: [{
						name: '苹果',
						disabled: false
					},
					{
						name: '香蕉',
						disabled: false
					},
					{
						name: '橙子',
						disabled: false
					}, {
						name: '榴莲',
						disabled: false
					}
				],

			};
		},
		watch: {
			config: {
				deep: true,
				handler(newVal) {
					console.log('=config==', newVal)
				}
			},
			value: {
				deep: true,
				handler(newVal) {
					console.log('=value==', newVal)
				}
			}
		},
		computed: {},
		onReady() {
			if (this.type == INPUT_TYPE.DATE) {
				// 微信小程序需要用此写法
				this.$refs.datetimePicker.setFormatter(this.formatter)
			} // 微信小程序需要用此写法

		},
		methods: {
			// 联想控件-查询方法
			queryAssociateMethod(params) {
				const {
					keyword,
					pageSize,
					currentPage
				} = params
				// console.log(keyword, pageSize, currentPage);
				return new Promise((resolve, reject) => {
					const records = [{
						addressCode: '11',
						addressName: '名称1'
					}, {
						addressCode: '11',
						addressName: '名称2'
					}]
					resolve({
						records,
						total: records.length
					});
					// // 调取接口
					// this.$http('get', this.$apis.common_associateAddress, {
					// 	key: keyword,
					// 	pageSize,
					// 	currentPage
					// }).then(res => {
					// 	const records = res.data.records || []
					// 	const total = res.data.totalPage || 0
					// 	resolve({
					// 		records,
					// 		total
					// 	});
					// }).catch(err => {
					// 	reject(err);
					// });
				}).catch(err => {
					console.log(err);
				});
			},
			// 联想控件-获取值
			getAssociateData(item) {
				this.value = item.addressCode
				this.label = item.addressName
				console.log('getAssociateData', item)
			},
			checkboxChange() {

			},
			groupChange() {

			},
			radioChange() {},
			// 下拉
			confirmSelect(obj) {
				this.value = obj.value[0] || ''
				console.log('=confirmDate==', obj)
				this.selectShow = false
			},
			// 
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			confirmDate(obj) {
				this.value = obj.value
				console.log('=confirmDate==', obj)
				this.datePickerShow = false
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
		},
		onReady() {},
		mounted() {
			// this.initData()
			// console.log('=source==', this.source)
		}
	};
</script>

<style lang="scss" scoped>
	.dynamic-input-item {
		width: 100%;
		height: 65rpx;
		// background: red;
		display: flex;
		align-items: center;
		justify-content: center;


	}

	::v-deep .u-input {
		flex: unset;
	}
</style>