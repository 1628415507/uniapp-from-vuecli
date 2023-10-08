/*
 * @Description:
 * @Date: 2023-08-03 16:42:41
 * @LastEditTime: 2023-10-08 09:57:43
 */
const url = 'http://172.16.2.187:8182';
// 如果是vue-cli模式的项目，还需要在项目根目录的vue.config.js文件中进行如下配置：
// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['uview-ui'],
    devServer: {
        proxy: {
            // '/': {
            // 	target: 'http://172.16.2.187:8182', // 替换为你的后端服务器地址
            // 	changeOrigin: true,
            // 	logLevel: 'debug' // 添加此行，设置日志级别为debug
            // },
            // 报价管理
            '/dip-spp-spp-lrm': {
                target: 'http://172.16.2.187:8182', // 替换为你的后端服务器地址
                // target: 'http://172.16.2.52:8182', // 家庚
                changeOrigin: true,
                logLevel: 'debug', // 添加此行，设置日志级别为debug
                pathRewrite: {
                    '^/dip-spp-spp-lrm': ''
                }
            },
            // 基础数据
            '/dip-spp-mdm-mdm': {
                target: 'http://172.16.2.187:8183', // 替换为你的后端服务器地址
                // target: url,
                changeOrigin: true,
                logLevel: 'debug', // 添加此行，设置日志级别为debug
                pathRewrite: {
                    '^/dip-spp-mdm-mdm': ''
                }
            }
        }
    }
};
