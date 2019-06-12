//app.js
App({
  globalData: {
    currentTemplate: -1,
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
        template: 0,
        cover: "../../images/templates/1_cover.png",
        width: 945,
        height:756,
        templatePages: [
          {
            maxRatio: 1.1,
            minRatio: 0.0,
            bgd: "../../images/templates/3_1.png",
            cover: "../../images/templates/3_1.png",
            mode: "aspectFill",
            left: 160,
            top: 86,
            fwidth: 628,
            fheight: 580
          },
          {
            maxRatio: 1000,
            minRatio: 1.45,
            bgd: "../../images/templates/3_2.png",
            cover: "../../images/templates/3_2.png",
            mode: "aspectFill",
            left: 405,
            top: 0,
            fwidth: 485,
            fheight: 756
          },
          {
            maxRatio: 1.45,
            minRatio: 1.25,
            bgd: "../../images/templates/3_3.png",
            cover: "../../images/templates/3_3.png",
            mode: "aspectFill",
            left: 105,
            top: 105,
            fwidth: 408,
            fheight: 546
          }
        ],
        name: "模板-白"
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
