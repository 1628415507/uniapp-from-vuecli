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
// 任务详情
export function taskDetail(data) {
	return request({
		url: '/task/detail',
		method: 'get',
		data
	})
}

// 更新任务节点
export function updateNode(data) {
	return request({
		url: '/task/nodeUpdate',
		method: 'post',
		data
	})
}
// 签收
export function signedNode(data) {
	return request({
		url: '/task/signed',
		method: 'post',
		data
	})
}

// 签收
export function uploadFile(data) {
	return request({
		url: '/dip-imp-psm/filesystem/uploadFile',
		method: 'post',
		data
	})
}
export function getAttachmentInfo(data) {
	return request({
		url: '/dip-imp-psm/filesystem/getAttachmentInfo',
		method: 'get',
		data,
	})
}
// 根据文件key下载分享文件
export function getFile(fileKey) {
	return request({
		url: `/dip-imp-psm/share/filesystem/downloadFile/${fileKey}`,
		method: 'get',
	})
}