// 字典相关的配置信息
export const dictsConfig = {
  label: 'configName', // 字典项的nama的字段（与后端返回的字段对应）
  code: 'configCode' // 字典项的code的字段（与后端返回的字段对应）
}
// 转换成的格式
// {
//   'TEXT':[],
//   'TEXT1':[],
//   'TEXT2':[]
// }
// 转换数据格式
export const covertConstantDicts = (constantDicts) => {
  const constDicts = constantDicts;
  const res = {};
  for (const key in constDicts) {
    const dictItemList = constDicts[key];
    const list = dictItemList.map(dictItem => {
      const obj = {};
      obj[dictsConfig.code] = dictItem.code;
      obj[dictsConfig.label] = dictItem.name;
      return { ...dictItem, ...obj }
    })
    res[key] = list;
  }
  // console.log('【 res 】-204', res)
  return res;
};

// 转换数据格式
export const covertAsyncDicts = (dicts) => {
  const res = {}
  for (const key in dicts) {
    const dictObj = dicts[key]
    const dictItemConfigDtoList = dictObj.dictItemConfigDtoList || []
    res[key] = dictItemConfigDtoList
  }
  return res
}