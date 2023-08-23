// 字典相关的配置信息
export const dictsConfig = {
	label: 'text', // 字典项的nama的字段（与后端返回的字段对应）
	code: 'value' // 字典项的code的字段（与后端返回的字段对应）
}
// 转换成的格式
// {
//   'TEXT':[{},{}],
//   'TEXT1':[],
//   'TEXT2':[]
// }
// 对本地字典-进行数据格式转换
export const covertConstantDicts = (constantDicts) => {
	const constDicts = constantDicts;
	const res = {};
	for (const key in constDicts) {
		const dictItemList = constDicts[key];
		const list = dictItemList.map(dictItem => {
			const obj = {};
			obj[dictsConfig.code] = dictItem.code;
			obj[dictsConfig.label] = dictItem.name;
			return {
				...dictItem,
				...obj
			}
		})
		res[key] = list;
	}
	// console.log('【 res 】-204', res)
	return res;
};

// 对接口字典-进行数据格式转换（根据后端返回的字段调整)
export const covertAsyncDicts = (dicts) => {
	const res = {}
	for (const key in dicts) {
		const dictObj = dicts[key]
		const dictItemConfigDtoList = dictObj.dictItemConfigDtoList || []
		res[key] = dictItemConfigDtoList
  }
	return res
}