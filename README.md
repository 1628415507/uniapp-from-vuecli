<!--
 * @Date: 2022-10-13 16:31:42
 * @LastEditTime: 2023-08-17 17:52:58
 * @Description: 
-->
# uniapp-from-vuecli
## 已有配置如下
- 安装node-sass：`npm i node-sass -D`
- 安装sass-loader：`npm i sass-loader -D`
- 安装uview：`npm install uview-ui`(cli创建的需要用vue.config.js再次引入)
- 已配置vuex、vuex-persistedstate
- 已配置http
- 引入echarts包：src\uni_modules\lime-echart
  - 避免包太大，echarts.min.js放分包中，且目前只引入了常用的直线图、柱状图、饼图，如需要其他图表需重新定制引入
  - 定制地址：https://echarts.apache.org/zh/builder.html（当前版本5.4.3）

## 各分支说明
- init：初始化分支
- develop：开发分支
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
