import { $init, $digest } from '../utils/common.util'
var __that = null;
let app = getApp();
function init(that) {
  __that = that;
  $init(__that);
  app.globalData.myAlbums.forEach(function (album) {
    if (album.albumId === app.globalData.currentAlbumId) {
      __that.setData({
        albumPages: album.albumPages
      })
      $digest(__that);
    }
  })
}

module.exports = {
  init: init
}