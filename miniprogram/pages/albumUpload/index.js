var PreviewJS = require("../../views/preview.js")
let app = getApp();
var cloudPages = [];
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
    PreviewJS.init(_this, "");
    _this.uploadNewAlbum(1);//不上传封面，而是用template
  },
  onPrintClick: function () {
    wx.navigateTo({
      url: '../print/index?album_cloudid=' + this.data.albumId + '&albumPageNum=' + this.data.albumPages.length + '&albumTitle=' + this.data.albumTitle + '&albumCover=' + this.data.albumPages[1]
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.albumTitle,
      path: '/page/shareGuest/index?album_cloudid=' + this.data.albumId + '&openid=' + app.globalData.openid,
      imageUrl: this.data.albumPages[0]
    }
  },

  uploadNewAlbum: function (imgIdx) {
    return new Promise((resolve, reject) => {
      if (imgIdx == 1) {
        wx.showToast({
          icon: "none",
          title: '正在进行相册备份，退出将无法保存...',
          duration: 150000000
        })
        cloudPages.length = 0;
      }
      let that = this;
      var filePath = app.globalData.tmpAlbum.albumPages[imgIdx-1];
      console.log(imgIdx);
      console.log(app.globalData.tmpAlbum);
      var leftIdx = filePath.lastIndexOf("/");
      var rightIdx = filePath.lastIndexOf(".");
      var pureFileName = filePath.substring(leftIdx + 1, rightIdx);
      // 上传图片
      const cloudPath = pureFileName + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          wx.hideToast();
          cloudPages.push(res.fileID);
          if (imgIdx < app.globalData.tmpAlbum.albumPages.length) { //继续上传
            wx.showToast({
              icon: "none",
              title: '已备份' + imgIdx + '/' + app.globalData.tmpAlbum.imageFilePaths.length,
              duration: 150000000
            })
            that.uploadNewAlbum(imgIdx + 1);
          } else { //全部完成
            that.writeIntoDatabase();
          }
        },
        fail: e => {
          wx.showToast({
            icon: 'none',
            title: '错误：已重试',
          })
          that.uploadNewAlbum(imgIdx);
        },
        complete: () => {
        }
      })
    })
  },

  writeIntoDatabase: function(){
    console.log(cloudPages);
    const db = wx.cloud.database()
    db.collection('albums').add({
      data: {
        albumTitle: app.globalData.tmpAlbum.albumTitle,
        template: app.globalData.currentTemplate,
        albumPages: cloudPages
      },
      success: res => {
        console.log(res);
        wx.showToast({
          icon: 'none',
          title: '备份完成！',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '数据库错误'
        })
        that.writeIntoDatabase();
      }
    })
  }
})