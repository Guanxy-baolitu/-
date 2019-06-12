// pages/chooseImage/index.js
import {
  $init,
  $digest
} from '../../utils/common.util'
let app = getApp();
var newAlbum;
var currentPageIdx=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initedImg: false,
    initedSize : false,
    imageFilePaths: [],
    albumName: "",
    localImageSizes: {},
    canvasWidth:0,
    canvasHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addImage();
    $init(this);
  },
  getAlbumName: function(e) {
    var val = e.detail.value;
    this.data.albumName = val;
    $digest(this);
  },

  addImage: function() {
    var _this = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        _this.data.imageFilePaths = _this.data.imageFilePaths.concat(res.tempFilePaths);
        _this.data.initedImg = true;
        $digest(_this);
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  deleteImage: function(e) {
    const idx = e.currentTarget.dataset.key
    this.data.imageFilePaths.splice(idx, 1)
    $digest(this);
  },

  //由系统bindLoad调用
  getImgSize: function(e) {
    var imgPath = e.currentTarget.dataset.value;
    var _that = this;
    _that.data.localImageSizes[imgPath] = {
      width: e.detail.width,
      height: e.detail.height
    };
    var supposeCompleted = true;
    Object.keys(_that.data.localImageSizes).forEach(function(imagePath){
      if (_that.data.localImageSizes.width == 0 || _that.data.localImageSizes.height==0)
        supposeCompleted=false;
    })
    _that.data.initedSize = supposeCompleted
    $digest(this);
  },

  handleImagePreview(e) {
    console.log(e);
    const idx = e.currentTarget.dataset.key
    var _this = this;
    wx.previewImage({
      current: _this.data.imageFilePaths[idx], //当前预览的图片
      urls: _this.data.imageFilePaths, //所有要预览的图片
    })
  },

  uploadAndMakeAlbum: function() {
    // if (albumName === "") {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '请输入相册名称',
    //   })
    //   return;
    // }
    wx.showLoading({
      title: '请稍候...',
    });
    let that = this;
    newAlbum = {
      albumId: app.globalData.myAlbums.length,
      albumTitle: that.data.albumName,
      albumPages: [app.globalData.officialTemplates[0].cover]
    }
    that.drawPageOnCanvas(0)
      .then((newPagePath) => {
        
      })
  },

  drawPageOnCanvas: function(imgIdx) {
    return new Promise((resolve, reject) => {
      let that = this;
      var imgPath = that.data.imageFilePaths[imgIdx];
      var ctx = wx.createCanvasContext(imgPath); //绘图上下文
      var _template = app.globalData.officialTemplates[app.globalData.currentTemplate];
      this.data.canvasWidth = _template.width;
      this.data.canvasHeight = _template.height
      $digest(that);
      // Step 0: 定位模板页
      var width = that.data.localImageSizes[imgPath].width;
      var height = that.data.localImageSizes[imgPath].height;
      var imgRatio = height / width;
      var _page;
      for (var i = 0; i < _template.templatePages.length; ++i) { //计数器而已
        currentPageIdx = (currentPageIdx == _template.templatePages.length - 1) ? 0 : currentPageIdx + 1;
        _page = _template.templatePages[currentPageIdx];
        if (imgRatio < _page.maxRatio && imgRatio > _page.minRatio) break;
        else {
          _page = _template.templatePages[currentPageIdx];
        }
      }
      // Step 1: 画底图
      if (_page.bgd !== "")
        ctx.drawImage(_page.bgd, 0, 0, _template.width, _template.height);
      // Step 2: 把src(覆盖))的左上的left,top,源图像的矩形选择框的宽度，源图像的矩形选择框的高度,画在背景的位置
      var frameWidth = _page.fwidth;
      var frameHeight = _page.fheight;
      var frameRatio = frameHeight / frameWidth;
      var taller = imgRatio > frameRatio ? true : false;
      if (_page.mode == "aspectFill") {
        if (taller){//照片竖长，上下边剪掉
          var expectedHeight = width * frameRatio;
          ctx.drawImage(imgPath, 0, (height - expectedHeight) / 2, width, expectedHeight, _page.left, _page.top, _page.fwidth, _page.fheight);
        }
        else {//照片横宽，左右边剪掉
          var expectedWidth = height / frameRatio;
          ctx.drawImage(imgPath, (width - expectedWidth) / 2, 0, expectedWidth, height, _page.left, _page.top, _page.fwidth, _page.fheight);
        }
      }
      else if (_page.mode == "center"){
        if (taller) {//照片竖长，压缩后左右留宽
          var expectedFrameW = frameHeight / imgRatio;
          ctx.drawImage(imgPath, 0, 0, width, height, (frameWidth - expectedFrameW) / 2 + _page.left, _page.top, expectedFrameW, _page.fheight);
        }
        else{//照片横长，上下留高
          var expectedFrameH = frameWidth * imgRatio;
          ctx.drawImage(imgPath, 0, 0, width, height, _page.left, (frameHeight - expectedFrameH) / 2 + _page.top, _page.fwidth, expectedFrameH);
        }
      }
      // Step 3: 画png装饰 
      if (_page.cover!=="")
        ctx.drawImage(_page.cover, 0, 0, _template.width, _template.height);
      ctx.draw(false, function(e) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: imgPath,
          success: function (res) {
            wx.hideLoading();
            let newPagePath = res.tempFilePath;
            newAlbum.albumPages.push(newPagePath);
            console.log(newAlbum.albumPages);
            if (newAlbum.albumPages.length == that.data.imageFilePaths.length + 1) {
              app.globalData.currentAlbumId = newAlbum.albumId;
              app.globalData.myAlbums.push(newAlbum);
              wx.redirectTo({
                url: '../albumDetail/index',
              })
            }
            else{
              wx.showLoading({
                title: '制作' + (imgIdx + 1) + '/' + that.data.imageFilePaths.length,
              });
              that.drawPageOnCanvas(imgIdx+1);
            }
          },
          fail: function(res) {
            wx.hideLoading();
            wx.showToast({
              icon: 'none',
              title: '失败，未知错误',
            })
            console.log(res);
          }
        })
      });
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