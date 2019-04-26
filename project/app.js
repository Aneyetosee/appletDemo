//app.js
var api =require("./api/api.js")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var appid = "wx90ccb49a6d4da093"
          var secret = "e8e31463ca85dbe9e308d56231085c6b"
          var js_code=res.code
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret +"&js_code="+js_code+"&grant_type=authorization_code",
            method:"post",
            data:{
              code: js_code
            },
            success(res){
              if (res.data.openid) {
                wx.setStorageSync('user',res.data.openid)
              }
            }
          })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
            
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})