/*
 * @Description:字典
 * @Date: 2022-12-05 16:00:44
 * @LastEditTime: 2023-08-29 16:14:31
 */

import {
	dictsConfig
} from '@/store/modules/dictionary/config.js' // 获取字典字段配置

/**
 * @Description 获取字典的下拉列表
 * @return 数组[]
 * @param dicName 字典名称
 * @param type 值类型，默认字符串
 * @param config 其他配置参数
 * @example console.log("this.$dict.getDictOptions('YES_OR_NO') ", getDictOptions('YES_OR_NO'))
 */
const getDictOptions = (dicName, type = '', config = {}) => {
	const dictsStorage = uni.getStorageSync('dicts') // 从缓存中获取字典数据
	// console.log('【 dictsStorage 】-19', dictsStorage)
	const dicts = JSON.parse(dictsStorage) || {}
	let list = dicts[dicName] || []
	// console.log('【 getDictOptions 】-17', dicName, list)
	// 将key值转换成数字类型，默认字符串类型
	if (type === 'number') {
		list = list.map(item => {
			const val = item[dictsConfig.code]
			const isNumber = !isNaN(parseFloat(val)) && isFinite(val); // 判断是否能转为数字
			isNumber && (item[dictsConfig.code] = Number(val))
			return item
		})
	}
	// 将指定元素（比如'其他'）放到最后一个
	const lastSortCode = config.lastSortCode || ''
	if (lastSortCode) {
		list.forEach((item, index) => {
			if (item[dictsConfig.code] === lastSortCode) {
				list.push(list.splice(index, 1)[0]);
			}
		})
	}
	return list
}

/**
 * @Description 根据code获取中文
 * @param code 匹配的值
 * @param prop 对应匹配值的字段名
 * @param targetProp 目标对象的字段，targetProp有值时，获取目标对象的该字段
 * @return 字符串
 * @example console.log("this.$dict.getDictNameByCode('YES_OR_NO','YES', 'nameEn') ", getDictNameByCode('YES_OR_NO', 'YES', 'nameEn'))
 */
const getDictNameByCode = (dicName, code, prop = '', targetProp) => {
	const dictsStorage = uni.getStorageSync('dicts')
	const dicts = JSON.parse(dictsStorage) || {}
	if (!code && code !== 0) {
		return ''
	}
	const list = dicts[dicName] || []
	const filterList = list.filter(item => {
		return item[prop || dictsConfig.code].toString() === code.toString()
	})
	const filterItem = filterList[0] || {}
	const name = targetProp ? filterItem[targetProp] : filterItem[dictsConfig.label]
	return name || ''
}

/**
 * @Description 根据字典名称获取对应的枚举对象
 * @return 对象 {}
 * @param dicName 字典名称
 * @param config {} 其他配置参数
 * @param config.type 值类型，默认为字符串类型
 * @param config.keyProp 对应key内容的字段名，默认为nameEn
 * @param config.valueProp 对应value内容的字段名，默认为code
 * @example console.log("this.$dict.getDictsEnum('YES_OR_NO')  ", getDictsEnum('YES_OR_NO',{type:'number'}))
 */
const getDictsEnum = (dicName, config = {}) => {
	// 获取配置项
	const configType = config.type || 'string' // 值默认为字符串类型
	const configKeyProp = config.keyProp || 'nameEn' // key的字段
	const configValueProp = config.valueProp || dictsConfig.code // 值的字段
	// 获取字典
	const dictsStorage = uni.getStorageSync('dicts')
	const dicts = JSON.parse(dictsStorage) || {}
	const dictItemList = dicts[dicName] || []
	console.log('【 getDictsEnum-dictItemList 】-85', dictItemList)
	if (!dictItemList.length) {
		return {}
	}
	// 获取枚举对象
	const item = {}
	dictItemList.forEach(dictItem => {
		const key = dictItem[configKeyProp]
		const val = dictItem[configValueProp] || ''
		const isNumber = !isNaN(parseFloat(val)) && isFinite(val);
		const value = configType === 'number' && isNumber ? Number(val) : val.toString()
		item[key] = value
	})
	console.log('【 getDictsEnum 】-49', dicName, item)
	return item || {}
}

export default {
	getDictOptions,
	getDictNameByCode,
	getDictsEnum
}