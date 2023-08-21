import request from '@/utils/http'
// 首页-列表
export function getList(data) {
	return request({
		url: '/dispatch/list',
		method: 'get',
		data
	})
}
// 装车详情-列表
export function getDetailList(data) {
	return request({
		url: '/dispatch/detail',
		method: 'get',
		data
	})
}