// miniprogram/pages/storeCommand/storeCommand.js
const { wxMethod } = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
       

    },
    command_item_active(e) {

        var index;
        if (e) {
            index = e.currentTarget.dataset.index;
        }
        else {
            index = 0;
        }
        var sort = this.data.commandSort;
        for (let i in sort) {
            if (index == i) {
                sort[i].active = true;
                continue;
            }
            sort[i].active = false;
        }
        this.setData({
            commandSort: sort
        })



    },
    Init() {
        const obj = {
            title: '评论贴',
            bgColor: '#6495ED'
        };
        wxMethod.setNavigationBar(obj);
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
        this.setData({
            commandPoint: this.data.withData.commandPoint,
            commandSort: this.data.withData.commandSort
        });
        this.command_item_active();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.Init();
        wxMethod.aimPage(this);
       


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