// pages/movie/movie.js
//取得公用方法和数据
var { getData } = require('../../utils/util.js');
var { baseUrl } = getApp().globalData;

Page({
//	data:require('./moviesData.js'),
  data:{
		in_theaters:{},
		coming_soon:{},
		top250:{},
		
		isInput:false,
		isResult:false,
		searchText:"",
		searchHistory:[],
		resultList:[],
		count:0
	},
	on_input(e){
		if(e.detail.value.length !== 0){
			this.setData({
				isInput : true
			})
		}else{
			this.setData({
				isInput : false,
				isResult: false
			})
		}
	},
	clear_search(){
		this.setData({
			isInput : false,
			isResult: false,
			searchText : "",
		})
	},
	go_search(e){
		this.data.searchHistory.push(e.detail.value);
		this.go_result(e)
	},
	go_result(e){
		let q = e.currentTarget.dataset.name || e.detail.value;
		this.data.searchText = q;
		this.data.resultList = [];
		this.data.count = 0;
		this.con_getData();
	},
	con_getData(){
		wx.showToast({
			title: '载入中',
			icon: 'loading',
			mask: true,
			duration: 5000
		})
		getData(`${baseUrl}/v2/movie/search?q=${this.data.searchText}&start=${this.data.count}&count=15`,(data)=>{
			wx.hideToast();
			if(this.data.resultList.length >= data.total){
				wx.showToast({
					title: '已无更多数据',
					icon: 'success',
					mask: true,
					duration: 1500
				})
			}
			this.data.resultList = [
				...this.data.resultList , ...data.subjects
			];
			this.data.count += 15;
			this.data.isResult = true;
			this.data.isInput = false;
			this.setData(this.data)
		})
	},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
		wx.showNavigationBarLoading();
		getData(`${baseUrl}/v2/movie/in_theaters?city=成都&start=0&count=5`, (data)=>{
			this.initData(data,"in_theaters")
			wx.hideNavigationBarLoading();
		});
		getData(`${baseUrl}/v2/movie/coming_soon?start=0&count=5`, (data)=>{
			this.initData(data,"coming_soon")
		});
		getData(`${baseUrl}/v2/movie/top250?start=0&count=5`, (data)=>{
			this.initData(data,"top250")
		});
  },
	//对请求到的原生数据进行二次处理，内容依据业务而定
	initData(data,key){
		this.data[key] = data;
		this.data[key].type = key;
		//更新view(类似于react)
		this.setData(this.data)
	},
	goToGrid(e){
		wx.navigateTo({
			url: `../movie-grid/movie-grid?type=${e.currentTarget.dataset.type}`
		})
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