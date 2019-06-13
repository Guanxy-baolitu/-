App({
  globalData: {
    currentTemplate: -1,
    currentAlbumId:-1,
    swiperTemplates:[],
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
    this.globalData.myAlbums = []
    this.globalData.officialTemplates= [
      {
        template: 0,
        cover: "../../images/templates/1_cover.png",
        width: 945,
        height: 756,
        templatePages: [
          {
            maxRatio: 1.1301,
            minRatio: 0.0,
            bgd: "../../images/templates/1_1.png",
            cover: "",
            mode: "center",
            left: 125,
            top: 70,
            fwidth: 680,
            fheight: 625
          },
          {
            maxRatio: 1000,
            minRatio: 1.45,
            bgd: "",
            cover: "../../images/templates/1_2.png",
            mode: "aspectFill",
            left: 405,
            top: 0,
            fwidth: 485,
            fheight: 756
          },
          {
            maxRatio: 1.4501,
            minRatio: 1.13,
            bgd: "",
            cover: "../../images/templates/1_3.png",
            mode: "aspectFill",
            left: 105,
            top: 105,
            fwidth: 408,
            fheight: 546
          }
        ],
        name: "模板-白"
      },
      {
        template: 1,
        cover: "../../images/templates/2_cover.png",
        width: 945,
        height: 756,
        templatePages: [
          {
            maxRatio: 1.1301,
            minRatio: 0.0,
            bgd: "../../images/templates/2_1.png",
            cover: "",
            mode: "center",
            left: 125,
            top: 70,
            fwidth: 680,
            fheight: 625
          },
          {
            maxRatio: 1000,
            minRatio: 1.45,
            bgd: "",
            cover: "../../images/templates/2_2.png",
            mode: "aspectFill",
            left: 405,
            top: 0,
            fwidth: 485,
            fheight: 756
          },
          {
            maxRatio: 1.4501,
            minRatio: 1.13,
            bgd: "",
            cover: "../../images/templates/2_3.png",
            mode: "aspectFill",
            left: 105,
            top: 105,
            fwidth: 408,
            fheight: 546
          }
        ],
        name: "模板-黑"
      },
      {
        template: 2,
        cover: "../../images/templates/3_cover.png",
        width: 945,
        height:756,
        templatePages: [
          {
            maxRatio: 1.1301,
            minRatio: 0.0,
            bgd: "../../images/templates/3_1.png",
            cover: "",
            mode: "center",
            left: 125,
            top: 70,
            fwidth: 680,
            fheight: 625
          },
          {
            maxRatio: 1000,
            minRatio: 1.45,
            bgd: "",
            cover: "../../images/templates/3_2.png",
            mode: "aspectFill",
            left: 405,
            top: 0,
            fwidth: 485,
            fheight: 756
          },
          {
            maxRatio: 1.4501,
            minRatio: 1.13,
            bgd: "",
            cover: "../../images/templates/3_3.png",
            mode: "aspectFill",
            left: 105,
            top: 105,
            fwidth: 408,
            fheight: 546
          }
        ],
        name: "模板-红"
      }
    ]
    this.globalData.swiperTemplates = [
      {
        template: 1,
        title: "时光",
        height: 650,
        images: ["https://s2.ax1x.com/2019/06/12/VW0vuV.png",
          "https://s2.ax1x.com/2019/06/12/VW0L3n.png",
          "https://s2.ax1x.com/2019/06/12/VW0Xj0.png",
          "https://s2.ax1x.com/2019/06/12/VW0zHU.png"
          ]
      },
      {
        template: 1,
        title: "金婚",
        images: [
          "https://s2.ax1x.com/2019/06/12/VWBpEF.png",
          "https://s2.ax1x.com/2019/06/12/VW0q9s.png",
          "https://s2.ax1x.com/2019/06/12/VW0Ocq.png",
          "https://s2.ax1x.com/2019/06/12/VW0Hhj.png",
          ]
      },
      {
        template: 3,
        title: "在路上",
        images: [
          "https://s2.ax1x.com/2019/06/13/VWySMR.jpg",
          "https://s2.ax1x.com/2019/06/13/VWyMeP.jpg",
          "https://s2.ax1x.com/2019/06/13/VWyAiD.jpg",]
      },
      {
        template: 2,
        title: "远行的足迹",
        images: [
          "https://s2.ax1x.com/2019/06/13/VWyps1.jpg",
          "https://s2.ax1x.com/2019/06/13/VWy9qx.jpg",
          "https://s2.ax1x.com/2019/06/13/VWyEJe.jpg"
          ]
      }
    ];
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
