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
