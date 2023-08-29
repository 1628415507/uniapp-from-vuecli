/*
 * @Description: 
 * @Date: 2023-08-03 17:43:19
 * @LastEditTime: 2023-08-29 09:26:08
 */
import request from '@/utils/http'
// 登录
export function login(data) {
	return request({
		url: '/login',
		method: 'post',
		data,
		// isForm: true,
		// header:{}
	})
}

export function getDictRowList(data) {
	return request({
		baseUrl: 'http://172.16.1.232:3000/mock/237',
		url: '/dict/getDictRowList',
		method: 'get',
		data
	})
}