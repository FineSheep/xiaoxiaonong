// miniprogram/pages/userInfo/userInfo.js

const { wxMethod, httpRequest } = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        userInfo: {
            avatarUrl: '../../images/user_headshoot_init.png',
            nickName: 'root',
            gender: '男',
            age: '18',
            phoneNum: '12345678911',
            area: '江西南昌'


        }
    },
    getphonenumber(e) {
        console.log(e);
    },
    chooseHeadShoot() {
        wxMethod.chooseUserHead(this);
    },
    logOut() {
        wxMethod.checkNetwork();
       setTimeout(() => {
        if (getApp().globalData.network == 'none') {
            wxMethod.showToast('无网络连接', 'error');
        }
        else {
            getApp().globalData.isLogin = false;
            getApp().globalData.userInfo={};
            getApp().globalData.cart_list=[];
            var userInfo = wxMethod.getStorage('userInfo');
            wxMethod.setStorage('userInfo', { _id: userInfo._id });
            wxMethod.toPage('../personalCenter/personalCenter', {}, 1);
        }
       }, 100);
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wxMethod.setNavigationBar({ title: '个人资料', bgColor: '#ebe044' });
        wxMethod.aimPage(this);


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        if (this.data.withData) {
            this.setData({
                userInfo: this.data.withData
            })
        }
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