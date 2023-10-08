/*
 * @Description:
 * @Date: 2023-08-03 17:43:19
 * @LastEditTime: 2023-10-08 10:00:08
 */
import request from '@/utils/http';
import prefix from './prefix.js';
// 登录
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
        // isForm: true,
        // header:{}
    });
}

export function getDictRowList(data) {
    return request({
        // baseUrl: 'http://172.16.1.232:3000/mock/237',
        url: prefix.base_data + '/dict/getDictRowList',
        method: 'get',
        data
    });
}
