import { $init, $digest } from '../../utils/common.util'
let app = getApp()
var categories = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumId: -1,
    albumPageNum: 0,
    albumTitle: "",
    albumCover:"",
    order_total_price: 98.80,
    order_pay_price:98.80,
    express_price: 0.00,
    categoryList:{},
    address_show: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    $init(this);
    this.data.albumId = app.globalData.currentAlbumId;
    $digest(_this);
    console.log(_this.data.albumId);
    app.globalData.myAlbums.forEach(function(album){
      if (album.albumId === _this.data.albumId){
        console.log(album);
        _this.data.albumPageNum = album.albumPages.length;
        _this.data.albumTitle = album.albumTitle;
        _this.data.albumCover = album.albumPages[0];
        $digest(_this);
      }
    })
    this.requestCategories();
  },
  editAddress: function(){
    wx.navigateTo({
      url: '../printAddress/index',
    })
  },

  requestCategories: function (){
    categories["封面"] = [];
    categories["封面"].push({ value: "200g", selected: true });
    categories["封面"].push({ value: "200g", selected: false });
    categories["内页"] = [];
    categories["内页"].push({ value: "128g", selected: true });
    categories["内页"].push({ value: "157g", selected: false });
    categories["工艺"] = [];
    categories["工艺"].push({ value: "常规不覆膜", selected: true });
    categories["工艺"].push({ value: "封面覆哑膜", selected: false });
    this.data.categoryList = categories;
    $digest(this);
  },

  submitOrder: function () {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { 
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '../userOder/index',
        })
      },
      fail(res) { 
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '../userOder/index',
        })
      }
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
    this.data.address_show = app.globalData.userAddress[0].address_id;
    $digest(this);
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