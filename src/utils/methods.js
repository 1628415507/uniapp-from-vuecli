/*
 * @Description: 
 * @Date: 2023-08-25 18:27:51
 * @LastEditTime: 2023-08-29 16:49:06
 */
//时间格式化(time,date)
export const formatterTime = (timestamp, type = 'time') => {
	const date = new Date(timestamp);
	const year = date.getFullYear(); // 获取年份
	const month = date.getMonth() + 1; // 获取月份（注意月份从0开始，需要加1）
	const day = date.getDate(); // 获取日期
	if (type === 'date') {
		const formattedTime = `${year}-${month}-${day}`;
		console.log('【 formattedTime 】-166', formattedTime)
		return formattedTime
	} else {
		const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); // 获取小时
		const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); // 获取分钟
		const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); // 获取秒钟
		const formattedTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
		console.log('【 formattedTime 】-166', formattedTime)
		return formattedTime
	}

}
// 扫描
export const getScanVal = () => {
	console.log('getScanVal')
	// 调用uni扫一扫的方法， 允许从相机和相册扫码
	uni.scanCode({
		scanType: ['qrCode'], //条形码
		success: (res) => {

			// console.log('scanCode', res)
			// TODO:取值
			// if (res.errMsg == "scanCode:ok") {
			// 	const val = res.result
			// 	//  this.$set(原数组, 索引值, 需要赋的值)
			// 	uni.navigateTo({
			// 		url: `/pages/sub-packages/sign-in/index`
			// 	});
			// } else {
			// 	console.log("未识别到二维码，请重新尝试！")
			// 	uni.$u.toast('未识别到二维码，请重新尝试！')
			// }
		}
	});
}