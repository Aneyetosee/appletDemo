// pages/shouye/shouye.js
const api=require("../../api/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    tuijian: [],
    indicatorDots: true,//指示点
    autoplay: true,//自动播放
    interval: 5000,
    duration: 1000,
    circular: true//是否采用衔接滑动
  },
  goodsDetails:function(e){
    //传递的商品id
    var shoppingid = e.currentTarget.dataset.shoppingid
    wx.navigateTo({
      url: '../details/details?shoppingId='+shoppingid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    wx.request({
      url: api.ip + api.shouye,
      method:"post",
      data:{},
      success(resp){
          for (let i = 0; i < resp.data.data[0].length; i++) {
            resp.data.data[0][i] = "http://172.17.4.213:9999" + resp.data.data[0][i]
          }
        for (let i = 0; i < resp.data.data[1].length; i++) {
          resp.data.data[1][i].shippingPic_one = "http://172.17.4.213:9999" + resp.data.data[1][i].shippingPic_one
          resp.data.data[1][i].shippingPic_two = "http://172.17.4.213:9999" + resp.data.data[1][i].shippingPic_two
        }
        _this.setData({
          imgUrls: resp.data.data[0],
          tuijian: resp.data.data[1]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})