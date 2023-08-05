<!--
 * @Description:公共组件示例
 * @Date: 2023-08-04 09:26:48
 * @LastEditTime: 2023-08-05 14:45:20
-->
<template>
	<view>
		<!-- 联想控件 :defaultValue="associateDefaultValue" -->
		<u-button @click="showAssociatePopup = true">打开AssociatePopup</u-button>
	  <associate-popup v-if="showAssociatePopup" :show.sync="showAssociatePopup" value-prop="addressCode"
			label-prop="addressCode" :fieldList="associateFieldList" :query-method="queryAssociateMethod"
			@getData="getAssociateData">
		</associate-popup>
    <!-- 组合输入框 -->
		<u-line dashed margin="20rpx 0"></u-line>
		<input-group :source.sync="formData.sealNo" :scannable="true"
			@handleDataChange="(val) => handleDataChange(val,'sealNo')" />
		<associate-input-group :source.sync="formData.gcon" :scannable="true"
			@handleDataChange="(val) => handleDataChange(val,'gcon')" />
		<!-- 暂无数据 -->
		<u-line dashed margin="20rpx 0"></u-line>
		<Empty title="暂无数据"></Empty>
	</view>
</template>

<script>
	import AssociatePopup from "@/components/select-popup/index.vue";
	import InputGroup from "@/components/input-group/input-group.vue";
	import AssociateInputGroup from "@/components/input-group/associate-input-group.vue";
	import Empty from "@/components/empty/index.vue";
  export default {
		components: {
  		AssociatePopup,
	    InputGroup,
		  AssociateInputGroup,
			Empty
		},
		data() {
			return {
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
        // 组合输入框
				formData:{
					sealNo: [1235678, 1234575], //封条号
					gcon: [], //G-CON//gcon
				}
      }
		},
		created() {
		},
		onLoad() {
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
          resolve({});
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
		}
	}
</script>