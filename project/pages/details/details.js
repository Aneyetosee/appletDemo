// pages/details/details.js
const api = require("../../api/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    goodsInfo:[],
    indicatorDots: true,//指示点
    autoplay: true,//自动播放
    interval: 5000,
    duration: 1000,
    circular: true//是否采用衔接滑动
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //获取商品id
    let shoppingid = option.shoppingId
    var _this = this
    wx.request({
      url: api.ip + api.details,
      method:"post",
      data:{
        shoppingid:shoppingid
      },
      success(resp){
        resp.data.data[0].shippingPic_one = "http://172.17.4.213:9999" + resp.data.data[0].shippingPic_one
        resp.data.data[0].shippingPic_two = "http://172.17.4.213:9999" + resp.data.data[0].shippingPic_two
        _this.setData({
           goodsInfo: resp.data.data
        })
      }
    })
  },
  addCart:function(e){
    var shoppingCart = e.currentTarget.dataset.shoppingcart
    let _this=this
    var user = ""
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user = res.data
        wx.request({
          url: api.ip + api.shoppingCart,
          method: "post",
          data: {
            shippingId: shoppingCart.shippingId,
            user: user
          },
          success(resp) {
            if (resp.data.returnCode==200){
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
            }
            else if (resp.data.returnCode == -1){
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    })
    
  },
  enterCart:function(){
    wx.reLaunch({
      url: '../shoppingCart/shoppingCart'
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