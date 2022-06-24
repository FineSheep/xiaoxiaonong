

 const login = () => {
    var person = {};
    wx.login({
        timeout: 2000,
    }).then((res) => {
       console.log(res);
       getApp().globalData.code=res.code;
      
    }).catch((err) => {
        console.log(err);
    })

} 

const checkSession=new Promise((resolve,reject)=>{
    wx.checkSession({
        success: (res) => {
            resolve(res);
        },
        fail:err=>{
            reject(err);
        }
      })
})
/**
 * 
 * @param {*} appId 
 * @param {*} code 
 * @param {*} encryptedData 
 * @param {*} iv 
 */
const getUserSessionKey=(appId,code,encryptedData,iv)=>{
    wx.request({
      url: 'http://localhost:8883/decode',
      method:'POST',
      data:{
          appId,
          code,
          iv,
          encryptedData,
      },
      header:{
          'Content-Type':'application/x-www-form-urlencoded'
      },
      success:res=>{
          console.log(res);
      }
    })
}

const registe=function(userInfo){
    
}


module.exports = {
    login,
    checkSession,
    getUserSessionKey,
}