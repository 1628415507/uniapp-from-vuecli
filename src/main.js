/*
 * @Description: 全局配置
 * @Date: 2023-08-03 16:08:19
 * @LastEditTime: 2023-08-03 17:24:11
 */
import Vue from 'vue'
// 组件
import App from './App'
import uView from "uview-ui";
// 样式
uni.$u.config.unit = 'rpx'//默认单位配置
// 工具库
import store from './store/index.js' // 全局参数
Vue.prototype.$store = store // 引入vuex
// 方法
import dictionary from './utils/dictionary' // 字典方法
Vue.prototype.$dict = dictionary;

Vue.use(uView)
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
