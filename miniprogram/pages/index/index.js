//index.js
const app = getApp()
var base64img = require("base64img.js")
Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    swiperList:[
      {
        template: 1,
        title: "示例一",
        images: [base64img.img1,base64img.img2]
      },
      {
        template: 2,
        title: "示例二",
        images: [
          'http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg',
          'http://lady.people.com.cn/NMediaFile/2018/1116/MAIN201811160658000371115355865.jpg'
        ]
      },
      {
        template: 3,
        title: "示例一",
        images: [
          'http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg',
          'http://lady.people.com.cn/NMediaFile/2018/1116/MAIN201811160658000371115355865.jpg'
        ]
      },
      {
        template: 3,
        title: "示例一",
        images: [
          'http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg',
          'http://lady.people.com.cn/NMediaFile/2018/1116/MAIN201811160658000371115355865.jpg'
        ]
      }
    ]
  },
  onReady: function (res) {
  },
  onLoad: function() {
    this.setData({
      current: 0
    })
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
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
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
})
