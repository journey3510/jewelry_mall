
// 一些全局的config配置
const config = {
  speciesList: [
    {
      'id': 1,
      'name': '材质'
    },
    {
      'id': 2,
      'name': '类型'
    },
    {
      'id': 3,
      'name': '系列'
    }
  ],
  speciesOptions: [
    [{
      'id': 1,
      'speciesId': 1,
      'name': '黄金',
      'cateImg': require('@/assets/images/item/ring.jpg')
    },
    {
      'id': 2,
      'speciesId': 2,
      'name': '铂金',
      'cateImg': require('@/assets/images/item/铂金.jpg')
    },
    {
      'id': 3,
      'speciesId': 3,
      'name': '钻石',
      'cateImg': require('@/assets/images/item/钻石.jpg')
    }, {
      'id': 4,
      'speciesId': 4,
      'name': '宝石',
      'cateImg': require('@/assets/images/item/宝石.jpg')
    },
    {
      'id': 5,
      'speciesId': 5,
      'name': '翡',
      'cateImg': require('@/assets/images/item/翡.jpg')
    }, {
      'id': 6,
      'speciesId': 6,
      'name': 'K金',
      'cateImg': require('@/assets/images/item/K金.jpg')
    },
    {
      'id': 7,
      'speciesId': 7,
      'name': '珍珠',
      'cateImg': require('@/assets/images/item/珍珠.jpg')
    }],
    [{
      'id': 1,
      'speciesId': 1,
      'name': '戒指',
      'cateImg': require('@/assets/images/item/ring.jpg')
    },
    {
      'id': 2,
      'speciesId': 2,
      'name': '项链',
      'cateImg': require('@/assets/images/item/torque.jpg')
    },
    {
      'id': 3,
      'speciesId': 3,
      'name': '吊坠',
      'cateImg': require('@/assets/images/item/pendant.jpg')
    }, {
      'id': 4,
      'speciesId': 4,
      'name': '耳环',
      'cateImg': require('@/assets/images/item/earrings.jpg')
    },
    {
      'id': 5,
      'speciesId': 5,
      'name': '手链/脚链',
      'cateImg': require('@/assets/images/item/1404zvfr20.jpg')
    },
    {
      'id': 6,
      'speciesId': 6,
      'name': '手镯',
      'cateImg': require('@/assets/images/item/bracelet.jpg')
    }],
    []

  ]
}

const carouselList = [
  {
    'id': 1,
    'name': '轮播图1',
    'url': 'http://ftp.52jdk.com/banner-5.jpg',
    'type': 1,
    'enable': 1,
    'createTime': '2019-12-30T13:50:05.000+0000',
    'updateTime': '2020-10-09T05:40:40.000+0000'
  },
  {
    'id': 2,
    'name': '轮播图2',
    'url': 'http://ftp.52jdk.com/banner-7.jpg',
    'type': 1,
    'enable': 1,
    'createTime': '2020-01-02T02:47:05.000+0000',
    'updateTime': '2020-10-09T02:07:05.000+0000'
  },
  {
    'id': 3,
    'name': '轮播图3',
    'url': 'http://ftp.52jdk.com/banner-8.jpg',
    'type': 1,
    'enable': 1,
    'createTime': '2020-01-02T02:47:10.000+0000',
    'updateTime': '2020-10-09T02:07:08.000+0000'
  },
  {
    'id': 4,
    'name': '轮播图4',
    'url': 'http://ftp.52jdk.com/banner-9.jpg',
    'type': 1,
    'enable': 1,
    'createTime': '2020-01-02T02:47:13.000+0000',
    'updateTime': '2020-10-09T02:07:10.000+0000'
  }
]

// 商品保障
const productRightsList = [
  {
    'id': 1,
    'type': 2,
    'icon': require('@/assets/images/home.png'),
    'describe': '全站自营'
  },
  {
    'id': 2,
    'type': 2,
    'icon': require('@/assets/images/dianfei.png'),
    'describe': '正品货源'
  },
  {
    'id': 3,
    'type': 2,
    'icon': require('@/assets/images/jiaotongfakuan.png'),
    'describe': '权威鉴定'
  },
  {
    'id': 4,
    'type': 2,
    'icon': require('@/assets/images/wuliu.png'),
    'describe': '顺丰配送'
  },
  {
    'id': 5,
    'type': 1,
    'icon': require('@/assets/images/licai.png'),
    'describe': '假一赔十，100%保证'
  }
]

module.exports = {
  config,
  productRightsList,
  carouselList
}
