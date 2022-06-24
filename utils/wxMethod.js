
const dbOperation = require('./dbOperation');




/**
 * @param {Object} obj 对象参数 
 * @param options 其他参数
*/
const setNavigationBar = function (obj, ...options) {
    if (obj.title) {
        wx.setNavigationBarTitle({
            title: obj.title,
            complete: (com) => {
                console.log(com);
            }
        })
    };
    if (obj.bgColor) {
        wx.setNavigationBarColor({
            backgroundColor: obj.bgColor,
            frontColor: '#ffffff',
            animation: {
                duration: 200,
                timingFunc: "linear"
            },
            complete: (com) => {
                console.log(com);
            }

        })
    }


};
/**
 * 
 * @param {String} key -存储key
 * @param {Object} data -存储数据
 * @param {Number} async -同步异步状态量
 */
const setStorage = function (key, data, async = 1) {
    if (async) {
        wx.setStorage({
            data: data,
            key: key,
            success: (res) => {
                console.log(res);

            }, fail: (err) => {
                console.log(err);
            }
        })
    } else {
        try {
            wx.setStorageSync(key, data)
        } catch (error) {
            console.log(error);

        }
    }
};
/**
 * 
 * @param {String} key -同步获取存储的key
 */

const getStorage = function (key) {
    try {
        var data = wx.getStorageSync(key);
        return data;
    } catch (error) {
        console.log(error);
    }
};

/**
 * 
 * @param {String} pageUrl -转跳页面地址
 * @param {Object} data -携带数据
 * @param {Number} method -转跳方式，默认navigateTo
 */
const toPage = function (pageUrl, data, method = 0) {
    switch (method) {
        case 1:
            wx.switchTab({
                url: pageUrl,
                success: (res) => {
                    console.log(res);

                },
                fail: (err) => {
                    console.log(err);
                }
            })
            break;
        case 2:
            wx.redirectTo({
                url: pageUrl,
                success: (res) => {
                    console.log(res);
                }, fail: (err) => {
                    console.log(err);
                }
            })
            break;
        case 3:
            wx.reLaunch({
                url: pageUrl,
                success: (res) => {
                    console.log(res);
                },
                fail: (err) => {
                    console.log(err);
                }
            })
            break;
        case 0:
            wx.navigateTo({
                url: pageUrl,
                events: {
                    withData: function (data) {
                        console.log(data);
                    },
                },
                success: (res) => {
                    console.log('toPage:');
                    console.log(data);
                    res.eventChannel.emit('withData', data)
                },
                fail: (err) => {
                    console.log(err);

                }
            })
    }
};
const aimPage = function (that) {
    const eventChannel = that.getOpenerEventChannel();
    eventChannel.on('withData', function (data) {
        console.log('aimPage:');
        console.log(data);
        that.setData({
            withData: data
        })

    })
};

const getSystemInfo = function () {
    try {
        console.log(wx.getSystemInfoSync());
        return wx.getSystemInfoSync();
    } catch (error) {
        console.log('获取系统消息失败');
        console.log(error);
    }
};


const checkNetwork = function () {
    wx.getNetworkType({
        success: (result) => {
            console.log(result);
            getApp().globalData.network = result.networkType;
        },
        fail: (err) => {
            showToast('未知错误', 'error');
            console.log(err);
        }
    })
};

const getLocation = function (that) {
    wx.getLocation({
        isHighAccuracy: true,
        highAccuracyExpireTime: 3500,
        type: 'gcj02',
        success: (res) => {
            console.log(res);
            getApp().globalData.userLocation = res;
            if (that.route.search('aside')) {
                //用户定位坐标
                const { latitude, longitude } = res;
                dbOperation.selectRecord('stores');
                //异步获取app.js内的globalData.stores
                setTimeout(() => {
                    if (getApp().globalData.stores.length > 0) {
                        var stores = getApp().globalData.stores;
                        for (let i = 0; i < stores.length; i++) {
                            let lat = Number(stores[i].location.latitude);
                            let lon = Number(stores[i].location.longitude);
                            let distance = countDistance({ lat1: latitude, lon1: longitude }, { lat2: lat, lon2: lon });
                            stores[i].distance = distance;
                        };
                        getApp().globalData.stores = stores;
                        that.setData({
                            storeList: getApp().globalData.stores
                        });
                        showToast('定位成功', 'success');

                    }
                }, 2000);

            }
        },
        fail: (err) => {
            console.log(err);
            wx.getSetting({
                success: (res) => {
                    console.log(res);
                    if (!res.authSetting['scope.userLocation']) {
                        showModal({ content: '请开启定位权限' }, that);
                    }
                    else {
                        showToast('定位失败', 'error');
                    }
                },
                fail: (err) => {
                    showToast('未知错误', 'error');
                    console.log(err);
                }
            })
        }
    })
};

//根据经纬度计算实地距离
/**
 * 
 * @param {Object} start -对象类型，包含源点经纬度。
 * @param {Object} end -对象类型，包含终点经纬度。
 */
const countDistance = function (start, end) {
    try {
        var { lat1, lon1 } = start;
        var { lat2, lon2 } = end;
    } catch (err) {
        console.log('countDistance参数错误');
        console.log(err);
    };
    const R = 6371;
    var c = Math.sin(lat1) * Math.sin(lat2) * Math.cos(lon1 - lon2) + Math.cos(lat1) * Math.cos(lat2);
    var distance = R * Math.acos(c) * Math.PI / 180;
    return distance.toFixed(1);
};
/**
 * 
 * @param {Object} location -对象类型，{latitude,longitude,name,address}。
 */
const openLocation = function (location) {
    const { name, address, latitude, longitude } = location;
    wx.openLocation({
        latitude,
        longitude,
        address,
        name,
        success: (res) => {
            console.log(res);
        },
        fail: (err) => {
            console.log(err);
            showToast('打开位置错误', 'error');
        }

    })
};

/**
 * 
 * @param {Object} that -传入this指针。
 */

const refresh = function (that) {
    checkNetwork();
    setTimeout(() => {
        if (getApp().globalData.network == 'none') {
            wx.stopPullDownRefresh({
                success: (res) => {
                    showToast('无网络连接', 'error');
                },
                fail: (err) => {
                    showToast('未知错误', 'error');
                    console.log(err);
                }
            })
        } else {


            /* 数据更新处理 */
            if (that.route.search('aside') >= 0) {
                getLocation(that);
                stopFresh();
            }
            else if (that.route.search('personalCenter') >= 0) {
                getUserInfo();
                if (getApp().globalData.userInfo.hasOwnProperty('_id')) {
                    setTimeout(() => {
                        that.setData({
                            userInfo: getApp().globalData.userInfo
                        })
                    }, 2500);
                }
                stopFresh();
            }
            else if (that.route.search('storeHome') >= 0) {
                dbOperation.getStoreHome(that, that.data.withData.storeData._id);
                stopFresh();
                that.storeDataInit();
            }
        }
    }, 500);
};
/**
 * 
 * @param {Boolean} type -判断停止刷新前的行为是否成功，若成功传入true，否之传入false。
 */
const stopFresh = function (type) {
    setTimeout(() => {
        wx.stopPullDownRefresh({
            success: (res) => {
                if (type) {
                    showToast('刷新成功', 'success');
                }
            },
            fail: (err) => {
                showToast('未知错误', 'error');
            }
        })
    }, 2500);
};


const getUserInfo = function () {
    if (!getStorage('userInfo').hasOwnProperty('_id')) {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: (res) => {
                console.log(res);
                const { nickName, gender, avatarUrl } = res.userInfo;
                const cart=[];
                getApp().globalData.userInfo = { nickName, gender, avatarUrl };
                setStorage('userInfo', { nickName, gender, avatarUrl,cart });
                dbOperation.addRecord('users', { nickName, gender, avatarUrl,cart });

                //dbOperation.addRecord('carts',publicData.getCartList());

                /*  dbOperation.selectRecord('users',getApp().globalData._id);
                 dbOperation.selectRecord('carts',getApp().globalData._id); */
            },
            fail: (err) => {
                console.log(err);
            }
        });
    } else {

        const { nickName, gender, avatarUrl, _id } = getStorage('userInfo');

        if (nickName && avatarUrl) {

            getApp().globalData.userInfo = { nickName, avatarUrl, _id, gender }
        }
        else {
            showLoading('登录中');
        }
        dbOperation.selectRecord('users', _id);


    }
    setTimeout(() => {
        if (getApp().globalData.userInfo.hasOwnProperty('_id')) {
            getApp().globalData.isLogin = true;
            hideLoading();
            showToast('登录成功');
            setStorage('userInfo', getApp().globalData.userInfo);
        }
        else {
            hideLoading();
            showToast('登录失败');
        }


    }, 2500);


};

const chooseUserHead = function (that) {
    wx.chooseImage({
        count: 1,
        /* sourceType:res.tapIndex?'camera':'album', */
        success: (r) => {
            console.log(r);
            wx.saveFile({
                tempFilePath: r.tempFilePaths[0],
                success: (res) => {
                    that.setData({
                        'userInfo.avatarUrl': res.savedFilePath
                    })
                    var userInfo = getStorage('userInfo');
                    userInfo.avatarUrl = res.savedFilePath;
                    setStorage('userInfo', userInfo);
                }
            })
        },
        fail: (er) => {
            console.log(er);
        }
    })

};
const showToast = (title, icon = 'none', duration = 1500) => {
    wx.showToast({
        title: title,
        icon: icon,
        duration: duration,
        success: (res) => {
            console.log('showToast:');
            console.log(res);
        }, fail: (err) => {
            console.log('showToast:');
            console.log(err);
        }
    })
};

const showModal = function (obj, that) {
    const { title, content } = obj;
    var confirmColor, route;
    if (that) {

        route = that.route;
        console.log(route);
        if (route.search('aside')) {
            confirmColor = '#6495ED';
        }
    }
    wx.showModal({
        title: title || '提示',
        content: content || '默认内容',
        confirmColor: confirmColor || 'green',
        success: (res) => {
            console.log(res);
            if (res.confirm && route.search('aside') >= 0) {
                wx.openSetting({
                    withSubscriptions: true,
                    success: (res) => {
                        console.log(res);

                    },
                    fail: (err) => {
                        console.log(err);
                    }
                })
            }
        },
        fail: (err) => {
            console.log(err);
        }
    })
};

const showLoading = function (title = '加载中') {
    wx.showLoading({
        title: title,
    });
};

const hideLoading = function () {
    setTimeout(() => {

        wx.hideLoading({
            success: (res) => {
                console.log(res)

            },
            fail: (err) => {
                console.log(err);

            }
        })

    }, 1000);
}

const showActionSheet = (itemList) => {

};


module.exports = {
    setNavigationBar,
    setStorage,
    getStorage,
    toPage,
    aimPage,
    /* getUserInfo, */
    chooseUserHead,
    showToast,
    showActionSheet,
    getSystemInfo,
    checkNetwork,
    refresh,
    stopFresh,
    getLocation,
    countDistance,
    showLoading,
    hideLoading,
    openLocation,
    getUserInfo

}

