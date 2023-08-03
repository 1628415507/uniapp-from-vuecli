/*
 * @Description:Vuex-用户模块
 * @Date: 2023-08-03 16:56:53
 * @LastEditTime: 2023-08-03 16:59:15
 */
export default {
    namespaced: true, // 为当前模块开启命名空间
    // 模块的 state 数据
    state: {
        userName: 'admin',
        userInfo: {} // 用户信息,
    },
    // 模块的 mutations 方法
    mutations: {},
    // 模块的 actions 方法
    actions: {},
    // 模块的 getters 属性
    getters: {}
};
