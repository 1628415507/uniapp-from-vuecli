/*
 * @Description: 
 * @Date: 2023-08-03 16:42:41
 * @LastEditTime: 2023-08-31 09:46:16
 */

// 如果是vue-cli模式的项目，还需要在项目根目录的vue.config.js文件中进行如下配置：
// vue.config.js，如没有此文件则手动创建
module.exports = {
	transpileDependencies: ['uview-ui'],
	devServer: {
		proxy: {
			'/quotation': {
				target: 'http://172.16.6.246:8182', // 替换为你的后端服务器地址
				changeOrigin: true,
				logLevel: 'debug' // 添加此行，设置日志级别为debug
			},
			'/dict': {
				target: 'http://172.16.1.232:3000/mock/237', // 替换为你的后端服务器地址
				changeOrigin: true,
				logLevel: 'debug' // 添加此行，设置日志级别为debug
			}
		}
	}
};