<!--
 * @Description:公共组件示例
 * @Date: 2023-08-04 09:26:48
 * @LastEditTime: 2023-08-18 15:06:08
-->
<template>
	<view>
		<!-- 联想控件 :defaultValue="associateDefaultValue" -->
		<u-divider text="联想控件" lineColor="#2979ff" textColor="#2979ff"></u-divider>
		<u-button @click="showAssociatePopup = true">打开AssociatePopup</u-button>
		<associate-popup v-if="showAssociatePopup" :show.sync="showAssociatePopup" value-prop="addressCode"
			label-prop="addressCode" :fieldList="associateFieldList" :query-method="queryAssociateMethod"
			@getData="getAssociateData">
		</associate-popup>

		<!-- 下拉 :defaultValue="associateDefaultValue" -->
		<u-divider text="下拉" lineColor="#2979ff" textColor="#2979ff"></u-divider>
		<u-button @click="showSelectPopup = true">打开下拉</u-button>
		<select-popup v-if="showSelectPopup" :show.sync="showSelectPopup" value-prop="value" label-prop="label"
			:defaultValue="selectDefaultValue" :multiple="true" @confirm="getSelectVal" @getInfo="getSelectInfo"
			:list="tempData">
		</select-popup>
		<!-- echarts -->
		<u-divider text="echarts图表" lineColor="#2979ff" textColor="#2979ff"></u-divider>
		<!-- 折线图 -->
		<view class="content-line">
			<!-- <lineEcharts canvasId="publicReport" :dateList="lineData"></lineEcharts> -->
		</view>
	</view>
</template>

<script>
	import AssociatePopup from "@/components/associate-popup/index.vue";
	import SelectPopup from "@/components/select-popup/index.vue";
	import lineEcharts from './component/line-echarts.vue'
	export default {
		components: {
			AssociatePopup,
			SelectPopup,
			lineEcharts
		},
		data() {
			return {
				// 测试数据
				tempData: [{
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
						label: '选项八',
						value: 8
					}, {
						label: '选项六',
						value: 9
					}
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
				// 下拉
				showSelectPopup: true,
				selectDefaultValue: [1, 2],
				// 组合输入框
				formData: {
					sealNo: [1235678, 1234575], //封条号
					gcon: [], //G-CON//gcon
				},
				// 图表
				lineData: []
			}
		},
		created() {},
		onLoad() {},
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
						addressName: '22'
					}, {
						addressCode: '11',
						addressName: '22'
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
				console.log('getAssociateData', item)
			},
			// 组合输入框-获取数据
			handleDataChange(val, field) {
				// this.formData(field) = val
				console.log('=handleDataChange==', field, val)
			},
			// 下拉控件
			getSelectVal(val) {
				console.log('=下拉getSelectVal==', val)
				this.selectDefaultValue = val
			},
			getSelectInfo(info) {
				console.log('=下拉getSelectInfo==', info)
			}
		}
	}
</script>
<style scoped>
	.content-line {
		width: 686rpx;
		height: 366rpx;
		margin: 0 auto;
		position: relative;
		top: 75rpx;
	}
</style>