// pages/movie-grid/movie-grid.js
//取得公用方法和数据
var { getData } = require('../../utils/util.js');
var { baseUrl } = getApp().globalData;

Page({
  data:{
		movieList:[],
		count:0,
		type:""
	},
  onLoad:function(options){
		this.data.type=options.type;
    // 页面初始化 options为页面跳转所带来的参数
		this.con_getData(options)
		
  },
	con_getData(){
		wx.showNavigationBarLoading();
		getData(`${baseUrl}/v2/movie/${this.data.type}?city=成都&start=${this.data.count+15}&count=15`, (data)=>{
			this.data.count += 15
			this.initData(data);
			wx.hideNavigationBarLoading();
			if(this.data.movieList.length >= data.total){
				wx.showToast({
					title: 'All Load',
					icon: 'success',
					duration: 2000
				})
			}
		});
	},
	initData(data){
		this.data.movieList = [
			...this.data.movieList , ...data.subjects
		]
		//设置导航条标题
		wx.setNavigationBarTitle({
			title: data.title
		})
		//更新view(类似于react)
		this.setData(this.data)
	},
	goToMovie(e){
		wx.navigateTo({
			url: `../movie-detail/movie-detail?movieid=${e.currentTarget.dataset.movieid}`
		})
	},
	
	onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})