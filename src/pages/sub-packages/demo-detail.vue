<!--
 * @Description:公共组件示例
 * @Date: 2023-08-04 09:26:48
 * @LastEditTime: 2023-08-05 13:36:37
-->
<template>
	<view>
		<!-- 联想控件-起始地、目的地联想控件 :defaultValue="addressDefaultValue" -->
		<u-button @click="showAddressPopup = true">打开AssociatePopup</u-button>
	  <associate-popup v-if="showAddressPopup" :show.sync="showAddressPopup" value-prop="addressCode"
			label-prop="addressCode" :fieldList="addressFieldList" :query-method="queryAddressMethod"
			@getData="getAssociateData">
		</associate-popup>
    <!--  -->
	</view>
</template>

<script>
	import AssociatePopup from "@/components/select-popup/index.vue";
	export default {
		components: {
      AssociatePopup
		},
		data() {
			return {
        // 联想控件
        showAddressPopup: false,
				addressDefaultValue: '',
        	addressFieldList: [{
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
        //
      }
		},
		created() {
		},
		onLoad() {
		},
		methods: {
      // 联想控件-查询方法
			queryAddressMethod(params) {
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
		}
	}
</script>