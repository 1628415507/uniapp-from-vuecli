/*
 * @Description: 
 * @Date: 2023-08-21 09:41:56
 * @LastEditTime: 2023-08-21 11:03:20
 */

// index.js

// import Mock from 'mockjs';

// // 使用 mockjs 的 API 生成模拟数据
// Mock.mock('dispatch/list?dispatchStatus=EXECUTING', 'get', {
// 	name: 'John Doe',
// 	age: 25,
// 	hobbies: ['reading', 'writing', 'coding']
// });

const Mock = require('better-mock/dist/mock.mp.js')

// Mock.setup({
// 	timeout: '600',
// })
const dispatchList = () => {
	console.log('【 dispatchList 】-8')
	return {
		code: 200,
		msg: 'success',
		data:  {
			"symbol": "RESULT_SYMBOL",
			"success": true,
			"data": [{
					"taskStationList": [{
							"stationDatetime": "1989-09-30 01:27:20",
							"stationType": "UNLOAD",
							"stationName": "深圳龙湖分拨中心"
						},
						{
							"stationDatetime": "2018-11-08 09:36:38",
							"stationName": "厦门吉联分拨中心",
							"stationType": "UNLOAD"
						},
						{
							"stationName": "厦门吉联分拨中心",
							"stationDatetime": "1976-12-28 21:10:06",
							"stationType": "UNLOAD"
						},
						{
							"stationName": "厦门吉联分拨中心",
							"stationDatetime": "2021-02-06 05:21:25",
							"stationType": "LOAD"
						}
					],
					"overallNextTaskStatusName": "culpa laborum enim",
					"overallTaskStatusName": "commodo sint",
					"planTotalQty": 86.51,
					"overallTaskStatus": "dolore et proident esse",
					"dispatchNo": "CN091231231",
					"createTime": "1989-01-18 08:22:09",
					"planTotalWeight": 34.44,
					"planTotalVolume": 34.44,
					"overallNextTaskStatus": "sunt amet",
					"dispatchType": "ex aute veniam dolor cillum",
					"mtsDispatchId": 80828441
				},
				{
					"planTotalWeight": 35.9347,
					"overallNextTaskStatusName": "culpa ut occaecat",
					"overallTaskStatus": "nulla mollit laboris do velit",
					"dispatchNo": "ipsum",
					"planTotalVolume": 50.8342,
					"mtsDispatchId": 64467654,
					"taskStationList": [{
							"stationType": "LOAD",
							"stationName": "ex ad ullamco ut",
							"stationDatetime": "2003-04-29 12:05:09"
						},
						{
							"stationDatetime": "2011-09-03 04:58:58",
							"stationName": "est nulla dolore",
							"stationType": "UNLOAD"
						}
					],
					"planTotalQty": 45.35,
					"overallNextTaskStatus": "laborum",
					"createTime": "1989-09-23 22:25:53",
					"dispatchType": "sint",
					"overallTaskStatusName": "dolore"
				}
			]
		}
	}
}
Mock.mock('/dispatch/list?dispatchStatus=EXECUTING', 'get', dispatchList())