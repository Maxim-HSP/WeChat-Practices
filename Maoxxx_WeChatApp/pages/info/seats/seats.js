// pages/seats/seats.js
let {
	http
} = require("../../../utils/util.js")

let {
	globalData
} = getApp()

Page({
	data: {
		seats: {},
		showId: "",
		showDate: "",
		clickNum: 0,
		chSeat: [],
		allPrice:"",
		allNum:""
	},
	onLoad: function (options) {
		// 页面初始化 options为页面跳转所带来的参数
		this.setData({
			showId: options.showId,
			showDate: options.showDate
		})
		this.loadFilms();
	},
	loadFilms() {
		var	baseUrl = globalData.baseUrl;
		var URL = `${baseUrl}/show/seats?showId=${this.data.showId}&showDate=${this.data.showDate}`
		http(URL, (data) => {
			if(data.errMsg){
				wx.setNavigationBarTitle({
					title: data.errMsg.errMsg
				});
				wx.showModal({
					title: '错误',
					content: data.errMsg.errMsg,
					success: function(res) {
						if (res.confirm) {
							wx.navigateBack({
								delta: 1
							})
						}
					}
				})
				return
			}
			wx.setNavigationBarTitle({
				title: data.showInfo.movieName
			});
			this.setData({seats: data});
		})	
	},
	chooseSeat(e) {
		switch (e.currentTarget.dataset.pos.type) {
			case "N":
				this.selectSeat(e.currentTarget.dataset.pos);
				break;
			case "sel":
				this.chooseAble(e.currentTarget.dataset.pos);
				break;
		}
	},
	selectSeat(e) {
		if (this.data.clickNum <= 3) {
			this.data.clickNum += 1;
			var rowNum = e.rowNum - 1;
			var columnNum = e.columnNum;
			this.data.seats.sections["0"].seatRows[rowNum].seats[columnNum].type = "sel";
			this.data.chSeat.push({
				rowId:e.rowId,
				columnId:e.columnId,
				rowNum:rowNum,
				columnNum:columnNum
			});
			this.data.allNum = this.data.chSeat.length;
			this.data.allPrice = this.data.seats.showInfo.price * this.data.allNum;
			this.setData(this.data)
		} else {
			wx.showToast({
				title: '最多4张',
				duration: 1000
			})
		}
	},
	chooseAble(e) {
		this.data.clickNum--;
		var rowNum = e.rowNum - 1;
		var columnNum = e.columnNum;
		this.data.chSeat.forEach((item,index)=>{
			if(item.rowNum == rowNum && item.columnNum == columnNum){
				this.data.chSeat.splice(index,1)
			}
		});
		this.data.allNum = this.data.chSeat.length;
		this.data.allPrice = this.data.seats.showInfo.price * this.data.allNum;
		this.data.seats.sections["0"].seatRows[rowNum].seats[columnNum].type = "N";
		this.setData(this.data)
	},
	delSeats(e){
		this.data.clickNum--;
		var rowNum = e.currentTarget.dataset.item.rowNum;
		var columnNum = e.currentTarget.dataset.item.columnNum;
		this.data.chSeat.forEach((item,index)=>{
			if(item.rowNum == rowNum && item.columnNum == columnNum){
				this.data.chSeat.splice(index,1)
			}
		});
		this.data.allNum = this.data.chSeat.length;
		this.data.allPrice = this.data.seats.showInfo.price * this.data.allNum;
		this.data.seats.sections["0"].seatRows[rowNum].seats[columnNum].type = "N";
		this.setData(this.data)
	},
	affirmSeat(){
		this.data.chSeat.forEach((item)=>{
			this.data.seats.sections["0"].seatRows[item.rowNum].seats[item.columnNum].type = "LK"
		});
		this.data.clickNum = 0,
		this.data.chSeat = [],
		this.data.allPrice = "",
		this.data.allNum = ""
		this.setData(this.data);
	}
})
