/*
***微信商城开发
***微信号：k1009756987
***博客：htmlk.cn
***QQ群：654226989
*/
Page({
  data:{
      detailgood:{},
      listgood:[{
        "id":'0101001',
        "name": "kkkkkZespri佳沛新西兰阳光金奇异果6个92-114g/个(北京)",
        "price": "111.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/one.jpg"
    }, {
        "id":'0101002',
        "name": "智利蓝莓2盒（约125g/盒）",
        "pic_url": "../../images/fruit/lanmei.jpg",
        "price": "177.0",
        "type": "3.3kg/箱"
    }, {
        "id":'0101003',
        "name": "澳大利亚脐橙12个约160g/个(北京)",
        "price": "178.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/chengzi.jpg"
    }, {
        "id":'0102001',
        "name": "Zespri佳沛新西兰阳光金奇异果6个92-114g/个(北京)",
        "price": "172.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/one.jpg"
    }, {
        "id":'0102002',
        "name": "智利蓝莓2盒（约125g/盒）",
        "pic_url": "../../images/fruit/lanmei.jpg",
        "price": "171.0",
        "type": "3.3kg/箱"
    }, {
        "id":'0102003',
        "name": "澳大利亚脐橙12个约160g/个(北京)",
        "price": "174.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/chengzi.jpg"
    }, {
        "id":'0103001',
        "name": "Zespri佳沛新西兰阳光金奇异果6个92-114g/个(北京)",
        "price": "177.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/one.jpg"
    }, {
        "id":'0103002',
        "name": "智利蓝莓2盒（约125g/盒）",
        "pic_url": "../../images/fruit/lanmei.jpg",
        "price": "173.0",
        "type": "3.3kg/箱"
    }, {
        "id":'0103003',
        "name": "澳大利亚脐橙12个约160g/个(北京)",
        "price": "169.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/chengzi.jpg"
    }, {
        "id":'0201001',
        "name": "Zespri佳沛新西兰阳光金奇异果6个92-114g/个(北京)",
        "price": "159.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/one.jpg"
    }, {
        "id":'0201002',
        "name": "智利蓝莓2盒（约125g/盒）",
        "pic_url": "../../images/fruit/lanmei.jpg",
        "price": "149.0",
        "type": "3.3kg/箱"
    }, {
        "id":'0202001',
        "name": "澳大利亚脐橙12个约160g/个(北京)",
        "price": "139.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/chengzi.jpg"
    }, {
        "id":'1203001',
        "name": "Zespri佳沛新西兰阳光金奇异果6个92-114g/个(北京)",
        "price": "159.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/one.jpg"
    }, {
        "id":'1401001',
        "name": "智利蓝莓2盒（约125g/盒）",
        "pic_url": "../../images/fruit/lanmei.jpg",
        "price": "181.0",
        "type": "3.3kg/箱"
    }, {
        "id":'1101001',
        "name": "澳大利亚脐橙12个约160g/个(北京)",
        "price": "180.0",
        "type": "3.3kg/箱",
        "pic_url": "../../images/fruit/chengzi.jpg"
    }],
 hotgoods:[
      {
        "more_pic":"../../images/index/1.jpg"
      },{
        "more_pic":"../../images/index/2.jpg"
      },{
        "more_pic":"../../images/index/3.jpg"
      },{
        "more_pic":"../../images/index/4.jpg"
      },{
        "more_pic":"../../images/index/5.jpg"
      },{
        "more_pic":"../../images/index/6.jpg"
      }
    ],
  },
  btnclick:function(e){
    wx.setStorageSync('goods',e.currentTarget.dataset.goods)
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var  id=options.id;
    let list=this.data.listgood;
    var that=this;
    list.forEach(function(arr){
      console.log(arr.id.toString())
      console.log(id)
      if(id==arr.id){
        that.setData({
          detailgood:arr
        })
      }
    })
    console.log(this.data.detailgood)
  },

  onReady:function(){
 
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
