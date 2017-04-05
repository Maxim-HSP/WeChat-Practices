//微信提供的工具：格式化时间和数字
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//自写的公用方法
function getData(url,callback){
	wx.request({
		url:url,
		header:{'content-type':'application/xml'},
		success:(res) =>{
			callback(res.data)
		}
	})
}

//将这些工具(方法)的接口暴露
module.exports = {
  formatTime: formatTime,
	getData
}
