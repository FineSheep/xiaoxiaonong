


const getNoticeList = () => {
    const list = [
        '新品当季水果上市，速来抢购！',
        '新版本上线，优化用户体验！',
        '快来瞧瞧，水果搭配热门指南，吃出美丽容颜！'
    ];
    return list;

};

//购物车删除算法

/* 
                            var i=0,j=0
                            while(1){
                                if (cart[i].allChecked) {
                                    this.data.cart_list.splice(i, 1);
                                }
                                else if(this.data.cart_list[i].goodsList.length>0) {
                                   while(1){
                                        if (cart[i].goodsList[j].checked) {
                                            this.data.cart_list[i].goodsList.splice(j, 1);
                                        }
                                        else if(j<this.data.cart_list[i].goodsList.length-1){
                                            j+=1;
                                        }
                                        else{
                                            break;
                                        }
                                    }

                                }
                                else if(){
                                    i+=1;
                                }
                                
                            };
*/

//商店主页测试数据
/* storeData: {
            _id: '28ee4e3e60a8c8591b2ba5ad6d8529ca',
            location: {
                address: '江西省南昌市青山湖区经济技术开发区范家村A区1栋1户201室',
                name: '美益水果(广兰店)',
                latitude: 28.711419,
                longitude: 115.827799,
            },
            goodsList: [
                {
                    type: '全部',
                    active: true,
                    goods: [

                    ]
                },
                {
                    type: '推荐',
                    goods: [

                        {
                            src: '../../images/test_icon.png',
                            name: '哈哈哈哈哈哈测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                        {
                            src: '../../images/test_icon.png',
                            name: '测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                    ]
                },
                {
                    type: '520专属',
                    goods: [
                        {
                            src: '../../images/test_icon.png',
                            name: '测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                        {
                            src: '../../images/test_icon.png',
                            name: '测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                        {
                            src: '../../images/test_icon.png',
                            name: '测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                        {
                            src: '../../images/test_icon.png',
                            name: '测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                        {
                            src: '../../images/test_icon.png',
                            name: '测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                        {
                            src: '../../images/test_icon.png',
                            name: '测试商品名称',
                            price: '80.99',
                            salePerMonth: '94',
                            highPoint: '99'

                        },
                    ]
                }
            ],
            shootSrc: '../../images/test_icon.png',
            storeName: '美益水果(广兰店)',
            distance: 6.9,
            tabs: ['口碑品牌', '热销top'],
            store_bar_tip: [
                {
                    miniIcon: '../../images/peisong_icon.png',
                    tip: '配送0分钟',


                },
                {
                    miniIcon: '../../images/yueshou_icon.png',
                    tip: '月售+++',
                },
                {
                    miniIcon: '../../images/yuding_icon.png',
                    tip: '支持预定',

                }

            ],
            store_notice: '公告：不满意极速退款，美团超级连锁品牌，全国230家店，诚邀全国加盟商，提供完善开店指导，店铺运营，售后客服管理，咨询电话：15114987516(只加盟咨询)售后问题请联系商家',
            store_command: {
                point: '4.8',
                qualityPoint: '4.7',
                packingPoint: '4.9',
                deliveryPoint: '99',
                top1: '"水果很好很新鲜"',
                commandSort: [
                    {
                        sortName: '全部',
                        sortNum: '∞',
                    },
                    {
                        sortName: '好评',
                        sortNum: '515'
                    },
                    {
                        sortName: '差评',
                        sortNum: '17'
                    },
                    {
                        sortName: '有图',
                        sortNum: '347'
                    },
                    {
                        sortName: '味道赞',
                        sortNum: '68'
                    },
                    {
                        sortName: '分量足',
                        sortNum: '45'
                    },
                    {
                        sortName: '推荐',
                        sortNum: '442'
                    },
                    {
                        sortName: '包装好',
                        sortNum: '22'
                    },
                    {
                        sortName: '价格实惠',
                        sortNum: '22'
                    },
                    {
                        sortName: '质量好',
                        sortNum: '60'
                    },
                    {
                        sortName: '服务好',
                        sortNum: '55'
                    },
                    {
                        sortName: '性价比高',
                        sortNum: '22'
                    },
                    {
                        sortName: '满意',
                        sortNum: '22'
                    },

                ]
            },
            store_service: [
                {
                    miniIcon: '../../images/yuding_icon.png',
                    tip: '支持预定',
                    text: '商家支持预定服务，用户可自行选择送达时间'
                },
                {
                    miniIcon: '../../images/shouhou_icon.png',
                    tip: '售后无忧',
                    text: '24小时内可处理售后诉求'
                },
                {
                    miniIcon: '../../images/zixun_icon.png',
                    tip: '在线咨询',
                    text: '商家提供在线咨询服务'
                }
            ],
            discount: {
                tip: [
                    '29减4', '减5元配送费', '新客减1', '0.01元爆品'
                ],
                detail: [
                    {
                        type: '满减',
                        text: '满29减4;满40减6;满50减9;满100减21'
                    },
                    {
                        type: '运费',
                        text: '配送费立减5元'
                    },
                    {
                        type: '新店',
                        text: '本店新用户立减1元'
                    },
                    {
                        type: '爆品',
                        text: '爆款商品0.01元起'
                    },
                    {
                        type: '折扣',
                        text: '折扣商品3.1折起'
                    },
                    {
                        type: '返券',
                        text: '实际支付25元返3元商家代金券'
                    }
                ]
            },


        } */

/* const getCartList = () => {

    const cart_list = [
        {
            store_id: '',
            allChecked: false,
            storeName: '测试商店名称',
            goodsList: [
                {
                    src: '../../images/test_icon.png',
                    name: '测试商品名称',
                    price: '80.99',
                    num: 1,
                    checked: false
                },
                {
                    src: '../../images/test_icon.png',
                    name: '测试商品名称',
                    price: '8.99',
                    num: 2,
                    checked: false
                },

                {
                    src: '../../images/test_icon.png',
                    name: '测试商品名称',
                    price: '80.99',
                    num: 1,
                    checked: false
                },

            ]
        },
        {
            store_id: '',
            allChecked: false,
            storeName: '测试商店名称',
            goodsList: [
                {
                    src: '../../images/test_icon.png',
                    name: '测试商品名称',
                    price: '80.99',
                    num: 1,
                    checked: false
                },
                {
                    src: '../../images/test_icon.png',
                    name: '测试商品名称',
                    price: '8.99',
                    num: 2,
                    checked: false
                },

                {
                    src: '../../images/test_icon.png',
                    name: '测试商品名称',
                    price: '80.99',
                    num: 8,
                    checked: false
                },

            ]
        }
    ];
    return cart_list;
}; */

const isLogin = (status) => {
    if (status) {
        return {
            msg: '已登录',
            status: true
        }
    }
    else {
        return {
            msg: '未登录',
            status: false
        }
    }
};



module.exports = {
    getNoticeList,
    //getCartList,
    isLogin,

}