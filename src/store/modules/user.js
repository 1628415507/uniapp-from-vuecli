/*
 * @Description:Vuex-用户模块
 * @Date: 2023-08-03 16:56:53
 * @LastEditTime: 2023-08-05 09:27:56
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
		},
		SET_USER_INFO(state, info={}) {
			state.userInfo = info;
			state.userName = info?.username||'';
		},
	},
	// 模块的 actions 方法
	actions: {
		setActiveTab({ commit }, val) {
			commit('SET_ACTIVE_TAB', val);
		},
		setUserInfo({ commit }, obj) {
			commit('SET_USER_INFO', obj);
		},
		logout({ commit }){
			commit('SET_USER_INFO', null);
			uni.clearStorageSync()//清除所有缓存
		}
	},
	// 模块的 getters 属性
	getters: {}
};