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
		url: '/dict/getDictRowList',
		method: 'get',
		data
	})
}