var PreviewJS = require("../../views/preview.js")
let app = getApp();
Page({
  data: {
    albumId:0,
    isGuest : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      albumId:options.album_cloudid
    })
    PreviewJS.init(_this, options.album_cloudid);
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid;
        if (res.result.openid != options.openid)
          _this.setData({
            isGuest:true
          })
      },
      fail: err => {
        console.error("openid获取失败")
      }
    })
  },
  onPrintClick: function () {
    wx.navigateTo({
      url: '../print/index?album_cloudid=' + this.data.albumId + '&albumPageNum=' + this.data.albumPages.length + '&albumTitle=' + this.data.albumTitle + '&albumCover=' + this.data.albumPages[1]
    })
  },
  onShareAppMessage: function (res) {
    var _that = this;
    var shareObj = {
      title: _that.data.albumTitle,
      path: '/pages/albumDetail/index?album_cloudid=' + _that.data.albumId + '&openid=' + app.globalData.openid,
      imageUrl: _that.data.albumPages[0]
    }
    return shareObj;
  },
  makeAlso : function(){
    wx.redirectTo({
      url: '/pages/album/index',
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
})