<!--
 * @Description: 高德地图DEMO
 * @Date: 2023-08-05 17:16:32
 * @LastEditTime: 2023-08-18 18:41:14
-->
<template>
	<view>
		<view class="map_container">
			<map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" :show-location="true"
				:markers="markers" bindmarkertap="markertap">
			</map>
		</view>
		<view class="map_text">
			<text class="h1">{{textData.name}}</text>
			<text>{{textData.desc}}</text>
		</view>
	</view>
</template>
<script>
	import amap from "@/libs/amap-wx.js";
	const iconPath = '@/static/image/icons/location.png'
	export default {
		data() {
			return {
				AMap: null,
				markersData: [],
				// 打点
				markers: [{
					iconPath: require('@/static/image/icons/location.png'),
					id: 0,
					latitude: 24.445676,
					longitude: 118.082745,
					width: 33,
					height: 33
				}, {
					iconPath: require('@/static/image/icons/location.png'),
					id: 0,
					latitude: 30.445676,
					longitude: 118.082745,
					width: 33,
					height: 33
				}],
				latitude: '',
				longitude: '',
				textData: {},
				amapKey: this.$store.state.user.amapKey
			}
		},
		mounted() {
			// console.log('【 amapKey 】', this.amapKey)
			this.AMap = new amap.AMapWX({
				key: this.amapKey
			});
			this.getPoiAround()
			this.getRegeo() //获取自己所在地址的定位
		},
		methods: {
			// 检索周边的POI
			getPoiAround() {
				this.AMap.getPoiAround({
					// iconPathSelected: require(iconPath), //如：..­/..­/img/marker_checked.png
					// iconPath: require(iconPath), //如：..­/..­/img/marker_checked.png
					success: (data) => {
						console.log('【 getPoiAround 】-40', data)
						this.markersData = data.markers;
						const markersData = this.markersData;
						// this.markers = markersData
						// this.showMarkerInfo(markersData, 0);
					},
					fail: (info) => {
						wx.showModal({
							title: info.errMsg
						})
					}
				})
			},
			// 获取自己所在地址的定位
			getRegeo() {
				console.log('【 amap.getRegeo 】-61', )
				this.AMap.getRegeo({
					success: (res) => {
						console.log('【 获取自己所在地址的定位 】-66', res)
						const curPosition = res[0] || {}
						this.latitude = curPosition.latitude
						this.longitude = curPosition.longitude
						this.textData = {
							name: curPosition.name,
							desc: curPosition.desc
						}
					},
					//失败回调
					fail: function(info) {
						console.log(info)
					}
				})
			},
			//得到点击的marker的id，遍历markers数组，判断有没有相等的id
			//如果有的就能从this.poisdatas[i].address得到坐标位置（没有就提醒下）
			markertap(e) {
				console.log('【 markertap 】-64', e)
				const id = e.markerId;
				this.showMarkerInfo(this.markersData, id);
				this.changeMarkerColor(this.markersData, id);
			},
			showMarkerInfo(data, i) {
				this.textData = {
					name: data[i].name,
					desc: data[i].address
				}
			},
			changeMarkerColor(data, i) {
				const markers = [];
				for (let j = 0; j < data.length; j++) {
					if (j == i) {
						data[j].iconPath = require(iconPath);
					} else {
						data[j].iconPath = require(iconPath);
					}
					markers.push(data[j]);
				}
				// this.markers = markers
			}
		}
	}
</script>

<style>
	.map_container {
		position: absolute;
		top: 0;
		bottom: 80px;
		left: 0;
		right: 0;
	}

	.map {
		width: 100%;
		height: 100%;
	}

	.map_text {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0px;
		height: 80px;
		background: #fff;
		padding: 0 15px;
	}

	text {
		margin: 5px 0;
		display: block;
		font-size: 12px;
	}

	.h1 {
		margin: 15px 0;
		font-size: 15px;
	}
</style>