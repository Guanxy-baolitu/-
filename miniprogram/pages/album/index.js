let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    templateList: []
  },
  onLoad: function (options) {
    this.setData({
      templateList: app.globalData.officialTemplates
    })
  },
  chooseImage: function (e) {
    app.globalData.currentTemplate = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '../chooseImage/index'
    })
  },
  goTop: function (t) {
    this.setData({
      scrollTop: 0
    });
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
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