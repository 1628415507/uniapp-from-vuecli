const getters = {
	// 用户模块
	userName: state => state.user.userName,
	userInfo: state => state.user.userInfo,
	activeTab: state => state.user.activeTab,
	colorTheme: state => state.user.colorTheme,
	//其他模块
}
export default getters