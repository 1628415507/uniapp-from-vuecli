/*
 * @Description: 字典常量
 * @Date: 2022-12-05 15:59:25
 * @LastEditTime: 2023-08-05 09:39:17
 */
import { covertConstantDicts } from './config.js'; // 字典配置

// 启用禁用状态【公用】
const ENABLED_STATUS = [
  { code: 1, name: '启用', nameEn: 'ENABLE' },
  { code: 0, name: '禁用', nameEn: 'DISABLE' }
];
// 是否【公用】
const YES_OR_NO = [
  { code: 1, name: '是' , nameEn: 'YES'},
  { code: 0, name: '否' , nameEn: 'NO'}
];

// 导出所有字典对象
const constantDicts = {
  ENABLED_STATUS, // 启用禁用状态【公用】
  YES_OR_NO, // 是否【公用】
};

// 导出字典数组
export const constantDictsObj = covertConstantDicts(constantDicts);
