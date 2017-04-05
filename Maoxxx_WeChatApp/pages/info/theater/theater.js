// pages/info/theater/theater.js
let {
    http
} = require("../../../utils/util.js")

let {
    globalData
} = getApp()

Page({
    data: {
        theater:{},
        showDate:"",
        cinemaid:"",
        movies:{},
        movieid:""
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        //cinemaid: "11148", "movieid ": "247658"
        console.log(options)
        this.setData({
            cinemaid:options.cinemaid,
            movieid:options.movieid 
        })
        this.loadFilms();
    },
    loadFilms() {
        var baseUrl = globalData.baseUrl;
        http(`${baseUrl}/movie/${this.data.movieid}.json`,(data)=>{
            this.initMovie(data.data.MovieDetailModel)
        });
        var URL = `${baseUrl}/showtime/wrap.json?cinemaid=${this.data.cinemaid}&movieid=${this.data.movieid}`
        http(URL, (data) => {
            this.initData(data.data)
        })
    },
    initData(data){
        this.data.theater = data;
        this.data.showDate = data.Dates[0].slug;
        this.setData(this.data);
        console.log(this.data)
    },
    initMovie(data){
        this.data.movies.nm = data.nm;
        this.data.movies.sc = data.sc;
        this.data.movies.dur = data.dur;
        this.data.movies.cat = data.cat;
        this.data.movies.dir = data.dir;
        this.setData(this.data)
    },
    changeTime(e){
        this.setData({
            showDate:e.currentTarget.dataset.time
        })
    },
    chooseSeat(e){
        wx.navigateTo({
            url: `/pages/info/seats/seats?showId=${e.currentTarget.dataset.showid}&showDate=${this.data.showDate}`
        })
    }
})
