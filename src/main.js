/*
 * @Author: Hongzf
 * @Date: 2022-10-13 16:30:02
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-14 13:56:19
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

Vue.use(uView)
uni.$u.config.unit = 'rpx'//默认单位配置

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
