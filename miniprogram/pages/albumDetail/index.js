var PreviewJS = require("../../views/preview.js")
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumId:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    PreviewJS.init(_this);
  },
  onPrintClick : function(){
    wx.navigateTo({
      url: '../print/index',
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '我的第一本相册',
      path: '/page/shareGuest/index?id=-1'
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