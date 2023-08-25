/*
 * @Description: 分页公共方法
 * @Date: 2023-08-24 18:26:36
 * @LastEditTime: 2023-08-25 10:57:31
 // */
// 区域滚动
// <scroll-view :scroll-y="true" :style="{height: 'calc(100vh - 265rpx)'}" :enable-back-to-top="true"
// 		@scrolltolower="scrollToLower" :scroll-top="scrollTop" @scroll="scroll">

// <!-- 上拉加载更多 -->
// 		<u-loadmore @loadmore="getDataList" :status="loadStatus" :loading-text="loadingText"
// 			:loadmore-text="loadmoreText" :nomore-text="nomoreText" margin-top="30" />

const pageMixin = {
	data() {
		return {
			// 分页
			currentPage: 1,
			pageSize: 10,
			lastPage: 1,
			// 加载状态
			loadStatus: "loadmore",
			loadingText: '努力加载中',
			loadmoreText: '上拉或点击加载更多',
			nomoreText: '没有更多了',
			//  scroll-view：区域滚动
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			isRequested: false, //是否请求完列表数据
		}
	},
	// pages.json中配置的原生下拉刷新 "enablePullDownRefresh": true
	async onPullDownRefresh() {
		this.current = 1
		this.getDataList(true)
		this.goTop()
		this.isRequested && wx.stopPullDownRefresh() // 停止当前页面加载动画。
	},
	methods: {
		// 分页处理
		pageStatus(resLength, listLength) {
			// console.log('【 resLength, listLength 】-18', resLength, listLength)
			if (resLength === this.pageSize) {
				// 接收的数据等于pageSize
				this.currentPage++
				this.loadStatus = "loadmore"
			}

			if (resLength < this.pageSize) {
				// 接收的数据 小于分页配置
				this.loadStatus = "nomore"
				if (listLength === 0) {
					// 总数据等于0
					this.nomoreText = "暂无数据"
				} else {
					this.nomoreText = "没有更多了"
				}
			}
		},
		// scroll-view：滚动时触发
		scroll(e) {
			this.old.scrollTop = e.detail.scrollTop
		},
		// scroll-view：滚动到顶部
		goTop() {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop
			this.$nextTick(() => {
				this.scrollTop = 0
			});
		},
		//  scroll-view：滚动到底部
		scrollToLower() {
			console.log('滚动到底');
			if (this.loadStatus === 'nomore') return
			this.getDataList();
		},
	}
}
export default pageMixin