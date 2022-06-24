// miniprogram/pages/home/home.js
const {publicData,wxMethod }=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        home_top_swiper_item_images_src: [
            '../../images/home_top_swiper_item1.jpg',
            '../../images/home_top_swiper_item2.jpg',
            '../../images/home_top_swiper_item3.jpg',
            '../../images/home_top_swiper_item4.jpg'
        ],
        home_func_area_list: [],
    },
    noData(){
        wxMethod.toPage('../list/list',{});
    },
    home_func_area_list_init(){
        
        for(let i=0;i<8;i++){
            let item={};
            item.src='../../images/home_func_icon'+i+'.png';
            item.tip= (i==0) ? '全部' : (i==1)?'当季热销':(i==2)?'国产水果':(i==3)?'进口水果':(i==4)?'有机水果':(i==5)?'优选干果':(i==6)?'热带水果':'推荐';
            this.data.home_func_area_list[i]=item;
            
        };
        this.setData({
            home_func_area_list:this.data.home_func_area_list
        })
    },
    getNoticeTop(){
        this.setData({
            notice_tip:publicData.getNoticeList()[0]
        })
    },
    noticeTipBlink(){
        setInterval(() => {
            this.setData({
                notice_tip_blink:this.data.notice_tip_blink=='notice_tip_blink'?'':(this.data.notice_tip_blink='notice_tip_blink')
            })
        }, 800);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
        this.home_func_area_list_init();
        this.getNoticeTop();
        this.noticeTipBlink();
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wxMethod.getUserInfo();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wxMethod.setNavigationBar({title:'首页'});
        
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