// miniprogram/pages/shoppingCart/shoppingCart.js
const { wxMethod, publicData, dbOperation } = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectAll: 'circle',
        cart_lists: [{
         
          store_id:"adas",
          allChecked:false,
          storeName:"商店1",
          goodsLists:[
            {
              goodId:"1",
              src:"../../images/fruit/chengzi.jpg",
              name:"橙子",
              price:"3.3",
              num:1,
              checked:false
            },
            {
              goodId:"2",
              src:"../../images/fruit/lanmei.jpg",
              name:"蓝莓",
              price:"3.3",
              num:1,
              checked:false
            }
          ]
        }],//购物车列表
        fruitNum1:1,//商品件数
        selectedGoodsCount: '0.00',
        selectedGoodsNum: '',
        cartManager: false,

    },
    one(){
console.log(this.data.cart_lists)
    },
    //转跳至店铺首页
    toStoreHome(e){
        const {store_id}=e.currentTarget.dataset;
        // wxMethod.toPage('../storeHome/storeHome',{storeData:{_id:store_id}});
    },
    //初始化商品未选中状态
    InitGoodsCheck(){
        for(let i=0,len1=this.data.cart_lists.length;i<len1;i++){
            this.data.cart_lists[i].allChecked=false;
            for(let j=0,len2=this.data.cart_lists[i].goodsLists.length;j<len2;j++){
                this.data.cart_lists[i].goodsLists[j].checked=false;
            }
        };
        this.setData({
            cart_lists:this.data.cart_lists,
            selectAll:'circle',
            selectedGoodsCount: '0.00',
            selectedGoodsNum: '',
        })
    },
    //检测是否选中任意商品
    isCheckGoods(){
        for(let i=0,len1=this.data.cart_lists.length;i<len1;i++){
            for(let j=0,len2=this.data.cart_lists[i].goodsLists.length;j<len2;j++){
                if(this.data.cart_lists[i].goodsLists[j].checked){
                    return true;
                }
            }
        };
        return false;
    },
    //删除选中的商品
    deleteCheck() {
        if (getApp().globalData.isLogin) {
           if(this.isCheckGoods()){
            wx.showModal({
                title: '删除',
                content: '是否确认删除所选商品',
                confirmText: '是',
                cancelText: '否',
                success: (res) => {
                    if (res.confirm) {
                        wxMethod.checkNetwork();
                        setTimeout(() => {
                            if (getApp().globalData.network == 'none') {
                                wxMethod.showToast('无网络连接', 'error');
                            }
                            else {
                                const cart = this.data.cart_lists;
                                var newCart = [];
                                var goodsLists = [];
                                for (let i = 0, len1 = cart.length; i < len1; i++) {
                                    if (!cart[i].allChecked) {
                                        for (let j = 0, len2 = cart[i].goodsLists.length; j < len2; j++) {
                                            if (!cart[i].goodsLists[j].checked) {
                                                goodsLists.push(cart[i].goodsLists[j]);
                                            }
                                        };
                                        if (goodsLists.length > 0) {
                                            newCart.push({ allChecked: false, storeName: cart[i].storeName, store_id: cart[i].store_id, goodsLists });
                                            goodsLists = [];
                                        }
                                    }

                                }
                                this.data.cart_lists = newCart;
                                getApp().globalData.cart_lists = this.data.cart_lists;
                                dbOperation.updateUserCart(getApp().globalData.userInfo._id, getApp().globalData.cart_lists);
                                this.setData({
                                    cart_lists: newCart
                                })
                                wxMethod.showToast('删除成功', 'success');

                            }
                        }, 500);
                    }
                }
            })  
           }
           else{
               wxMethod.showToast('未选择商品','error');
           }
        }
        else {
            wxMethod.showToast('请先登录', 'error');
        }

    },
    changeCartManager() {
        this.setData({
            cartManager: this.data.cartManager ? false : true
        })
    },
    //获取购物车已选商品价格和数量
    getSelectedCount() {
        var totalcount = '';
        var goodsNum = 0;
        const cart = this.data.cart_lists;
        for (let i = 0, len1 = cart.length; i < len1; i++) {
            for (let j = 0, len2 = cart[i].goodsLists.length; j < len2; j++) {
                if (cart[i].goodsLists[j].checked) {
                    totalcount = Number(totalcount) + Number(cart[i].goodsLists[j].price) * Number(cart[i].goodsLists[j].num);
                    goodsNum += 1;
                }
            }
        };
        totalcount = Number(totalcount);
        this.setData({
            selectedGoodsCount: totalcount.toFixed(2),
            selectedGoodsNum: goodsNum ? goodsNum : ''
        })

    },
    //减少商品数量
    goodsNumReduce(e) {
      console.log(e)
        if (getApp().globalData.isLogin) {
            wxMethod.checkNetwork();
            setTimeout(() => {
                if (getApp().globalData.network == 'none') {
                    wxMethod.showToast('无网络连接', 'error');
                }
                else {
                    console.log(e);
                    const { index, single } = e.currentTarget.dataset;
                    var cart = this.data.cart_lists;
                    for (let i = 0, len1 = cart.length; i < len1; i++) {
                        if (index == i) {
                            for (let j = 0, len2 = cart[i].goodsLists.length; j < len2; j++) {
                                if (single == j && Number(cart[i].goodsLists[j].num) > 1) {
                                    cart[i].goodsLists[j].num = Number(cart[i].goodsLists[j].num) - 1;
                                }
                                else if (single == j && Number(cart[i].goodsLists[j].num) == 1) {
                                    wxMethod.showToast('商品数量最小为1');
                                }
                            }
                        }
                    };
                    this.data.cart_lists = cart;
                    getApp().globalData.cart_lists = this.data.cart_lists;
                    dbOperation.updateUserCart(getApp().globalData.userInfo._id, getApp().globalData.cart_lists);
                    this.setData({
                        cart_lists: cart
                    });
                    this.getSelectedCount();
                }
            }, 500);
        }
        else{
            wxMethod.showToast('请先登录','error');
        }

    },
    //增加商品数量
    goodsNumAdd(e) {
       if(getApp().globalData.isLogin){
           wxMethod.checkNetwork();
           setTimeout(() => {
                if(getApp().globalData.network=='none'){
                    wxMethod.showToast('无网络连接','error');
                }
                else{
                    console.log(e);
                    const { index, single } = e.currentTarget.dataset;
                    var cart = this.data.cart_lists;
                    for (let i = 0, len1 = cart.length; i < len1; i++) {
                        if (index == i) {
                            for (let j = 0, len2 = cart[i].goodsLists.length; j < len2; j++) {
                                if (single == j && Number(cart[i].goodsLists[j].num) < 50) {
                                    cart[i].goodsLists[j].num = Number(cart[i].goodsLists[j].num) + 1;
                                }
                                else if (single == j && Number(cart[i].goodsLists[j].num) >= 50) {
                                    wxMethod.showToast('已超过商品数量最大值');
                                }
                            }
                        }
                    };
                    this.data.cart_lists=cart;
                    getApp().globalData.cart_lists=this.data.cart_lists;
                    dbOperation.updateUserCart(getApp().globalData.userInfo._id,getApp().globalData.cart_lists);
                    this.setData({
                        cart_lists: cart
                    });
                    this.getSelectedCount();
                }
           }, 500);
       }
       else{
           wxMethod.showToast('请先登录','error');
       }
    },


    //购物车全选与反选
    selectAll() {
        var length = this.data.cart_lists.length;
        var cart = this.data.cart_lists;
        for (let i = 0, len1 = length; i < len1; i++) {
            let allchecked = (cart[i].allChecked == false) ? true : false;
            if (allchecked) {
                for (let j = 0, len2 = cart[i].goodsLists.length; j < len2; j++) {
                    cart[i].goodsLists[j].checked = true;
                };

            }
            else {
                for (let j = 0, len2 = cart[i].goodsLists.length; j < len2; j++) {
                    cart[i].goodsLists[j].checked = false;
                };

            }
            cart[i].allChecked = allchecked;
        }
        this.setData({
            selectAll: (this.data.selectAll == 'circle') ? 'success' : 'circle',
            cart_lists: cart
        });
        this.getSelectedCount();
    },
    Init() {
        const obj = {
            title: '购物车',
            bgColor: '#FFA500'
        };
        wxMethod.setNavigationBar(obj);
        this.setData({
            cart_lists: getApp().globalData.cart_lists,
            fruitNum: getApp().globalData.cart_lists.length,
            cartManager:false
        })
        this.InitGoodsCheck();

    },
    toPay(){
     
        wxMethod.toPage('../shoppingCartPay/shoppingCartPay',{});
    },
    //单个商家商品全选与反选
    selectAllGoods(e) {
        console.log(e);
        var { goodsLists, index } = e.currentTarget.dataset;
        var { allChecked } = this.data.cart_lists[index];
        allChecked = (allChecked == false) ? true : false;
        console.log(e);
        if (allChecked) {
            for (let i = 0; i < goodsLists.length; i++) {
                goodsLists[i].checked = true;
            };


        }
        else {
            for (let i = 0; i < goodsLists.length; i++) {
                goodsLists[i].checked = false;
            };

        }
        this.data.cart_lists[index].goodsLists = goodsLists;
        this.data.cart_lists[index].allChecked = allChecked;

        const selectAllGoods = this.checkAllGoods();

        this.setData({
            selectAll: (selectAllGoods) ? 'success' : 'circle'
        })

        this.setData({
            cart_lists: this.data.cart_lists
        });
        this.getSelectedCount();
    },
    //单个商品选择
    chooseSingleGood(e) {
        console.log(e);
        const { index, single } = e.currentTarget.dataset;
        var cart = this.data.cart_lists;
        for (let i = 0, len1 = cart.length; i < len1; i++) {
            if (index == i) {
                for (let j = 0, len2 = cart[i].goodsLists.length; j < len2; j++) {
                    if (single == j) {
                        let check = cart[i].goodsLists[j].checked;
                        cart[i].goodsLists[j].checked = check ? false : true;
                    }
                }
            }
        };
        const allChecked = this.checkStoreGoods(index);
        cart[index].allChecked = allChecked ? true : false;
        this.setData({
            cart_lists: cart
        });
        const selectAllGoods = this.checkAllGoods();
        this.setData({
            selectAll: selectAllGoods ? 'success' : 'circle'
        })
        this.getSelectedCount();

    },
    //检查单个商店商品全选与否
    checkStoreGoods(index) {
        var goodsLists = this.data.cart_lists[index].goodsLists;
        for (let i = 0, len1 = goodsLists.length; i < len1; i++) {
            if (!goodsLists[i].checked) {
                return false;
            }

        };
        return true;
    },
    //检查购物车全选与否
    checkAllGoods() {
        let length = this.data.cart_lists.length;
        const cart = this.data.cart_lists;
        for (let i = 0; i < length; i++) {
            if (!cart[i].allChecked)
                return false;
        };
        return true;
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.Init();
        wx.setTabBarBadge({
            index: 2,
            text: getApp().globalData.cart_lists.length.toString(),
          });
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

    },
    onTabItemTap: function () {

    }
})