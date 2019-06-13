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
    currentMode : 0,
    page_price: [1.80,4.20],
    cover_price: [5.00, 12.00],
    express_price: 5.00,
    categoryList:{},
    address_show: 0,
    order_pay_price:0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    $init(this);
    this.data.albumId = options.album_cloudid;
    _this.data.albumPageNum = options.albumPageNum;
    _this.data.albumTitle = options.albumTitle;
    _this.data.albumCover = options.albumCover;
    $digest(_this);
    this.requestCategories();
    this.calculate();
  },
  editAddress: function(){
    wx.navigateTo({
      url: '../printAddress/index',
    })
  },

  requestCategories: function (){
    categories["工艺"] = [];
    categories["工艺"].push({ value: "标准版", selected: true });
    categories["工艺"].push({ value: "豪华版", selected: false });
    this.data.categoryList = categories;
    $digest(this);
  },

  tapCat: function (event) {
    var key = event.target.dataset.key;
    var value = event.target.dataset.value;
    var same = false;
    categories[key].forEach(function (item) {
      if (item.value === value && item.selected === true) same = true;
      item.selected = false;
    });
    categories[key].forEach(function (item) {
      if (item.value === value) { item.selected = true; }
    });
    if (same === true) return;
    this.data.currentMode = value=="标准版"?0:1;
    this.calculate();
    $digest(this);
  },

  calculate: function(){
    this.data.order_pay_price = (this.data.albumPageNum-1) * this.data.page_price[this.data.currentMode] + this.data.cover_price[this.data.currentMode];
    if (this.data.address_show) this.data.order_pay_price += this.data.express_price;
    this.data.order_pay_price = "" + this.data.order_pay_price.toFixed(2);
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
          url: '../userOrderDetail/index',
        })
      },
      fail(res) { 
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '../userOrderDetail/index',
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