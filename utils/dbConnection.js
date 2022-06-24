
wx.cloud.init({
    env:'cloud1-4gsihmqwaa0b03fc'
})

const users=wx.cloud.database({
    env:'cloud1-4gsihmqwaa0b03fc'
}).collection('users');

const stores=wx.cloud.database({
    env:'cloud1-4gsihmqwaa0b03fc'
}).collection('stores');

const storeHome=wx.cloud.database({
    env:'cloud1-4gsihmqwaa0b03fc'
}).collection('storeHome');

module.exports={
    users,
    stores,
    storeHome,
}