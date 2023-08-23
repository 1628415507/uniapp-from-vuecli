/*
 * @Description:Vuex-用户模块
 * @Date: 2023-08-03 16:56:53
 * @LastEditTime: 2023-08-07 16:47:25
 */
export default {
	namespaced: true, // 为当前模块开启命名空间
	// 模块的 state 数据
	state: {
		userName: 'admin',
		userInfo: {}, // 用户信息,
		activeTab: 'quote', //当前激活的tab
		amapKey: '21d1f020389645ee420d864b9c20b70d', //高德地图小程序key
		colorTheme: '#008474' //主题颜色
	},
	// 模块的 mutations 方法
	mutations: {
		SET_ACTIVE_TAB(state, val) {
			state.activeTab = val;
		},
		SET_USER_INFO(state, info = {}) {
			state.userInfo = info;
			state.userName = info?.username || '';
		},
	},
	// 模块的 actions 方法
	actions: {
		setActiveTab({
			commit
		}, val) {
			commit('SET_ACTIVE_TAB', val);
		},
		setUserInfo({
			commit
		}, obj) {
			commit('SET_USER_INFO', obj);
		},
		logout({
			commit
		}) {
			commit('SET_USER_INFO', null);
			uni.clearStorageSync() //清除所有缓存
		}
	},
	// 模块的 getters 属性
	getters: {}
};