/*
 * @Description: 参考：https://www.php.cn/faq/546267.html
 * @Date: 2023-08-03 17:35:50
 * @LastEditTime: 2023-08-03 18:26:40
 */
// import store from '@/store/index.js'
// import {
// 	getCookie
// } from '@/utils/util.js'
// 默认配置
const baseConfig = {
	baseUrl: 'https://dhltms.gillion.com.cn/dhl',//路径前缀
	timeout: 5 * 1000,
	header: {
		'Accept-Language': 'zh-CN' // store.state.Language === 0 ? 'zh-CN' : 'en-US',
	}
}
const http = ({ method, url, data = {}, header }) => {
	console.log('【 data 】-11', data)
	// if (store.state.isShowLoading) {
	// 	uni.showLoading({
	// 		title: '正在加载...',
	// 		mask: true
	// 	})
	// }
	// uni.addInterceptor()//请求拦截
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseConfig.baseUrl + url,
			method,
			data,
			// ContentType: 'application/json;charset-utf-8',
			// 请求头设置
			header: {
				...baseConfig.header,
				ContentType: 'application/json',
				// Cookie: uni.getStorageSync('Set-Cookie') ? uni.getStorageSync('Set-Cookie') : '',
				// Cookie: 'JSESSIONID=CE79C212A7E902EADFC3E0BC135E3FDC; gillion-res-version=202009180834; CASTGC=6e59a3ca-be0d-4ecb-8c5f-88727b4d9bd7',
				// Authorization: store.state.token ? `Bearer ${store.state.token}` : '',
				...header // 可重新配置头部
			},
			timeout: baseConfig.timeout, //请求超时
			// 成功的回调
			success: result => {
				// if (store.state.isShowLoading) {
				// 	uni.hideLoading()
				// }
				// 获取和保存登录接口的cookie
				// if (url.indexOf('login') > 0) {
				// 	// uni.setStorageSync('Set-Cookie', result.header['Set-Cookie']);
				// 	const cookie = result.header['Set-Cookie']
				// 	const cookieStr = getCookie(cookie)
				// 	cookieStr && uni.setStorageSync('Set-Cookie', cookieStr);
				// 	console.log('getCookie(cookie)====', url, cookieStr, cookie)
				// }
				const res = result.data.data || {} // 返回的数据
				console.log('http-result', result, res)
				switch (res.status) {
					case 200: // 请求成功
						resolve(res)
						break;
					default:
						if (res.message) {
							// console.log('message', res.message)
							uni.showToast({
								icon: 'none',
								title: res.message,
								duration: 2000
							})
						}
						reject(res)
				}
			},
			// 失败的回调
			fail: fail => {
				console.log('fail', fail)
				// if (store.state.isShowLoading) {
				// 	uni.hideLoading()
				// }
				let errMsg
				if (fail.errMsg.includes("timeout")) {
					errMsg = '请求超时，请稍后重试'
				} else if (fail.errMsg.includes("abort")) {
					errMsg = '请求数据错误，请重试'
				} else {
					errMsg = fail.errMsg || '请求失败'
				}
				uni.showToast({
					icon: 'none',
					title: errMsg,
					duration: 2000
				})
				reject(fail)
			},
			complete: () => {}
		})
	})
}

export default http