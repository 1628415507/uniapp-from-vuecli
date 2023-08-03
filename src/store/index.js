/*
 * @Description:Vuex配置
 * @Date: 2023-08-03 16:52:06
 * @LastEditTime: 2023-08-03 17:02:21
 */
// 1. 导入 Vue 和 Vuex
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 模块
import user from './modules/user.js';

import getters from './getters';

// 2. 将 Vuex 安装为 Vue 的插件

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
    // 挂载 store 模块
    modules: {
        user
    },
    getters
});

// 向外共享 Store 的实例对象
export default store;
