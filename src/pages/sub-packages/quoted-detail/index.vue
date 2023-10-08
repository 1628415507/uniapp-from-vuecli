<!--
 * @Description:报价详情
 * @Date: 2023-08-18 14:57:03
 * @LastEditTime: 2023-10-08 10:25:01
-->

<template>
    <view class="detail-page">
        <u-form labelPosition="left" :model="formData" ref="formRef" :rules="formRules" :labelStyle="labelStyle" :labelWidth="labelWidth">
            <!-- 倒计时 -->
            <view class="time-wrap">
                <view class="time-wrap__top flex-sb">
                    <view class="label flex">
                        <u-image :src="require('@/static/image/icons/trophy.svg')" width="48rpx" height="48rpx"> </u-image>
                        <text style="margin-left: 15rpx">
                            {{ isFinished ? '竞价结束' : '竞价剩余时间' }}
                        </text>
                    </view>
                    <view v-if="!isFinished" class="countdown">
                        <u-count-down :time="countdownTime" format="DD:HH:mm" autoStart @change="countDownChange">
                            <view class="time flex">
                                <view class="time__item">{{ timeData.days || 0 }}</view>
                                <text class="time__txt">天</text>
                                <view class="time__item">{{ timeData.hours || 0 }}</view>
                                <text class="time__txt">时</text>
                                <view class="time__item">{{ timeData.minutes || 0 }}</view>
                                <text class="time__txt">分</text>
                            </view>
                        </u-count-down>
                    </view>
                </view>
                <view class="time-wrap__bottom">
                    <view class="value">{{ info.rank || '-' }}</view>
                    <view class="label">
                        {{ isFinished ? '竞价排名' : '当前竞价排名' }}
                    </view>
                </view>
            </view>
            <!-- 报价信息 -->
            <view class="info-wrap">
                <view class="box-title">报价信息</view>
                <view class="form--required">
                    <u-form-item v-if="canQuoting" label="税率" prop="taxRate" borderBottom @click="showSelectPopup = true">
                        <u--input v-model="formData.taxRateName" readonly placeholder="请选择" border="none" inputAlign="right"></u--input>
                        <u-icon slot="right" name="arrow-right" color="#86909C"></u-icon>
                    </u-form-item>
                </view>
                <!-- 转字典 -->
                <u-form-item v-if="!canQuoting" label="税率" borderBottom>
                    <view class="form-txt">{{ info.taxRate || '-' }}</view>
                </u-form-item>
                <view class="form--required">
                    <u-form-item v-if="canQuoting" label="含税总额" borderBottom labelPosition="top" prop="includingTaxTotal">
                        <u--input
                            v-model="formData.includingTaxTotal"
                            type="digit"
                            border="none"
                            placeholder=" "
                            prefixIcon="rmb"
                            prefixIconStyle="fontSize:48rpx;color:#4E5969"
                            customStyle="marginTop:20rpx"
                            fontSize="48rpx"
                        ></u--input>
                    </u-form-item>
                </view>
                <template v-if="!canQuoting">
                    <u-form-item label="含税总额">
                        <view class="form-txt bold">{{ info.includingTaxTotal }}</view>
                    </u-form-item>
                    <u-form-item label="不含税总额" borderBottom>
                        <view class="form-txt bold">{{ info.excludingTaxTotal }}</view>
                    </u-form-item>
                </template>
                <view :class="canQuoting ? 'form--required' : ''">
                    <u-form-item label="报价说明" borderBottom class="form-label" prop="quoteExplain">
                        <u-textarea
                            v-if="canQuoting"
                            v-model="formData.quoteExplain"
                            border="none"
                            count
                            maxlength="140"
                            placeholder="请输入内容"
                            height="100rpx"
                            inputAlign="right"
                        ></u-textarea>
                        <view v-else class="form-txt">{{ info.quoteExplain }}</view>
                    </u-form-item>
                </view>
                <u-form-item label="询价说明" borderBottom>
                    <view class="form-txt">{{ info.inquiryExplain }}</view>
                </u-form-item>
            </view>
            <!-- 委托明细 -->
            <view class="info-wrap">
                <view class="box-title">委托明细</view>
                <view class="list-wrap">
                    <view class="list-item" v-for="(item, index) in info.inquiryDetailsVoList" :key="index" @click="goUrl(index)">
                        <view class="content-top flex-sb">
                            <u-image :src="require('@/static/image/icons/compass-light.svg')" width="40rpx" height="40rpx"></u-image>
                            <view style="width: 100%" class="content-top__item flex-sb">
                                <text class="txt ellipsis">总里程 {{ item.totalMileage || '-' }}</text>
                                <text class="txt ellipsis">{{ TRANS_MODE[item.transMode] || '-' }}</text>
                            </view>
                            <view style="width: 30rpx">
                                <u-icon name="arrow-right" color="#86909C"></u-icon>
                            </view>
                        </view>
                        <view class="content-middle">
                            <view class="flex-sb">
                                <view class="content-middle__item">
                                    <view class="label">计划总数量</view>
                                    <view class="ellipsis">{{ item.planTotalQty || '-' }} KG</view>
                                </view>
                                <view class="content-middle__item">
                                    <view class="label">计划总体积</view>
                                    <view class="ellipsis">{{ item.planTotalVolume || '-' }} CDM</view>
                                </view>
                                <view class="content-middle__item">
                                    <view class="label">计划总重量</view>
                                    <view class="ellipsis">{{ item.planTotalWeight || '-' }} CT</view>
                                </view>
                            </view>
                        </view>
                        <view class="content-bottom">
                            <view class="g-steps-wrap">
                                <u-steps :current="0" direction="column">
                                    <u-steps-item :title="item.originName" desc="起运地">
                                        <text slot="icon" class="steps-icon blue">装</text>
                                    </u-steps-item>
                                    <u-steps-item :title="item.destName" desc="目的地">
                                        <text slot="icon" class="steps-icon">卸</text>
                                    </u-steps-item>
                                </u-steps>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 询价信息 -->
            <view class="info-wrap">
                <view class="box-title">询价信息</view>
                <u-form-item label="询价标题" borderBottom>
                    <view class="form-txt">{{ info.inquiryTitle }}</view>
                </u-form-item>
                <u-form-item label="询价日期" borderBottom>
                    <view class="form-txt">{{ info.inquiryDate }}</view>
                </u-form-item>
                <u-form-item label="询价方" borderBottom>
                    <view class="form-txt">{{ info.inquirer }}</view>
                </u-form-item>
                <u-form-item label="询价有效期" borderBottom>
                    <view v-show="info.quotationStartTime" class="form-txt">
                        {{ info.quotationStartTime }}至{{ info.quotationDeadline }}
                    </view>
                </u-form-item>
            </view>
        </u-form>
        <view v-show="canQuoting" class="footer-btn flex-sb">
            <view class="btn-item">
                <u-button text="弃标" @click="confirmShow = true"></u-button>
            </view>
            <view class="btn-item">
                <u-button type="primary" text="提交报价" @click="submit"></u-button>
            </view>
        </view>
        <!-- 确认框 -->
        <u-modal
            :show="confirmShow"
            :showCancelButton="true"
            :confirmColor="colorTheme"
            @cancel="confirmShow = false"
            @confirm="confirmModal"
        >
            <view style="width: 100%">
                <view style="margin: 10rpx 0">弃标理由：</view>
                <u--textarea v-model="reason" placeholder="请输入"></u--textarea>
            </view>
        </u-modal>
        <!-- 下拉框 -->
        <select-popup
            v-if="showSelectPopup"
            :show.sync="showSelectPopup"
            value-prop="value"
            label-prop="text"
            :defaultValue="selectDefaultValue"
            :multiple="false"
            @getInfo="getSelectInfo"
            :list="MDM_TAX_RATE"
        >
        </select-popup>
    </view>
</template>

<script>
import SelectPopup from '@/components/select-popup/index.vue';
import { quotationDetail, quotationSave, abandoningBid } from '@/apis/quoted-detail.js';
import { validFloatNumber } from '@/utils/validator.js';
export default {
    components: {
        SelectPopup
    },
    data() {
        return {
            // 公共
            loadInfo: {},
            colorTheme: this.$store.getters.colorTheme,
            isFinished: false,
            biddingStatus: '',
            BINDING_STATUS: {
                QUOTING: 10, // 待报价
                BIDING: 20, // 待开标
                WIN_BID: 30, // 已中标
                NO_BID: 40, // 未中标
                ABANDON: 50 //弃标
            },
            // 倒计时
            countdownTime: 0,
            timeData: {},
            // 表单
            labelWidth: '170rpx',
            labelStyle: {
                color: '#4E5969 !important'
            },
            info: {},
            formData: {
                taxRate: '',
                includingTaxTotal: '',
                excludingTaxTotal: '', //
                quoteExplain: ''
            },
            formRules: {
                taxRate: {
                    type: 'number',
                    required: true,
                    message: '请选择税率',
                    trigger: ['blur', 'change']
                },
                includingTaxTotal: [
                    {
                        type: 'number',
                        required: true,
                        message: '请输入含税总额',
                        trigger: ['blur', 'change']
                    },
                    {
                        validator: validFloatNumber,
                        trigger: ['blur', 'change']
                    }
                ],
                quoteExplain: {
                    type: 'string',
                    required: true,
                    message: '请输入报价说明',
                    trigger: ['blur', 'change']
                }
            },
            // 确认框
            confirmShow: false,
            reason: '',
            // 下拉框
            showSelectPopup: false,
            selectDefaultValue: ''
        };
    },
    computed: {
        canQuoting() {
            return (
                !this.isFinished &&
                (this.biddingStatus === this.BINDING_STATUS.QUOTING || this.biddingStatus === this.BINDING_STATUS.BIDING)
            );
        },
        // 运输方式
        TRANS_MODE() {
            return this.$dict.getDictsEnum('TRANS_MODE', {
                keyProp: 'value',
                valueProp: 'text'
            });
        },
        MDM_TAX_RATE() {
            return this.$dict.getDictOptions('MDM_TAX_RATE') || [];
        }
    },
    onReady() {
        //onReady 为uni-app支持的生命周期之一
        this.$refs.formRef.setRules(this.formRules);
    },
    onLoad(opt) {
        this.loadInfo = JSON.parse(opt.info);
        this.biddingStatus = Number(this.loadInfo.quoteStatus);
        this.isFinished = new Date(this.loadInfo.quotationDeadline) < new Date();
        this.countdownTime = this.getCountdownTime(this.loadInfo.quotationDeadline); //'2023-8-30 21:21'
        this.getDetailInfo();
        console.log('【 loadInfo 】-266', this.loadInfo, this.biddingStatus, this.isFinished);
    },
    methods: {
        // 获取ms倒计时
        getCountdownTime(time) {
            const deadline = new Date(time);
            const now = new Date();
            const diff = deadline - now;
            console.log('【 diff 】-296', diff);
            return diff < 0 ? 0 : diff;
        },
        getDetailInfo() {
            this.loadInfo.scctInquiryId &&
                quotationDetail({
                    scctInquiryId: this.loadInfo.scctInquiryId
                }).then(res => {
                    this.info = {
                        ...res,
                        quotationStartTime: res.quotationStartTime?.substring(0, 10),
                        quotationDeadline: res.quotationDeadline?.substring(0, 10),
                        taxRate: this.$dict.getDictNameByCode('MDM_TAX_RATE', res.taxRate)
                    };
                    this.formData = res;
                    this.formData.taxRateName = this.$dict.getDictNameByCode('MDM_TAX_RATE', res.taxRate);
                });
        },
        goUrl(index) {
            const item = this.info.inquiryDetailsVoList[index];
            uni.navigateTo({
                url: `/pages/sub-packages/quoted-detail/detail?info=${JSON.stringify(item)}`
            });
        },
        countDownChange(e) {
            this.timeData = e;
        },
        // 确认弹框
        confirmModal() {
            if (!this.reason) {
                uni.showToast({
                    icon: 'none',
                    title: '弃标理由必填',
                    duration: 2000
                });
                return;
            }
            abandoningBid({
                scctInquiryId: this.loadInfo.scctInquiryId,
                reason: this.reason
            }).then(res => {
                const success = res;
                uni.showToast({
                    icon: 'none',
                    title: success ? '操作成功' : '操作失败',
                    duration: 2000
                });
                if (success) {
                    this.confirmShow = false;
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 500);
                }
            });
        },
        submit() {
            this.$refs.formRef?.validate().then(res => {
                const { includingTaxTotal, taxRate } = this.formData;
                quotationSave({
                    scctInquiryId: this.loadInfo.scctInquiryId,
                    scctQuotationId: this.loadInfo.scctQuotationId,
                    ...this.formData,
                    excludingTaxTotal: includingTaxTotal - includingTaxTotal * taxRate
                }).then(res => {
                    uni.showToast({
                        icon: 'none',
                        title: '报价成功',
                        duration: 2000
                    });
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 500);
                });
            });
        },
        getSelectInfo(info) {
            this.formData.taxRateName = info?.text;
            this.formData.taxRate = info.value;
            this.selectDefaultValue = info.value;
            this.$refs.formRef.validateField('taxRate');
            console.log('=下拉getSelectInfo==', info);
        }
    }
};
</script>

<style lang="scss">
page {
    background: linear-gradient(to bottom, #e8f3f5, #e6eff6) !important;
}

.form--required {
    .u-form-item__body__left__content__label {
        &::after {
            content: '*';
            margin-left: 5rpx;
            color: red;
        }
    }
}

.bold {
    font-weight: 600;
    font-size: 35rpx;
    color: #1d2129;
}

.detail-page {
    position: relative;
    background-color: #fff;
    padding: 5rpx;
    box-sizing: border-box;
    border-radius: 30rpx 30rpx 0 0;
    overflow: hidden;
}

.time-wrap {
    height: 320rpx;
    background: linear-gradient(to bottom, #f0f7f6, #fdfefe) !important;
    border-radius: 30rpx 30rpx 0 0;
    box-sizing: border-box;
    padding: 24rpx 32rpx;

    .time-wrap__top {
        .label {
            width: 230rpx;
            font-size: 28rpx;
        }

        .time {
            &__item {
                color: #fff;
                font-size: 22rpx;
                text-align: center;
                width: 40rpx;
                height: 40rpx;
                line-height: 40rpx;
                background: #008474;
                border-radius: 4rpx;
            }

            .time__txt {
                color: #1d2129;
                font-size: 26rpx;
                padding: 0px 4px;
            }
        }
    }

    .time-wrap__bottom {
        margin-top: 28rpx;
        width: 100%;
        height: 196rpx;
        background: #ffffff;
        box-shadow: 0rpx 24rpx 56rpx 0rpx rgba(209, 233, 230, 0.3);
        border-radius: 16rpx;
        text-align: center;

        .value {
            min-height: 88rpx;
            font-size: 88rpx;
            font-weight: bold;
            color: #008474;
        }

        .label {
            font-size: 28rpx;
        }
    }
}

// ::v-deep .form-label .u-form-item__body__left {
// 	display: flex;
// 	flex-direction: row;
// 	align-items: flex-start !important;
// }

.info-wrap {
    padding: 24rpx 32rpx;

    .box-title {
        margin-bottom: 24rpx;
        box-sizing: border-box;
        width: 100%;
        padding-left: 16rpx;
        border-left: 4rpx solid $colorTheme;
        font-size: 32rpx;
        font-weight: 500;
        color: #1d2129;
    }

    .steps-icon {
        width: 64rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        background: #008474;
        border-radius: 50%;
        font-size: 28rpx;
        color: #ffffff;
    }

    .blue {
        background: #2572cc;
    }

    .form-txt {
        width: 100%;
        text-align: right;
    }
}

.list-wrap {
    .list-item {
        margin-bottom: 24rpx;
        box-sizing: border-box;
        width: 100%;
        background: #ffffff;
        border-radius: 16rpx;
        border: 3rpx solid #e5e6eb;
        padding: 24rpx;

        .label {
            font-size: 24rpx;
            color: #86909c;
        }

        .content-top {
            border-bottom: 2rpx solid $colorBorder;
            padding-bottom: 24rpx;
            font-size: 32rpx;
            font-weight: 500;

            .content-top__item {
                overflow: hidden;
            }

            .txt {
                margin: auto 12rpx;
            }
        }

        .content-middle {
            margin: 24rpx auto;
            font-size: 30rpx;
            font-weight: 500;
            color: #1d2129;
            font-size: 24rpx;

            .content-middle__item {
                max-width: 33.3%;
                text-align: center;
                line-height: 45rpx;
                font-size: 30rpx;
                overflow: hidden;
            }
        }
    }
}

.footer-btn {
    padding: 24rpx 32rpx;

    .btn-item {
        width: 48%;
    }
}
</style>
