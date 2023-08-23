<!--
 * @Description: 异常上报-弹框
 * @Date: 2023-08-17 11:02:42
 * @LastEditTime: 2023-08-17 13:48:33
-->
<template>
	<u-popup :show="visible" mode="bottom" :round="32" :closeOnClickOverlay="true" @close="handlePopupClose" overlay
		zIndex="1000000">
		<view class="report-popup">
			<view class="popup-content__top">
				<view class="title flex-sb">
					异常上报
					<u-icon name="close" color="#86909C" size="24" @click="handlePopupClose"></u-icon>
				</view>
				<view class="sub-title"> 任务单号： {{'CN091231231'}}</view>
			</view>
			<view class="popup-content__middle">
				<u-form labelPosition="left" :model="model1" ref="formRef">
					<!-- 					<u-form-item label="标题" prop="userInfo.name" borderBottom labelWidth="150rpx"
						:labelStyle="labelStyle">
						<view class="txt">标题</view>
					</u-form-item>
					<u-form-item label="标题" prop="userInfo.name" borderBottom labelWidth="150rpx"
						:labelStyle="labelStyle">
						<view class="txt">标题</view>
					</u-form-item>
					<u-form-item label="标题" prop="userInfo.name" borderBottom labelWidth="150rpx"
						:labelStyle="labelStyle">
						<view class="txt">标题</view>
					</u-form-item> -->
					<!-- <u-form-item label="标题" prop="userInfo.sex" borderBottom labelWidth="150rpx">
						<view class="txt">标题</view> -->
					<!-- <u--input v-model="model1.userInfo.name" border="none"></u--input> -->
					<!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
					<!-- </u-form-item> -->
					<u-form-item label="异常原因" prop="userInfo.name" labelWidth="150rpx" :labelStyle="labelStyle">
						<u-radio-group v-model="model1.userInfo.reason" placement="row" size="28rpx" iconSize="13px"
							activeColor="#008474">
							<view class="reason-wrap flex-wrap">
								<u-radio v-for="(item, index) in radiolist1" :key="index" :label="item.name"
									iconSize="28rpx" labelSize="28rpx" :name="item.name"
									:customStyle="{marginRight: '30rpx',marginTop: '20rpx'}">
								</u-radio>
							</view>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="上报图片" prop="userInfo.name" labelWidth="150rpx" :labelStyle="labelStyle">
						<u-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple
							:maxCount="10" :previewFullImage="true" width="128rpx" height="128rpx"></u-upload>
					</u-form-item>
					<u-form-item label="异常说明" prop="userInfo.name" borderBottom labelWidth="150rpx"
						:labelStyle="labelStyle">
						报价说明报价说明，报价说明报价说明报价说明报价说明
					</u-form-item>
				</u-form>
			</view>
			<view class="popup-content__bottom">
				<u-button @click="submit" type="primary">提交</u-button>
				<view class="tips">
					说明：请上传交付凭证，包含运单签收页，回单上传
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	export default {
		components: {},
		props: {
			show: {
				type: Boolean, //显示弹框
				default: false
			}
		},
		data() {
			return {
				// 当前组件
				visible: false,
				disabled: false,
				// 表单
				labelStyle: {
					color: 'red !important'
				},
				showSex: false,
				fileList3: [{
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				}],
				// 基本数据
				radiolist1: [{
						name: '选项一',
						disabled: false
					},
					{
						name: '选项二',
						disabled: false
					},
					{
						name: '选项三',
						disabled: false
					}, {
						name: '选项四',
						disabled: false
					},
					{
						name: '选项五',
						disabled: false
					}, {
						name: '选项六',
						disabled: false
					}
				],
				model1: {
					userInfo: {
						name: 'uView UI',
						sex: '',
						reason: '',
					},
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false

			}
		},
		watch: {
			show() {
				this.visible = this.show;
			},
			visible() {
				this.$emit('update:show', this.visible);
			}
		},
		computed: {},
		methods: {
			submit() {},
			// 当前弹框-关闭
			handlePopupClose() {
				this.visible = false;
			},
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
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		mounted() {
			this.visible = this.show;
			this.$nextTick(() => {
				// this.$refs.formRef.setRules(this.rules)
			})
		}
	};
</script>

<style lang="scss" scoped>
	::v-deep .u-button {
		border: none !important;
		border-color: #fff !important;
	}

	.txt {
		width: 100%;
		text-align: right;
	}

	.report-popup {
		padding: 38rpx 32rpx;
		// height: 90vh;

		.popup-content__top {
			position: relative;
			color: $colorFontTitle;
			font-weight: 500;

			.title {
				width: 100%;
				font-size: 32rpx;
			}

			.sub-title {
				margin-top: 32rpx;
				font-size: 28rpx;
			}
		}

		.popup-content__middle {
			margin-top: 25rpx;
			width: 100%;
		}

		.popup-content__bottom {
			margin-top: 40rpx;

			.tips {
				margin-top: 20rpx;
				width: 100%;
				font-size: 24rpx;
				text-align: center;
				font-weight: 400;
				color: #86909C;
				line-height: 44rpx;
			}
		}
	}
</style>