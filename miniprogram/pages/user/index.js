import { $init, $digest } from '../../utils/common.util'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    albumsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this);
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
    var albumCovers=[];
    app.globalData.myAlbums.forEach(function(album){
      albumCovers.push({
        id: album.albumId,
        img: album.albumPages[0],
        name: album.albumTitle,
      })
    })
    this.setData({
      albumsList: albumCovers
    })
    $digest(this)
  },

  onAlbumClick:function(e){
    app.globalData.currentAlbumId = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '../albumDetail/index',
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  goTop: function (t) {
    this.setData({
      scrollTop: 0
    });
  },

  scroll: function (t) {
    this.setData({
      indexSearch: t.detail.scrollTop
    }), t.detail.scrollTop > 300 ? this.setData({
      floorstatus: !0
    }) : this.setData({
      floorstatus: !1
    });
  },

  showMyOrder: function(){
    wx.navigateTo({
      url: '../userOrder/index',
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