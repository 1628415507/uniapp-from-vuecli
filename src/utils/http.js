/*
 * @Description: 参考：https://www.php.cn/faq/546267.html
 * @Date: 2023-08-03 17:35:50
 * @LastEditTime: 2023-08-24 18:13:53
 */
import config from './config.js'
// console.log('【 baseUrl 】-11', config, config.baseUrl)
// 默认配置
const baseConfig = {
	baseUrl: config.baseUrl, //路径前缀
	// baseUrl: 'http://172.16.6.246:8181', //路径前缀
	// baseUrl: 'http://172.16.6.246:8181', //路径前缀
	// baseUrl: 'https://example.com', //mock路径前缀
	// baseUrl: 'https://mocktset.com', //mock路径前缀
	timeout: 5 * 1000,
	header: {
		'Accept-Language': 'zh-CN' // 'zh-CN' 、 'en-US',
	}
}
const http = ({
	method,
	url,
	data = {},
	header
}) => {
	// console.log('【 data 】-11', data, (baseConfig.baseUrl || '') + url)
	// uni.addInterceptor()//请求拦截
	return new Promise((resolve, reject) => {
		uni.request({
			url: (baseConfig.baseUrl || '') + url,
			method,
			data,
			// ContentType: 'application/json;charset-utf-8',
			// 请求头设置
			header: {
				...baseConfig.header,
				ContentType: 'application/json',
				...header // 请求头部
			},
			// timeout: baseConfig.timeout, //请求超时
			// 成功的回调
			success: result => {
				const res = result.data || {} // 返回的数据
				// console.log('http-result', res)
				if (res.success) {
					resolve(res)
				} else {
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