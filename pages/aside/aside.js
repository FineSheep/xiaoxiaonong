// miniprogram/pages/aside/aside.js
const { wxMethod, dbOperation } = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeList:
          [
            {
                shootSrc: '../../images/test_icon.png',
                storeName: '商店1',
                distance: '58',
                tabs: [
                    '全场六折',
                    '当季热卖',

                ]

            },
            {
                shootSrc: '../../images/test_icon.png',
                storeName: '商店2',
                distance: '8',
                tabs: [
                    '全场六折',
                    '当季热卖',

                ]

            },
            {
              shootSrc: '../../images/test_icon.png',
              storeName: '商店3',
              distance: '18',
              tabs: [
                  '全场六折',
                  '当季热卖',

              ]

          }

        ] 

    },
    goStoreHome(e){
        console.log(e);
        const {store}=e.currentTarget.dataset;
        wxMethod.toPage('../storeHome/storeHome',{storeData:store});
    },
    navigationInit() {
        const obj = {
            title: '附近商家',
            bgColor: '#6495ED'
        };
        wxMethod.setNavigationBar(obj);
    },
    chooseLocation() {
        wx.chooseLocation({
            success:(res)=>{
                console.log(res);
            },
            fail:(err)=>{
                console.log(err);
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {



    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wxMethod.getLocation(this);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.navigationInit();
       
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
        wxMethod.checkNetwork();
        wxMethod.refresh(this);
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