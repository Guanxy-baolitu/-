// pages/chooseImage/index.js
import { $init, $digest } from '../../utils/common.util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageFilePaths: [],
    albumName :""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    $init(this);
    this.addImage();
  },
  getAlbumName: function (e) {
    var val = e.detail.value;
    this.data.albumName = val;
    $digest(this);
  },

  addImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.data.imageFilePaths = _this.data.imageFilePaths.concat(res.tempFilePaths);
        $digest(_this);
        console.log(_this.data);
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  deleteImage: function(e){
    const idx = e.currentTarget.dataset.key
    this.data.imageFilePaths.splice(idx, 1)
    $digest(this);
  },

  handleImagePreview(e) {
    console.log(e);
    const idx = e.currentTarget.dataset.key
    var _this = this;
    wx.previewImage({
      current: _this.data.imageFilePaths[idx],  //当前预览的图片
      urls: _this.data.imageFilePaths,  //所有要预览的图片
    })
  },

  uploadAndMakeAlbum: function() {
    wx.showLoading({
      title: '制作中',
    });
    imageFilePaths.forEach(function(filePath) {
      // 上传图片
      const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res)
          app.globalData.fileID = res.fileID
          app.globalData.cloudPath = cloudPath
          app.globalData.imagePath = filePath
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
        },
        complete: () => {
          wx.hideLoading();
          wx.redirectTo({
            url: '../showGuest/index',
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})