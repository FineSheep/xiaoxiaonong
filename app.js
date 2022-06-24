//app.js
const publicData = require('./utils/publicData');
const wxMethod = require('./utils/wxMethod');
const httpRequest = require('./utils/httpRequest');
const dbOperation = require('./utils/dbOperation');
App({
  //云端数据库操作模块
  dbOperation,
  //获取小程序公共数据
  publicData,
  //小程序方法模块
  wxMethod,
  //网络请求
  httpRequest,
  //全局变量
  globalData: {
    isLogin: false,
    // _id: '',
    // userInfo: {},
    // cart_list: [],
    // network: '',
    // stores: [],
    // userLocation: {},
  },
  onLaunch: function (options) {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-4gsihmqwaa0b03fc',
        traceUser: true,
      })
    };
    wxMethod.checkNetwork();
    wxMethod.getSystemInfo();


  },
  onShow: function () {
   
  }



})
