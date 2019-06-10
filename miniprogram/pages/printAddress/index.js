import { $init, $digest } from '../../utils/common.util'
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{
      address_show: 0,
      address_name:"",
      address_phone:-1,
      address_region: "",
      address_detail:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this);
    this.data.address.address_show = app.globalData.userAddress[0].address_id;
    this.data.address.address_name=app.globalData.userAddress[0].address_name;
    this.data.address.address_phone=app.globalData.userAddress[0].address_phone;
    this.data.address.address_region=app.globalData.userAddress[0].address_region;
    this.data.address.address_detail=app.globalData.userAddress[0].address_detail;
    $digest(this);
  },

  confirmAddress: function(){
    console.log(this.data);
    if (this.data.address.address_name===""
      || this.data.address.address_phone <100
      || this.data.address.address_region === ""
      || this.data.address.address_detail === ""){
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
      }
    else {
      app.globalData.userAddress[0].address_id = 1;
      app.globalData.userAddress[0].address_name = this.data.address.address_name;
      app.globalData.userAddress[0].address_phone = this.data.address.address_phone;
      app.globalData.userAddress[0].address_region = this.data.address.address_region;
      app.globalData.userAddress[0].address_detail = this.data.address.address_detail;
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  getPerson: function (e) {
    var val = e.detail.value;
    this.data.address.address_name = val;
    $digest(this);
  },
  getPhone: function (e) {
    var val = e.detail.value;
    this.data.address.address_phone = Number(val);
    $digest(this);
  },
  getRegion: function (e) {
    var val = e.detail.value;
    this.data.address.address_region = val;
    $digest(this);
  },
  getDetail: function (e) {
    var val = e.detail.value;
    this.data.address.address_detail = val;
    $digest(this);
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