//时间格式化
export const formatterTime = (timestamp) => {
	const date = new Date(timestamp);
	const year = date.getFullYear(); // 获取年份
	const month = date.getMonth() + 1; // 获取月份（注意月份从0开始，需要加1）
	const day = date.getDate(); // 获取日期
	const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); // 获取小时
	const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); // 获取分钟
	const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); // 获取秒钟
	const formattedTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	console.log('【 formattedTime 】-166', formattedTime)
	return formattedTime
}