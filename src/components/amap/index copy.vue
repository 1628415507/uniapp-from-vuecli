<!--
 * @Description: 
 * @Date: 2023-08-05 17:16:32
 * @LastEditTime: 2023-08-07 09:54:29
-->

<template>
	<view class="map">
		<map id="map_container" :latitude="latitude" :longitude="longitude" scale="11" :markers="markers"
			:show-location="true" @markertap="markertap" @updated='mapUpdated' @tap='closeMapMarker'></map>
	</view>
	<!-- <view>
		<view class="map_container">
			<map class="map" name="" longitude="{{longitude}}" latitude="{{latitude}}" scale="16" show-location="true">
			</map>
		</view>
		<view class="map_text">
			<text class="h1">{{textData.name}}</text>
			<text>{{textData.desc}}</text>
		</view>
	</view> -->
</template>
<script>
	// const amapFile = require('@src/libs/amap-wx.js');
	import amap from "@/libs/amap-wx.130.js"
	export default {
		// import引入的组件需要注入到对象中才能使用
		components: {},
		props: {
			title: {
				type: String,
				default: '',
			}
		},
		data() {
			// 这里存放数据
			return {
				textData: {},
				amapPlugin: null,
				latitude: 23.130061,
				longitude: 113.264499,
				markers: [],
				mapInfo: [],
			}
		},

		// 监听属性 类似于data概念
		computed: {},

		// 监控data中的数据变化
		watch: {},

		// 生命周期 - 创建完成（可以访问当前this实例）
		onLoad(options) {
			console.log('【 amap 】-41')
			this.amapPlugin = new amap.AMapWX({
				key: '21d1f020389645ee420d864b9c20b70d'
			});
			this.amapPlugin.getRegeo({
				type: 'gcj02', //map 组件使用的经纬度是国测局坐标， type 为 gcj02
				success: (res) => {
					const latitude = res[0].latitude;
					const longitude = res[0].longitude;
					this.longitude = longitude;
					this.latitude = latitude;
					this.mapInfo = res[0];
					console.log('【 data 】-41', data)
					// 保存位置的描述信息（ longitude经度 latitude纬度 和位置信息）
					// this.textData.name = data[0].name;
					// this.textData.desc = data[0].desc //将获取的信息保存
					// this.setData({
					// 	textData: this.textData,
					// 	longitude: data[0].longitude,
					// 	latitude: data[0].latitude,
					// 	// 🎈给该经度纬度加上icon做标记， 并调节大小
					// 	markers: [{
					// 		latitude: data[0].latitude,
					// 		longitude: data[0].longitude,
					// 		height: 30,
					// 		width: 35,
					// 		// iconPath: '../../imgs/locationIcon/site1.png'
					// 	}]
					// })
				},
				fail: function(info) {
					console.log("get Location fail",info);
				}
			});
		},

		// 生命周期 - 页面展示（不可以访问DOM元素）
		onShow() {},

		// 生命周期 - 挂载完成（可以访问DOM元素）
		onReady() {
			// console.log('【 amapFile 】-43', amapFile)
			// // 创建地图实例
			// window._AMapSecurityConfig = {
			// 	securityJsCode: '21d1f020389645ee420d864b9c20b70d'
			// }

			// const map = new AMap.Map('map', {
			//   zoom: 10,
			//   center: [116.397428, 39.90923]
			// });
			// // 添加标记
			// const marker = new AMap.Marker({
			//   position: [116.397428, 39.90923],
			//   title: '北京市'
			// });
			// marker.setMap(map);
		},

		// 存放方法事件 - 会在数据变化时被调用
		methods: {
			markertap() {
				for (var i = 0; i < this.markers.length; i++) {
					if (JSON.stringify(e).substring(18, 20) == this.markers[i].id) {
						console.log("markers" + this.poisdatas[i].name + "   " + this.poisdatas[i].address);
						uni.showToast({
							title: this.poisdatas[i].name,
							mask: false,
							duration: 1500
						});
					}
				}
			},
			mapUpdated() {},
			closeMapMarker() {},
		}
	}
</script>

<style lang='scss' scoped>
	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	#map_container {
		width: 100%;
		height: 100%;
	}
</style>