import {
  $init,
  $digest
} from '../utils/common.util'
var __that = null;
let app = getApp();

function init(that, album_cloudid) {
  __that = that;
  $init(__that);
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection('albums').where({
    _id: album_cloudid
  }).get({
    success: res => {
      var albumPages = [];
      albumPages.push(app.globalData.officialTemplates[res.data[0].template].cover);
      res.data[0].albumPages.forEach(function(page){
        albumPages.push(page);
      })
      __that.setData({
        albumName: res.data[0].albumName,
        albumPages: albumPages
      })
      wx.setNavigationBarTitle({
        title: res.data[0].albumName
      })
      $digest(__that);
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
}

module.exports = {
  init: init
}