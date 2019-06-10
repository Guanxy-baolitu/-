//app.js
App({
  globalData: {
    currentTemplate: 1,
    currentAlbumId:-1,
    officialTemplates:[],
    myAlbums: [],
    userAddress: []
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
    this.globalData.myAlbums = [
      {
        albumId: -1,
        albumTitle: "测试",
        albumPages: [
          "http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg", "http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg", "http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg", "http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg", "http://imgcache.fansyes.com/cnews/20181227/201812271111184009160.jpg"
        ]
      }
    ]
    this.globalData.officialTemplates= [
      {
        template: 1,
        img: "../../images/tabBar/cart.png",
        name: "模版一"
      },
      {
        template: 2,
        img: "../../images/tabBar/cate_on.png",
        name: "模版二"
      },
      {
        template: 3,
        img: "../../images/tabBar/user.png",
        name: "模版三"
      }
    ]
    this.globalData.userAddress = [];
    this.globalData.userAddress.push({
      address_id: 0,
      address_name: "",
      address_phone: -1,
      address_region: "",
      address_detail: ""
    })
  }
})
