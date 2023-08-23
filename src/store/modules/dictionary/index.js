/*
 * @Description: 
 * @Date: 2023-08-05 09:35:19
 * @LastEditTime: 2023-08-05 09:47:22
 */
import {
	covertAsyncDicts
} from './config.js'; // 字典配置
import {
	constantDictsObj
} from './constantDicts' // 引入本地字典
import {
	asyncDictsKeys
} from './asyncDicts' // 接口需要请求的字典
import {
	getDictRowList
} from '@/apis/login.js'

// 设置变量
const state = {
	dicts: {} // 字典
}

// 同步操作
const mutations = {
	// 设置字典
	SET_DICTS(state, dicts = {}) {
		console.log('【 dicts 】-20', dicts)
		state.dicts = dicts;
		if (dicts) {
			uni.setStorageSync('dicts', JSON.stringify(dicts));
		}
	}
}

// 异步操作
const actions = {
	setDicts({
		commit
	}) {
		return new Promise((resolve) => {
			if (asyncDictsKeys.length) {
				// 调接口
				const dictStr = asyncDictsKeys.join(',')
				getDictRowList({
					dictCode: dictStr
				}).then(res => {
					const constantDicts = constantDictsObj
					const _res = res.data
					const asyncDicts = _res //covertAsyncDicts(_res)
					const dicts = {
						...constantDicts,
						...asyncDicts
					}
					commit('SET_DICTS', dicts)
					resolve(dicts)
				}).catch(() => {
					resolve()
				})
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}