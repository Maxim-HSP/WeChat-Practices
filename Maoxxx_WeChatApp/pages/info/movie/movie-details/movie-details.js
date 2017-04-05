// pages/info/movie/movie-details/movie-details.js
let {
    http
} = require("../../../../utils/util.js")

let {
    globalData
} = getApp()

Page({
	data: {
		films: {},
		hcmts:[],
		total:"",
		movieid:"",
		hiddenText:true,
	},
	onLoad: function (options) {
		// 页面初始化 options为页面跳转所带来的参数
		this.setData({
				movieid:options.movieid
		})
		this.loadFilms();
	},
	loadFilms() {
		var baseUrl = globalData.baseUrl;
		var URL = `${baseUrl}/movie/${this.data.movieid}.json`;
		wx.showNavigationBarLoading();
		http(URL, (data) => {
			this.initData(data.data)
		});
	},
	initData(data){
		this.data.films = data.MovieDetailModel;
		this.data.films.rank = Math.floor(Math.random()*10+1);
		this.data.films.first_rank = Math.floor(Math.random()*10000+1);
		this.data.films.rank_all = Math.floor(10000+Math.random()*60000);
		this.data.films.dra = this.data.films.dra.replace("<p>","");
		this.data.films.dra = this.data.films.dra.replace("</p>","");
		this.data.films.image = [...data.MovieDetailModel.photos.map((item)=>{
			return {
				img:item.replace("/w.h/","/"),
				curimg:this.data.films.img,
				dir:this.data.films.dir
			}
		})];
		this.data.hcmts = [...data.CommentResponseModel.hcmts];
		this.data.total = data.CommentResponseModel.total;
		this.setData(this.data);
		console.log(this.data);
		wx.hideNavigationBarLoading();
	},
	clickBuy(){
		wx.navigateTo({
			url: `/pages/info/studio/studio?movieid=${this.data.movieid}&nm=${this.data.films.nm}`
		})
	},
	clickText(){
		this.setData({
			hiddenText:!this.data.hiddenText
		})
	}
})
