// miniprogram/pages/personalCenter/personalCenter.js
const { wxMethod, publicData, dbOperation ,httpRequest} = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            avatarUrl: '../../images/user_headshoot_init.png',
            nickName: '未登录/登录',
        },
        userType: '普通用户',
        order_func_list: [],
        personal_func_area_list: [],
    },
    personal_func_area_list_init() {

        for (let i = 0; i < 8; i++) {
            let item = {};
            item.src = '../../images/personal_func_icon' + i + '.png';
            item.tip = (i == 0) ? '我的拼单' : (i == 1) ? '我的积分' : (i == 2) ? '优惠券' : (i == 3) ? '我的卡券' : (i == 4) ? '核销记录' : (i == 5) ? '收货地址' : (i == 6) ? '意见反馈' : '关于我们';
            this.data.personal_func_area_list[i] = item;

        };
        this.setData({
            personal_func_area_list: this.data.personal_func_area_list
        })
    },
    noData() {
        wxMethod.toPage('../noData/noData', {});
    },
    navigationInit() {
        const obj = {
            title: '个人中心',
            bgColor: '#ebe044'
        };
        wxMethod.setNavigationBar(obj);
    },
    order_func_list_init() {
        for (let i = 0; i < 4; i++) {
            let item = {};
            item.src = '../../images/order_func_icon' + i + '.png';
            item.tip = (i == 0) ? '代付款' : (i == 1) ? '待发货' : (i == 2) ? '待收货' : '售后';
            this.data.order_func_list.push(item);
        };
        this.setData({
            order_func_list: this.data.order_func_list
        })
    },
    userInfoEdit() {
        const { userInfo } = this.data;
        if (userInfo.nickName == '未登录/登录') {
            wxMethod.getUserInfo();

            setTimeout(() => {
                if (getApp().globalData.userInfo.hasOwnProperty('_id')) {
                    this.setData({
                        userInfo: getApp().globalData.userInfo
                    })
                }
            }, 3000);

        } else {
            wxMethod.toPage('../userInfo/userInfo', userInfo)
        }

    },
    updateUserHeadShoot() {
        wxMethod.checkNetwork();
        if (getApp().globalData.network == 'none') {
            wxMethod.showToast('无网络连接', 'error');
        } else {
            wxMethod.chooseUserHead(this);
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.order_func_list_init();
        this.personal_func_area_list_init();

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
        this.navigationInit();
        if (!getApp().globalData.isLogin) {
            this.setData({
                userInfo: {
                    avatarUrl: '../../images/user_headshoot_init.png',
                    nickName: '未登录/登录',
                }
            })
        }
        else if (getApp().globalData.isLogin) {
            this.setData({
                userInfo: getApp().globalData.userInfo
            })

        }
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

    },
    onTabItemTap(e) {
        console.log(e);

        
    },

})