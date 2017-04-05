// pages/info/movie/movie.js
let {
	http
} = require("../../../utils/util.js")

let {
	globalData
} = getApp()

Page({
	data: {
		showHot:true,
		movies: [],
		offset: 0,
		limit: 10,
		scrollHeight: "",
		loading: true
	},
	onLoad: function (options) {
		// 页面初始化 options为页面跳转所带来的参数
		this.loadFilms();
		wx.getSystemInfo({
			success: (res) => {
				this.setData({
					scrollHeight: res.windowHeight
				})
			}
		})
	},
	toHot(){
		this.setData({showHot:true})
	},
	toComing(){
		this.setData({showHot:false})
	},
	initData(data) {
		this.data.movies = [...this.data.movies, ...data.map((item) => {
			return {
				late: item.late,
				showInfo: item.showInfo,
				img: item.img,
				nm: item.nm,
				sc: item.sc,
				rt: item.rt,
				star: item.star,
				cat: item.cat,
				wish: item.wish,
				imax: item.imax,
				preSale: item.preSale,
				id: item.id,
				"3d": item["3d"]
			}
		})];
		this.data.loading = false;
		wx.hideNavigationBarLoading();
		this.setData(this.data)
	},
	onClickMovie(e) {
		wx.navigateTo({
			url: `/pages/info/movie/movie-details/movie-details?movieid=${e.currentTarget.dataset.movieid}`
		})
	},
	clickBuy(e) {
		wx.navigateTo({
			url: `/pages/info/studio/studio?movieid=${e.currentTarget.dataset.movieid}&nm=${e.currentTarget.dataset.nm}`
		})
	},
	scrollLower() {
		this.setData({
			loading: true
		})
		this.loadFilms();
	},
	loadFilms() {
		var baseUrl = globalData.baseUrl;
		var URL = `${baseUrl}/movie/list.json?type=hot&offset=${this.data.offset}&limit=${this.data.limit}`;
		this.data.offset += 10;
		wx.showNavigationBarLoading();
		http(URL, (data) => {
			if (data.data.movies.length != "0") {
				this.initData(data.data.movies)
			} else {
				this.data.loading = false;
				wx.hideNavigationBarLoading();
				this.setData(this.data)
				wx.showToast({
					title: '全部加载完成',
					icon: 'success',
					duration: 1000
				})
			}
		});
	}
})
