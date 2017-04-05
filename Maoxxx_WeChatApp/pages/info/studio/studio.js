// pages/info/studio/studio.js
let {
    http
} = require("../../../utils/util.js")

let {
    globalData
} = getApp()

Page({
    data: {
        studio: [],
        movieid:""
        
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            movieid:options.movieid
        })
        wx.setNavigationBarTitle({
            title: options.nm
        })
        this.loadFilms();
    },
    loadFilms() {
        var baseUrl = globalData.baseUrl;
        var URL = `${baseUrl}/cinemas.json`
        http(URL, (data) => {
            this.initData(data.data["金牛区"])
        })
    },
    initData(data){
        var dist = 1;
        this.data.studio = [...data.map((item)=>{
            dist+=1
            return {
                nm:item.nm,
                sellPrice:item.sellPrice,
                addr:item.addr,
                deal:item.deal,
                sell:item.sell,
                imax:item.imax,
                dis:dist,
                id:item.id
            }
        })];
        this.setData(this.data);
    },
    toTheater(e){
        wx.navigateTo({
            url: `/pages/info/theater/theater?cinemaid=${e.currentTarget.dataset.cinemaid}&movieid=${this.data.movieid}`
        })
    }
})
