import request from '@/utils/http'
// 首页-列表
export function getList(data) {
	return request({
		url: '/quotation/page',
		method: 'get',
		data
	})
}

// 报价弃标
export function abandoningBid(data) {
	return request({
		url: '/quotation/abandonment',
		method: 'post',
		data
	})
}
// 详情
export function quotationDetail(data) {
	return request({
		url: '/quotation/detail',
		method: 'get',
		data
	})
}

// 保存报价
export function quotationSave(data) {
	return request({
		url: '/quotation/save',
		method: 'post',
		data
	})
}