<!--
 * @Description: 首页-签收
 * @Date: 2023-08-17 10:26:18
 * @LastEditTime: 2023-08-17 18:44:47
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
			<view class="status-wrap flex-c">
				未签收
			</view>
			<u-form labelPosition="left" :model="formData" ref="formRef" :labelStyle="labelStyle">
				<u-form-item label="订单号:" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">CN091231231</view>
				</u-form-item>
				<u-form-item label="客户委托号:" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<view class="txt">CN091231231</view>
				</u-form-item>
				<u-form-item label="签收图片:" prop="fileList" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u-upload :fileList="formData.fileList" @afterRead="afterRead" @delete="deletePic" name="3" multiple
						:maxCount="10" :previewFullImage="true" width="128rpx" height="128rpx"></u-upload>
				</u-form-item>
				<u-form-item label="签收方式:" prop="method" :labelWidth="labelWidth" :labelStyle="labelStyle">
					<u-radio-group v-model="formData.method" placement="row" size="28rpx" iconSize="13px"
						activeColor="#008474">
						<view class="reason-wrap flex-sb-wrap">
							<u-radio v-for="(item, index) in radioList" :key="index" :label="item.name"
								labelSize="28rpx" :name="item.name" @change="radioChange"
								:customStyle="{marginRight: '30rpx'}">
							</u-radio>
						</view>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="异常说明:" borderBottom :labelWidth="labelWidth" :labelStyle="labelStyle">
					报价说明报价说明，报价说明报价说明报价说明报价说明
				</u-form-item>
			</u-form>
		</view>
		<view class="com-footer-btn flex-sb">
			<view class="btn-item">
				<u-button text="取消" @click="cancel"></u-button>
			</view>
			<view class="btn-item">
				<u-button type="primary" text="提交" @click="submit"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				// 公共
				colorTheme: this.$store.getters.colorTheme,
				// 搜索栏
				keyword: '',
				// 表单
				labelWidth: '200rpx',
				labelStyle: {
					color: '#4E5969 !important'
				},
				radioList: [{
						name: '签收',
						disabled: false
					},
					{
						name: '拒收',
						disabled: false
					}
				],
				formData: {
					fileList: [{
						url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					}],
					method: "签收"
				},
				rules: {
					// 'method': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '选择签收方式',
					// 	trigger: ['blur', 'change']
					// }
				},
			}
		},
		onLoad() {},
		methods: {
			cancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					// let a = uni.uploadFile({
					// 	url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
					// 	filePath: url,
					// 	name: 'file',
					// 	formData: {
					// 		user: 'test'
					// 	},
					// 	success: (res) => {
					// 		setTimeout(() => {
					// 			resolve(res.data.data)
					// 		}, 1000)
					// 	}
					// });
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