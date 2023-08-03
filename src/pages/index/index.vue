<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view>
            <text class="title">{{ title }}</text>
        </view>
        <!-- uView组件测试 -->
        <u-button type="success" text="uView按钮"></u-button>
        <!-- vuex测试 -->
        <text class="title">Vuex：{{ userName }}</text>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: 'Hello',
            userName: ''
        };
    },
    computed: {},
    onLoad() {},
    created() {
        this.userName = this.$store.state.user.userName;
        console.log('【 user 】-30', this.userName);
    },
    methods: {}
};
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20rpx;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
