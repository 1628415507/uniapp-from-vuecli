/*
 * @Description:
 * @Date: 2023-08-28 10:16:40
 * @LastEditTime: 2023-10-08 10:02:20
 */
import request from '@/utils/http';
import prefix from './prefix.js';

// 首页-列表
export function getList(data) {
	return request({
		url: prefix.quoted_manage + '/quotation/page',
		method: 'get',
		data
	});
}

// 报价弃标
export function abandoningBid(data) {
	return request({
		url: prefix.quoted_manage + '/quotation/abandonment',
		method: 'post',
		data
	});
}
// 详情
export function quotationDetail(data) {
	return request({
		url: prefix.quoted_manage + '/quotation/detail',
		method: 'get',
		data
	});
}

// 保存报价
export function quotationSave(data) {
	return request({
		url: prefix.quoted_manage + '/quotation/save',
		method: 'post',
		data
	});
}