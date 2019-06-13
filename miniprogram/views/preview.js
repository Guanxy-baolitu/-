import {
  $init,
  $digest
} from '../utils/common.util'
var __that = null;
let app = getApp();

function init(that, album_cloudid) {
  __that = that;
  $init(__that);
  if (album_cloudid == "") {
    fillAlbumPages(app.globalData.tmpAlbum, app.globalData.currentTemplate);
    return;
  }
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection('albums').where({
    _id: album_cloudid
  }).get({
    success: res => {
      console.log(res);
      fillAlbumPages(res.data[0], res.data[0].template);
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

function fillAlbumPages(album, tmplate){
  var albumPages = [];
  albumPages.push(app.globalData.officialTemplates[tmplate].cover);
  album.albumPages.forEach(function (page) {
    albumPages.push(page);
  })
  __that.setData({
    albumTitle: album.albumTitle,
    albumPages: albumPages
  })
  wx.setNavigationBarTitle({
    title: album.albumTitle
  })
  console.log(__that);
  $digest(__that);
}

module.exports = {
  init: init
}