/*
 * @Description: 环境配置
 * @Date: 2023-08-28 09:24:49
 * @LastEditTime: 2023-08-29 17:00:13
 */
let baseUrl
// 开发环境
if (process.env.NODE_ENV === 'development') {
 console.log('【 开发环境 】-10' )
 baseUrl = 'http://172.16.1.232:3000/mock/249'
// const baseUrl = 'http://172.16.6.246:8181' //路径前缀
// baseUrl: 'https://example.com', //mock路径前缀
// baseUrl: 'https://mocktset.com', //mock路径前缀
}else{
	baseUrl = 'https://example.com'//线上地址
}

export default {
	baseUrl
}