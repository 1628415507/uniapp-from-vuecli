<!--
 * @Description: 首页-签收
 * @Date: 2023-08-17 10:26:18
 * @LastEditTime: 2023-08-22 11:11:00
-->

<template>
	<view class="sign-in-page">
		<!-- <view class="search-wrap flex-sb">
			<u-search v-model="keyword" :showAction="false" height="68rpx" shape="square" bgColor="#F5F6F7"
				placeholder="请输入订单/客户单号" placeholderColor="#A9AEB8" searchIconSize="35" @blur="blurSearch">
			</u-search>
			<view class="scan-icon">
				<u-icon name="scan" size="65rpx" color="#4E5969"></u-icon>
			</view>
		</view> -->
		<view class="form-wrap">
			<view v-if="info.taskStatus!=='SIGNED'" class="status-wrap flex-c">
				未签收
			</view>
			<u-form labelPosition="left" :model="formData" ref="formRef" :rules="formRules" :labelStyle="labelStyle">
				<u-form-item label="调度单号:" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">{{info.dispatchNo}}</view>
				</u-form-item>
				<u-form-item label="任务单号:" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">{{info.taskNo}}</view>
				</u-form-item>
				<u-form-item label="签收图片:" prop="fileList" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="img" multiple
						:maxCount="6" :previewFullImage="true" width="128rpx" height="128rpx"></u-upload>
				</u-form-item>
				<u-form-item label="签收件数:" prop="signPcs" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u--input v-model="formData.signPcs" type="digit" border="none" placeholder="请输入"></u--input>
				</u-form-item>
				<u-form-item label="签收体积:" prop="signVolume" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u--input v-model="formData.signVolume" type="digit" border="none" placeholder="请输入"></u--input>
				</u-form-item>
				<u-form-item label="签收重量:" prop="signWeight" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u--input v-model="formData.signWeight" type="digit" border="none" placeholder="请输入"></u--input>
				</u-form-item>
				<u-form-item label="签收方式:" prop="signMode" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u-radio-group v-model="formData.signMode" placement="row" size="28rpx" iconSize="13px"
						activeColor="#008474">
						<u-radio v-for="(item, index) in SIGN_MODE" :key="index" :label="item.value" labelSize="28rpx"
							:name="item.text" :customStyle="{marginRight: '30rpx'}">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="签收人:" prop="signer" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u--input v-model="formData.signer" border="none" placeholder="请输入"></u--input>
				</u-form-item>
				<u-form-item label="签收时间:" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt" @click="dateShow=true">{{formData.signTime}}</view>
				</u-form-item>
				<u-form-item label="备注:" :labelWidth="labelWidth" :labelStyle="labelStyle" borderBottom
					class="form-item">
					<u--input v-model="formData.remark" border="none" placeholder="请输入"></u--input>
					<!-- <u-textarea v-model="formData.remark" border="none" placeholder="请输入" height="100rpx"></u-textarea> -->
				</u-form-item>
			</u-form>
		</view>
		<view class="g-footer-btn flex-sb">
			<view class="btn-item">
				<u-button text="取消" @click="cancel"></u-button>
			</view>
			<view class="btn-item">
				<u-button type="primary" text="提交" @click="submit"></u-button>
			</view>
		</view>
		<u-datetime-picker ref="datetimePicker" :show="dateShow" v-model="date" mode="datetime" @cancel="dateShow=false"
			@confirm="confirmDate" itemHeight="60" :confirmColor="colorTheme"></u-datetime-picker>
	</view>
</template>

<script>
	import {
		taskDetail,
		signedNode,
		uploadFile
	} from '@/apis/loading-detail.js'
	import {
		validFloatNumber
	} from '@/utils/validator.js'
	export default {
		components: {},
		data() {
			return {
				// 公共
				loadInfo: {},
				colorTheme: this.$store.getters.colorTheme,
				dateShow: false,
				// 搜索栏
				// keyword: '',
				// 表单
				labelWidth: '150rpx',
				labelStyle: {
					color: '#4E5969 !important'
				},
				info: {},
				date: Number(new Date()),
				fileList: [
					// 	{
					// 	url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					// },
				],
				formData: {
					signPcs: '',
					signVolume: '',
					signWeight: '',
					signMode: "SIGN",
					signer: '',
					signTime: '',
					remark: ''
				},
				formRules: {
					'signPcs': {
						validator: validFloatNumber,
						trigger: ['blur', 'change']
					},
					'signVolume': {
						validator: validFloatNumber,
						trigger: ['blur', 'change']
					},
					'signWeight': {
						validator: validFloatNumber,
						trigger: ['blur', 'change']
					},
					'signMode': {
						type: 'string',
						required: true,
						message: '选择签收方式',
						trigger: ['blur', 'change']
					}
				},
			}
		},
		computed: {
			SIGN_MODE() {
				return this.$dict.getDictOptions('SIGN_MODE') || []
			}
		},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs.formRef.setRules(this.formRules)
		},
		onLoad(opt) {
			this.loadInfo = opt
			this.formData.signTime = this.formatter(Number(new Date()))
			this.getDetailInfo(opt.id)
		},
		methods: {
			formatter(timestamp) {
				const date = new Date(timestamp);
				const year = date.getFullYear(); // 获取年份
				const month = date.getMonth() + 1; // 获取月份（注意月份从0开始，需要加1）
				const day = date.getDate(); // 获取日期
				const hour = date.getHours(); // 获取小时
				const minute = date.getMinutes(); // 获取分钟
				const second = date.getSeconds(); // 获取秒钟
				const formattedTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
				console.log('【 formattedTime 】-166', formattedTime)
				return formattedTime
			},
			confirmDate(date) {
				console.log('【 date 】-171', date)
				this.date = date.value
				this.formData.signTime = this.formatter(date.value)
				this.dateShow = false
			},
			getDetailInfo(id) {
				taskDetail({
					mtsTaskTmId: id
				}).then(res => {
					this.info = res.data || {}
				})
			},
			cancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				this.$refs.formRef?.validate().then(res => {
					signedNode({
						mtsTaskTmId: this.loadInfo.id,
						taskStatus: this.info.taskStatus,
						...this.formData
					}).then(res => {
						let fileListLen = this.fileList.length
						for (let i = 0; i < fileListLen; i++) {
							this.uploadFilePromise(this.fileList[i].url)
							// const result = await this.uploadFilePromise(lists[i].url)
							// let item = this.fileList[fileListLen]
							// this.fileList.splice(fileListLen, 1, Object.assign(item, {
							// 	status: 'success',
							// 	message: '',
							// 	url: result
							// }))
							// fileListLen++
						}
						uni.showToast({
							icon: 'none',
							title: '操作成功',
							duration: 2000
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 300)

					})
				});
			},
			// 删除图片
			deletePic(event) {
				console.log('【 deletePic-event 】-202', event)
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			// 读取后的处理函数
			async afterRead(event) {
				console.log('【afterRead- event 】-202', event)
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				lists.map((item) => {
					this.fileList.push({
						...item,
						// status: 'uploading',
						// message: '上传中'
					})
				})
				// let fileListLen = this.fileList.length
				// for (let i = 0; i < lists.length; i++) {
				// 	const result = await this.uploadFilePromise(lists[i].url)
				// 	let item = this.fileList[fileListLen]
				// 	this.fileList.splice(fileListLen, 1, Object.assign(item, {
				// 		status: 'success',
				// 		message: '',
				// 		url: result
				// 	}))
				// 	fileListLen++
				// }
			},
			// 上传图片
			uploadFilePromise(url) {
				console.log('【 url 】-240', url)
				return new Promise((resolve, reject) => {
					// TODO
					let a = uni.uploadFile({
						url: 'http://172.16.1.232:3000/mock/237/dip-imp-psm/filesystem/uploadFile', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							sourceOrderNo: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
					resolve()
				})
			},
			blurSearch(val) {
				console.log('blurSearch', val)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
	}

	// ::v-deep .form-item .u-form-item__body__left {
	// 	display: flex;
	// 	flex-direction: row;
	// 	align-items: flex-start !important;
	// }

	.sign-in-page {
		position: relative;
		padding: 38rpx 32rpx;
		background-color: #fff;
		height: 100vh;
		box-sizing: border-box;
		border-radius: 30rpx 30rpx 0 0;
	}

	.search-wrap {
		.scan-icon {
			margin-left: 30rpx;
		}
	}

	.form-wrap {
		// margin-top: 40rpx;
		position: relative;

		.status-wrap {
			position: absolute;
			top: 20rpx;
			right: 32rpx;
			width: 112rpx;
			height: 64rpx;
			background: rgba(229, 60, 60, 0.1);
			border-radius: 12rpx;
			border: 2rpx solid #E53C3C;
			font-size: 28rpx;
			color: #E53C3C;
		}
	}

	.btn-item {
		width: 48%;
	}
</style>