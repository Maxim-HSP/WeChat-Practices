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

function http(url, callback) {
    wx.request({
        url, //仅为示例，并非真实的接口地址
        header: {
            'content-type': 'application/json'
        }, //设置请求的header修改为xml
        success: function (res) {
            callback(res.data)
        }
    })
}

module.exports = {
    formatTime: formatTime,
    http
}
