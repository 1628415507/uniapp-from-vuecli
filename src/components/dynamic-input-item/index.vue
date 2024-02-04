<template>
	<view class="dynamic-input-item">
		<!-- 输入框、数字输入框 -->
		<block v-if="type == INPUT_TYPE.INPUT || type == INPUT_TYPE.NUMBER">
			<u-input v-model="curValue" :customStyle="formInputCustomStyle" clearable
				:type="type == INPUT_TYPE.NUMBER ? 'number' : 'text'"></u-input>
		</block>
		<!-- 日期、时间 -->
		<block v-if="type == INPUT_TYPE.DATE || type == INPUT_TYPE.DATETIME">
			<u-input v-model="curValue" :customStyle="formInputCustomStyle" readonly clearable>
				<template slot="suffix">
					<u-icon @click="showDatePicker = true" name="calendar" color="#c6c6c6" size="36"> </u-icon>
				</template>
			</u-input>
			<u-datetime-picker v-model="date" :show="showDatePicker" ref="datetimePicker"
				:mode="type == INPUT_TYPE.DATETIME ? 'datetime' : 'date'" @cancel="showDatePicker = false"
				@confirm="confirmDate" :confirmColor="themeColor"></u-datetime-picker>
		</block>
		<!-- 复选框 -->
		<block v-if="type == INPUT_TYPE.CHECKBOX">
			<u-checkbox-group v-model="curValue" placement="row" @change="checkboxChange" size="25">
				<u-checkbox :customStyle="{ marginRight: '5px' }" v-for="(item, index) in checkboxList" :key="index"
					:label="item[labelProp]" :name="item[valueProp]" :labelSize="28" :activeColor="themeColor"
					iconSize="20rpx">
				</u-checkbox>
			</u-checkbox-group>
		</block>
		<!-- 单选框 -->
		<block v-if="type == INPUT_TYPE.RADIO">
			<u-radio-group v-model="curValue" placement="row" size="25">
				<u-radio :customStyle="{ marginRight: '5px' }" v-for="(item, index) in radiolist" :key="index"
					:label="item[labelProp]" :name="item[valueProp]" :labelSize="28" :activeColor="themeColor"
					iconSize="20rpx">
				</u-radio>
			</u-radio-group>
		</block>
		<!-- 下拉框 -->
		<block v-if="type == INPUT_TYPE.SELECT">
			<u-input v-model="label" :customStyle="formInputCustomStyle" readonly clearable>
				<template slot="suffix">
					<u-icon @click="showSelect = true" name="arrow-down" color="#c6c6c6" size="36"> </u-icon>
				</template>
			</u-input>
			<u-picker :show="showSelect" :columns="columns" @cancel="showSelect = false" @confirm="confirmSelect"
				:confirmColor="themeColor" :keyName="labelProp"></u-picker>
		</block>
		<!-- 联想控件 -->
		<block v-if="type == INPUT_TYPE.ASSOCIATE">
			<u-input v-model="label" :customStyle="formInputCustomStyle" readonly clearable>
				<template slot="suffix">
					<u-icon @click="showAssociatePopup = true" name="list" color="#c6c6c6" size="36"> </u-icon>
				</template>
			</u-input>
			<associate-popup v-if="showAssociatePopup" :show.sync="showAssociatePopup" :value-prop="valueProp"
				:label-prop="labelProp" :fieldList="associateFieldList" :query-method="queryAssociateMethod"
				@getData="getAssociateData">
			</associate-popup>
		</block>
	</view>
</template>
<script>
	import AssociatePopup from '@/components/associate-popup/index.vue';
	import {
		formatterTime
	} from '@/utils/methods.js';
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
		CHECKBOX: 'LubanCheckbox'
	};
	export default {
		components: {
			AssociatePopup
		},
		props: {
			value: {
				type: [String, Array], //绑定值
				default: () => ''
			},
			type: {
				type: String, // 控件类型
				default: 'LubanInput'
			},
			displaLabel: {
				type: String, // 联想控件的初始值
				default: '联想控件的初始值'
			},
			labelProp: {
				type: String, // 名称对应的表字段
				default: 'label' //有数据源时需要
			},
			valueProp: {
				type: String, // 值对应的表字段
				default: 'value' //有数据源时需要
			},
		},
		data() {
			return {
				themeColor: '#008474',
				formInputCustomStyle,
				INPUT_TYPE,
				label: '', //显示值
				curValue: [INPUT_TYPE.CHECKBOX].includes(this.type) ? [] : '', // 实际值
				// 日期
				date: Number(new Date()),
				showDatePicker: false,
				// 下拉
				showSelect: false,
				columns: [
					[{
						label: '雪月夜',
						value: 2021
						// ...	 // 其他属性值
					}, {
						label: '冷夜雨',
						value: 804
					}]
				],
				// 联想控件
				showAssociatePopup: false,
				associateDefaultValue: '',
				associateFieldList: [{
						prop: 'value',
						label: '编码',
						width: '45%'
					},
					{
						prop: 'label',
						label: '名称',
						width: '55%'
					}
				],
				// 复选框
				checkboxList: [{
						label: '苹果',
						value: '1',
						disabled: false
					},
					{
						label: '香蕉',
						value: '2',
						disabled: false
					},
					{
						label: '橙子',
						value: '3',
						disabled: false
					}
				],
				// 单选框
				radiolist: [{
						label: '苹果',
						value: '1',
						disabled: false
					},
					{
						label: '香蕉',
						value: '2',
						disabled: false
					},
					{
						label: '橙子',
						value: '3',
						disabled: false
					}, {
						label: '榴莲',
						value: '4',
						disabled: false
					}
				]
			};
		},
		watch: {
			curValue: {
				deep: true,
				handler(newVal) {
					this.$emit('input', newVal);
					// this.$emit('update:value', newVal)
					// console.log('=curValue==', newVal)
				}
			}
		},
		computed: {},
		methods: {
			// 联想控件-查询方法
			queryAssociateMethod(params) {
				const {
					keyword,
					pageSize,
					currentPage
				} = params;
				// console.log(keyword, pageSize, currentPage);
				return new Promise((resolve, reject) => {
					const records = [{
							addressCode: '11',
							addressName: '名称1'
						},
						{
							addressCode: '11',
							addressName: '名称2'
						}
					];
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
				this.curValue = item.addressCode;
				this.label = item.addressName;
				console.log('getAssociateData', item);
			},
			checkboxChange() {},
			// 下拉
			confirmSelect(obj) {
				this.label = obj.value[0][this.labelProp] || '';
				this.curValue = obj.value[0][this.valueProp] || '';
				console.log('=confirmSelect==', obj);
				this.showSelect = false;
			},
			//
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				}
				if (type === 'month') {
					return `${value}月`;
				}
				if (type === 'day') {
					return `${value}日`;
				}
				return value;
			},
			confirmDate(obj) {
				// this.curValue = obj.value
				this.curValue = formatterTime(obj.value, this.type === INPUT_TYPE.DATETIME ? 'time' : 'date');
				console.log('=confirmDate==', obj, this.curValue);
				this.showDatePicker = false;
			},
			// 初始格式化数据
			initData() {
				// console.log('=this.dataList==', this.dataList)
			},
		},
		onReady() {},
		mounted() {
			// this.initData()
			if (this.type == INPUT_TYPE.DATE) {
				// 微信小程序需要用此写法
				this.$refs.datetimePicker.setFormatter(this.formatter);
			}
			this.curValue = this.value
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
</style>