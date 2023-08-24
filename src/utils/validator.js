/*
 * @Description: 表单验证
 * @Date: 2023-08-05 11:40:24
 * @LastEditTime: 2023-08-24 17:52:46
 */
// 整数值
export const validIntNumber = (rule, value, callback) => {
	// // 上面有说，返回true表示校验通过，返回false表示不通过
	// // uni.$u.test.mobile()就是返回true或者false的
	if (!value) {
		callback(new Error('请输入值'));
	} else if (!uni.$u.test.digits(value)) {
		callback('请输入整数值')
	} else {
		callback()
	}
	// return uni.$u.test.digits(value)
}
// 非负浮点数值
export const validFloatNumber = (rule, value, callback) => {
	// 上面有说，返回true表示校验通过，返回false表示不通过
	// uni.$u.test.mobile()就是返回true或者false的
	const regNum = /^-?\d+(\.\d+)?$/;
	if (!value && value !== 0) {
		callback();
	} else if ((!regNum.test(value))) {
		callback(new Error('请输入数值'));
	} else if (value < 0) {
		callback('不允许输入负数2')
	} else {
		callback()
	}
	// return uni.$u.test.digits(value)
}