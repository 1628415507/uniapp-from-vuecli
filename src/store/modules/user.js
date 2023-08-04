/*
 * @Description:Vuex-用户模块
 * @Date: 2023-08-03 16:56:53
 * @LastEditTime: 2023-08-04 14:56:02
 */
export default {
	namespaced: true, // 为当前模块开启命名空间
	// 模块的 state 数据
	state: {
		userName: 'admin',
		userInfo: {}, // 用户信息,
		activeTab: 'home', //当前激活的tab
	},
	// 模块的 mutations 方法
	mutations: {
		SET_ACTIVE_TAB(state, val) {
			state.activeTab = val;
		}
	},
	// 模块的 actions 方法
	actions: {
		setActiveTab({
			commit
		}, val) {
			commit('SET_ACTIVE_TAB', val);
		}
	},
	// 模块的 getters 属性
	getters: {}
};