// pages/movie-detail/movie-detail.js
//取得公用方法和数据
var { getData } = require('../../utils/util.js');
var { baseUrl } = getApp().globalData;

Page({
  data:{
		
	},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
		wx.showNavigationBarLoading();
		getData(`${baseUrl}/v2/movie/subject/${options.movieid}`,(data)=>{
			this.initData(data)
			wx.hideNavigationBarLoading();
			wx.setNavigationBarTitle({
				title: this.data.title
			})
			console.log(this.data)
		})
  },
	initData(data){
		this.data = data;
		//更新view(类似于react)
		this.setData(this.data)
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