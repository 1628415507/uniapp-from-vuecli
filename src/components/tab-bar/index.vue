<!--
 * @Description: 底部菜单栏
 * @Date: 2023-08-04 09:27:20
 * @LastEditTime: 2023-08-04 14:48:57
-->
<template>
    <u-tabbar
        :value="activeTab"
        :fixed="true"
        :placeholder="false"
        :safeAreaInsetBottom="false"
        activeColor="#007acc"
        inactiveColor="#666666"
        @change="handleTabChange"
    >
        <u-tabbar-item v-for="item in tabList" :text="item.text" :icon="item.icon" :name="item.name" :key="item.name"> </u-tabbar-item>
    </u-tabbar>
</template>

<script>
export default {
    data() {
        return {
            activeTab: this.$store.state.user.activeTab,
            tabList: [
                {
                    text: '首页',
                    name: 'home',
                    icon: 'home',
                    url: '/pages/home/index'
                },
                {
                    text: 'Demo',
                    name: 'demo',
                    icon: 'photo',
                    url: '/pages/demo/index'
                },
                {
                    text: '我的',
                    name: 'account',
                    icon: 'account',
                    url: '/pages/user/index'
                }
            ]
        };
    },
    onLoad() {
        // uni.hideTabBar();//隐藏 tabBar
    },
    methods: {
        handleTabChange(val) {
          this.$store.dispatch('user/setActiveTab', val);
          const activeTabInfo = this.tabList.find(item => item.name === val);
          console.log('handleTabChange', val, activeTabInfo, activeTabInfo.url);
          uni.switchTab({
              url: activeTabInfo.url
          });
        }
    }
};
</script>
<style></style>
