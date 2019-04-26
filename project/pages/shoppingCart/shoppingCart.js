// pages/shoppingCart/shoppingCart.js
const api = require("../../api/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingCartArr:[],
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this
      var user = ""
      wx.getStorage({
        key: 'user',
        success: function (res) {
          user = res.data
          wx.request({
            url: api.ip + api.shoppingCartData,
            method: "post",
            data: {
              user: user
            },
            success(resp) {
              for (let i = 0; i < resp.data.data.length; i++) {
                resp.data.data[i].shippingPic_one = "http://172.17.4.213:9999" + resp.data.data[i].shippingPic_one
                resp.data.data[i].checked=false;
              }
              _this.setData({
                shoppingCartArr: resp.data.data
              })
            }
          })
        }
      })
    },
  goShouye:function(){
    wx.switchTab({
      url:"../shouye/shouye"
    })
  },
  del:function(e){
    var shippingId = e.currentTarget.dataset.shopid
    var user = ""
    var _this = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user = res.data
        wx.request({
          url: api.ip + api.delshoppingCartData,
          method: "post",
          data: {
            shippingId: shippingId,
            user: user
          },
          success(resp) {
            if (resp.data.returnCode == 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
              for (let i = 0; i < resp.data.data.length; i++) {
                resp.data.data[i].shippingPic_one = "http://172.17.4.213:9999" + resp.data.data[i].shippingPic_one;
                resp.data.data[i].checked = false;
              }
              console.log(resp.data.data)
              _this.setData({
                shoppingCartArr: resp.data.data
              })
            }
          }
        })
      }
    })
  },
  totalPrice:function(){
    let price=0
    for (let i = 0; i < this.data.shoppingCartArr.length; i++){
      if (this.data.shoppingCartArr[i].checked){
        price += this.data.shoppingCartArr[i].shippingPrice * this.data.shoppingCartArr[i].shippingNum
      }
    }
    this.setData({
      totalPrice: price
    })
  },
  checkboxChange:function(e){
    let shopID = e.currentTarget.dataset.shippingid
    for (let i=0;i<this.data.shoppingCartArr.length;i++){
      if (this.data.shoppingCartArr[i].shippingId == shopID){
       this.data.shoppingCartArr[i].checked = (this.data.shoppingCartArr[i].checked == false)
      }
    }
    this.totalPrice()
    this.setData({
      shoppingCartArr: this.data.shoppingCartArr,
      totalPrice: this.data.totalPrice
    })
  },
  //全选框
  changeBox:function(){
  
    this.data.shoppingCartArr.checked = !this.data.shoppingCartArr.checked
    this.setData({
      shoppingCartArr: this.data.shoppingCartArr
    })
    function ischeck(element, index, array) {
      return element
      console.log(element)
    }
    console.log(this.data.shoppingCartArr.every(ischeck))
  },
  jiesuan:function(){
    let arr=[]
    for (let i = 0; i < this.data.shoppingCartArr.length; i++) {
      let obj = {}
      if (this.data.shoppingCartArr[i].checked) {
        obj.shippingId = this.data.shoppingCartArr[i].shippingId
        obj.shippingNum = this.data.shoppingCartArr[i].shippingNum
        obj.shippingPrice = this.data.shoppingCartArr[i].shippingPrice
        arr.push(obj)
      }
      console.log(arr)
      if (i == this.data.shoppingCartArr.length-1){
        var _this = this
        var user = ""
        wx.getStorage({
          key: 'user',
          success: function (res) {
            user = res.data
            wx.request({
              url: api.ip + api.setorderData,
              method: "post",
              data: {
                user: user,
                shopArr: arr
              },
              success(resp) {
                if (resp.data.returnCode === 200) {
                  wx.navigateTo({
                    url: "../dingdan/dingdan?orderNum=" + resp.data.data.orderNum
                  })
                }
              }
            })
          }
        })
        
      }
    }
    
    
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