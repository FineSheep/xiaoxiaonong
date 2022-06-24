const { users, stores,storeHome } = require('./dbConnection');


/**
 * 
 * @param {String} collection -指定需要操作的集合
 * @param {*} data -需要添加的数据
 */
/**
 * 
 * @param {String} collection -绑定集合
 */
const bindCollection = function (collection) {

}
/**
 * 
 * @param {String} collection -指定集合
 * @param {*} info -需要添加的数据
 */
const addRecord = function (collection, info) {
    if (collection == 'users') {
        users.add({
            data: info,
            success: (res) => {
                console.log(res);
                getApp().globalData._id = res._id;
                selectRecord('users',res._id);
               
            },
            fail: (err) => {
                console.log(err);
            }
        });
    }
}

const selectRecord = function (collection, key) {
    if (collection == 'users') {
        users.doc(key).get().then((res) => {
            console.log(res);
            getApp().globalData.userInfo=res.data;
            getApp().globalData.cart_list=res.data.cart;
        }).catch((err) => {
            console.log(err);

        })
    }
    else if (collection == 'stores') {
        stores.get({
            success: (res) => {
                console.log(res);
                getApp().globalData.stores = res.data;
            },
            fail: (err) => {
                console.log(err);
            }
        })
    }
};
/**
 * @function getStoreHome -该函数第一个参数为this指针对象。 
 * @param {Object} that -指针对象。
 * @param {String} key -查询商店主页的商店id。
 */
const getStoreHome=function(that,key){
    storeHome.doc(key).get().then((res)=>{
        console.log(res);
        that.setData({
            storeData:res.data
        })
    }).catch((err)=>{
        console.log(err);
    })
}
/**
 * 
 * @param {String} _id -用户id。
 * @param {Object} cart -传入需要更新的购物车数据。
 */
const updateUserCart=function(_id,cart){
    setTimeout(() => {
        users.doc(_id).update({
            data:{
                cart:cart
            },
            success:(res)=>{
                console.log(res);
            },
            fail:err=>{
                console.log(err);
            }
        })
    }, 500);
};

module.exports = {
    users,
    stores,
    storeHome,
    addRecord,
    selectRecord,
    getStoreHome,
    updateUserCart,
}