<!--
 * @Description: https://ext.dcloud.net.cn/plugin?id=4899
 * @Date: 2023-08-05 16:00:01
 * @LastEditTime: 2023-08-08 14:33:38
-->
<template>
	<view>
		<l-echart ref="chart" @finished="init"></l-echart>
	</view>
</template>
<script>
	import * as echarts from './echarts.min.js'
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
	export default {
		components: {
			LEchart
		},
		data() {
			return {
				option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['热度', '正面', '负面']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}],
					yAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}],
					series: [{
							name: '热度',
							type: 'bar',
							label: {
								normal: {
									show: true,
									position: 'inside'
								}
							},
							data: [300, 270, 340, 344, 300, 320, 310],
						},
						{
							name: '正面',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true
								}
							},
							data: [120, 102, 141, 174, 190, 250, 220]
						},
						{
							name: '负面',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'left'
								}
							},
							data: [-20, -32, -21, -34, -90, -130, -110]
						}
					]
				},
			};
		},
		// 组件能被调用必须是组件的节点已经被渲染到页面上
		// 1、在页面mounted里调用，有时候mounted 组件也未必渲染完成
		mounted() {
			// init(echarts, theme?:string, opts?:{}, chart => {})
			// echarts 必填， 非nvue必填，nvue不用填
			// theme 可选，应用的主题，目前只支持名称，如：'dark'
			// opts = { // 可选
			//  locale?: string  // 从 `5.0.0` 开始支持
			// }
			// chart => {} ， callback 返回图表实例
			this.$refs.chart.init(echarts, chart => {
				chart.setOption(this.option);
			});
		},
		// 2、或者使用组件的finished事件里调用
		methods: {
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		margin-top: 100px;
		width: 100%;
		height: 300px;
	}
</style>