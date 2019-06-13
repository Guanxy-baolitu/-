//index.js
const app = getApp()
Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    swiperList:[]
  },
  onReady: function (res) {
  },
  onLoad: function() {
    this.setData({
      swiperList: app.globalData.swiperTemplates
    })
    if (!wx.cloud) {
      wx.showToast({
        title: '无法登录',
        icon:"none"
      })
      return
    }
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error("openid获取失败")
      }
    })
  },
  useTemplate: function (e) {
    app.globalData.currentTemplate = e.target.dataset.value;
    wx.navigateTo({
      url: '../chooseImage/index'
      // url: '../shareGuest/index?id='+app.globalData.currentAlbumId
    })
  },
})
