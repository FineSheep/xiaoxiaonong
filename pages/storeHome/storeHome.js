// miniprogram/pages/storeHome/storeHome.js
const { wxMethod, dbOperation } = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow1: false,
        isShow2: false,
        page1: false,
        page2: false,
        sort: [],
        hasNetwork:true,
        showGoodsList: [],
        goodsScroll: true,
        store_nav_list: [
            {
                src: '../../images/contact_store_icon.png',
                tip: '联系商家'
            },
            {
                src: '../../images/store_guide_icon.png',
                tip: '导航'
            },
            {
                src: '../../images/store_like_icon.png',
                tip: '收藏店铺'
            },
            {
                src: '../../images/store_share_icon.png',
                tip: '分享'
            }
        ],
    },

    checkShoppingCart() {
        wxMethod.toPage('../shoppingCart/shoppingCart', {}, 1)
    },
    addGoodsToCart(e) {
        if (getApp().globalData.isLogin) {
            wxMethod.checkNetwork();
            console.log(e);
            setTimeout(() => {
                if (getApp().globalData.network == 'none') {
                    wxMethod.showToast('无网络连接', 'error');

                }
                else {
                    var singleGoods = {};
                    var goodsList = [];
                    const { goods_id, name, price, src } = e.currentTarget.dataset.goods;
                    singleGoods.store_id = this.data.storeData._id;
                    singleGoods.storeName = this.data.storeData.storeName;
                    singleGoods.allChecked = false;
                    goodsList.push({ checked: false, goods_id, name, price, src, num: 1 });
                    singleGoods.goodsList = goodsList;
                    var cart_list = new Array(...getApp().globalData.cart_list);
                    for (let i = 0, len1 = cart_list.length; i < len1; i++) {
                        if (cart_list[i].store_id == singleGoods.store_id) {
                            for (let j = 0, len2 = cart_list[i].goodsList.length; j < len2; j++) {
                                if (cart_list[i].goodsList[j].goods_id == singleGoods.goodsList[0].goods_id) {
                                    cart_list[i].goodsList[j].num = Number(cart_list[i].goodsList[j].num) + 1;
                                    getApp().globalData.cart_list = cart_list;
                                    wxMethod.showToast('添加购物车成功');
                                    dbOperation.updateUserCart(getApp().globalData.userInfo._id, getApp().globalData.cart_list);
                                    return console.log('商品数量加1');;
                                }
                            }
                            cart_list[i].goodsList.push(singleGoods.goodsList[0]);
                            getApp().globalData.cart_list = cart_list;
                            wxMethod.showToast('添加购物车成功');
                            dbOperation.updateUserCart(getApp().globalData.userInfo._id, getApp().globalData.cart_list);
                            return console.log('成功添加一件商品');

                        }
                    };
                    cart_list.push(singleGoods);
                    getApp().globalData.cart_list = cart_list;
                    wxMethod.showToast('添加购物车成功');
                    dbOperation.updateUserCart(getApp().globalData.userInfo._id, getApp().globalData.cart_list);
                    return console.log('添加商店和商品成功');
                }
            }, 500);

        }
        else {
            wxMethod.showToast('请先登录', 'error');
        }
        /*  var singleGoods = {
             store_id: '',
             storeName: '',
             allChecked: false,
             goods: {
                 checked: false,
                 goods_id: '',
                 name: '',
                 num:1,
                 price: '',
                 src: '',
             }
 
         }; */

    },
    spyGoodsRightItemOffset(e) {
        console.log(e);
        if (this.data.goodsScroll) {
            this.goodsSortItemActive(e);
        }
    },
    chooseGoodsLeftItem(e) {
        this.goodsSortItemActive();
        if (e) {
            this.goodsSortItemActive(e);
            this.switchLeftGoodsSort(e.currentTarget.dataset.index);
            this.setData({
                goodsScroll: (e.currentTarget.dataset.index == 0) ? true : false
            })
        }


    },
    goodsSortItemActive(e) {
        var index;
        if (e) {
            console.log(e);
            if (e.hasOwnProperty('currentTarget')) {
                index = e.currentTarget.dataset.index;
            }

            else if ('index' in e) {
                console.log(e);
                index = e.index;
            }
        }
        else {
            index = 0;
        }

        for (let i in this.data.storeData.goodsList) {
            if (i == index) {
                this.data.storeData.goodsList[i].active = true;
                continue;
            }
            this.data.storeData.goodsList[i].active = false;
        }
        this.setData({
            'storeData.goodsList': this.data.storeData.goodsList
        })
    },
    switchLeftGoodsSort(index) {
        const goodsList = new Array(...this.data.showGoodsList);
        const copyGoodsList = new Array(...goodsList);
        if (index != 0) {
            this.setData({
                showGoodsList: goodsList.splice(index, 1)
            });
        }
        else {
            this.setData({
                showGoodsList: copyGoodsList
            })
        }
        this.data.showGoodsList = copyGoodsList;

    },
    showAllGoods() {
        var allGoods = [];
        const {goodsList}  = this.data.storeData;
        for (let i=0,len=goodsList.length;i<len;i++) {
            if (i != 0) {
                allGoods.push(...goodsList[i].goods);
            }
        };
        this.data.storeData.goodsList[0].goods = allGoods;
        this.setData({
            'storeData.goodsList': this.data.storeData.goodsList,
            showGoodsList: this.data.storeData.goodsList
        })
    },

    storeNavChoose(e) {
        console.log(e.currentTarget);
        const { index } = e.currentTarget.dataset;
        switch (index) {
            case 0:

                break;
            case 1:
                wxMethod.openLocation(this.data.storeData.location);
                break;
            case 2:

                break;
            case 3:

                break;
            default:
                wxMethod.showToast('未知错误', 'error');
        }
    },
    sort() {

        var compare = function (item1, item2) {
            return (Number(item1.sortNum) > Number(item2.sortNum)) ? -1 : (Number(item1.sortNum) < Number(item2.sortNum)) ? 1 : 0;
        };
        var sort = new Array(...this.data.storeData.store_command.commandSort);
        var newSort = sort.sort(compare);
        console.log(newSort);
        this.setData({
            sort: newSort.splice(1, 4)
        })




    },
    toCommandDetail() {
        const { point, qualityPoint, deliveryPoint, packingPoint, commandSort } = this.data.storeData.store_command;
        const commandPoint = { point, qualityPoint, deliveryPoint, packingPoint };
        wxMethod.toPage('../storeCommand/storeCommand', { commandPoint, commandSort });
    },
    showPageContainer(e) {
        console.log(e);
        const { id } = e.currentTarget.dataset;
        const page = 'page' + id;
        const isShow = 'isShow' + id;
        if (this.data[page]) {
            this.setData({
                [isShow]: false,
            })
            setTimeout(() => {
                this.setData({
                    [page]: false
                })
            }, 500);
        }
        else {
            this.setData({
                [page]: true,

            })
            setTimeout(() => {
                this.setData({
                    [isShow]: true
                })
            }, 0);
        }
    },

    Init() {
        const obj = {
            title: '店铺详情',
            bgColor: '#6495ED'
        };
        wxMethod.setNavigationBar(obj);


    },
    storeDataInit() {
        wxMethod.showLoading();
        setTimeout(() => {
          try {
            this.showAllGoods();
            this.sort();
            this.chooseGoodsLeftItem();
          } catch (error) {
              console.log(error);
              this.storeDataInit();
          }
            wxMethod.hideLoading();
        }, 500);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wxMethod.checkNetwork();

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wxMethod.aimPage(this);
        if (this.data.hasOwnProperty('withData')) {
            const store_id = this.data.withData.storeData._id;
            if (getApp().globalData.network == 'none') {
                wxMethod.showToast('无网络连接', 'error');
                
            }
            else {
                dbOperation.getStoreHome(this, store_id);
                this.storeDataInit();
            }
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
       
        this.Init();

        setTimeout(() => {
            if(getApp().globalData.network=='none'){
                this.setData({
                    hasNetwork:false
                })
            }
            else{
                this.setData({
                    hasNetwork:true
                })
            }
        }, 500);
        /*  wxMethod.aimPage(this);
         if(this.data.withData.storeData){
             this.setData({
                 storeData:this.data.withData.storeData,
             })
         } */
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        wxMethod.hideLoading();
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
        this.Init();
        if (this.data.hasOwnProperty('withData')) {
            wxMethod.refresh(this);
        };



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