<template>

  <div class="detail-container">
    <!-- 轮播图 -->
    <div class="goods-image">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image">
        </van-swipe-item>
      </van-swipe>
    </div>
    <hr style="color: red;">
    <!-- 商品信息 -->
    <div class="goods-detail">
      <div class="h3">{{ goodsDetail.name }}</div>
      <div class="price">
        <div style="font-size: 15px;color : #ee0000;margin-top: 10px;">
          <span v-if="goodsDetail.type == 1" class="labelshow">戒指</span>
          <span v-if="goodsDetail.type == 2" class="labelshow">项链</span>
          <span v-if="goodsDetail.type == 3" class="labelshow">手镯</span>
          <span v-if="goodsDetail.type == 4" class="labelshow">吊坠</span>
          <span v-if="goodsDetail.type == 5" class="labelshow">耳环</span>
          <span v-if="goodsDetail.type == 6" class="labelshow">手链</span>

          <span v-if="goodsDetail.texture == 1" class="labelshow">黄金</span>
          <span v-if="goodsDetail.texture == 2" class="labelshow">铂金</span>
          <span v-if="goodsDetail.texture == 3" class="labelshow">钻石</span>
          <span v-if="goodsDetail.texture == 4" class="labelshow">宝石</span>
          <span v-if="goodsDetail.texture == 5" class="labelshow">翡翠</span>
          <span v-if="goodsDetail.texture == 6" class="labelshow">K金</span>
          <span v-if="goodsDetail.texture == 7" class="labelshow">珍珠</span>
        </div>

        <div style="margin-bottom: 15px;">
          <span>￥</span>
          <span>{{ parseFloat(goodsDetail.price).toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- 商品保障 -->
    <div class="goods-content">
      <div class="item-top">
        <div class="text">假一赔十，100%保证</div>
      </div>

      <div class="goods-banner">
        <div v-for="(item, index) in productRightsList" :key="index">
          <div v-if="item.type == '2'" class="item">
            <div class="icon">
              <img :src="item.icon" alt>
            </div>
            <div class="text">{{ item.describe }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="首页" to="/" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" />
      <van-goods-action-button v-if="goodsDetail.status == 1" type="warning" text="加入购物车" @click="showBaseFun" />
      <van-goods-action-button v-if="goodsDetail.status == 1" type="danger" text="立即购买" @click="showBaseFun" />
      <van-goods-action-button v-else type="danger" text="已下架" color="#ccc" disabled />
    </van-goods-action>

    <div class="goods-title">
      <div class="after" />
      商品评价
    </div>

    <!-- 商品评价  -->
    <p
      v-if="access.length == 0"
      style="width: 90%;background: #fff;margin: 0 auto 10px;padding: 5px 5px;"
    >暂无</p>
    <div v-for="(item,index) in access" :key="index" class="access">
      <div class="access-user">
        <div class="access-head">
          <img
            round
            width="40px"
            height="40px"
            :src="item.avatar_img"
          >
        </div>
        <div class="access-name">
          <p style="margin-bottom: 5px;">{{ item.username }}</p>
          <p>{{ item.add_time | timestampToTime }}</p>
        </div>
      </div>
      <div class="access-text">
        <p style="font-size: 14px;">{{ item.text }}</p>
      </div>
    </div>
    <hr>
    <!--  -->
    <div class="goods-title">
      <div class="after" />
      商品详情
    </div>

    <div class="product-detail">
      <img v-for="img in detailImg" :key="img" v-lazy="img" width="100%" height="100%" alt="">
    </div>

    <!-- 添加入购物车 -->
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="productId"
      :hide-stock="true"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />

  </div>
</template>
<script>
import Vue from 'vue'
import { goodsDetail, goodsComment } from '../../api/goods'
import { addCart } from '../../api/cart'
import { Lazyload, Rate, Toast } from 'vant'
import { mapGetters } from 'vuex'

import {
  setTempOrder
} from '@/utils/auth'

Vue.use(Toast)
Vue.use(Rate)
Vue.use(Lazyload)

import { productRightsList } from '@/config/index.js'
import { timestampToTime } from '@/utils/data'

export default {
  filters: {
    timestampToTime(val) {
      return timestampToTime(val)
    }
  },
  data() {
    return {
      images: [],
      access: [],
      detailImg: [],
      value: 5,
      goodsDetail: {
        pictureUrl: '',
        marketPrice: 0
      },
      showBase: false,

      sku: {
        tree: [],
        list: [],
        price: 0,
        stock_num: 0
      },
      goods: {
        picture: ''
      },
      goodsId: '',

      // 图标
      productRightsList: productRightsList
    }
  },
  computed: {
    ...mapGetters(['guid'])
  },
  created() {
    parseInt
    const { id } = this.$route.params
    this.productId = id
    if (typeof (id) === 'undefined') {
      this.productId = JSON.parse(localStorage.getItem('productId'))
    } else {
      const obj = JSON.stringify(id) // 转化为JSON字符串
      localStorage.setItem('productId', obj) // 数据存storage，防止刷新丢失
    }
    this.getGoodsList()
    this.getComment()
  },
  methods: {
    showBaseFun() {
      if (this.guid === '' || this.guid === undefined) {
        this.$router.push('/login')
        return
      }
      this.showBase = true
    },
    getComment() {
      goodsComment({ 'item_guid': this.productId }).then(res => {
        this.access = res.data
      })
    },

    // 直接购买
    onBuyClicked(data) {
      const item_array = []
      const obj = {}
      obj.item_guid = data.goodsId
      obj.quantity = data.selectedNum
      item_array.push(obj)
      setTempOrder(item_array)
      this.$router.push({ path: '/order/createOrder' })
    },

    // 添加入购物车
    onAddCartClicked(data) {
      const info = {
        'user_guid': this.guid,
        'item_guid': data.goodsId,
        'quantity': data.selectedNum
      }
      addCart(info).then(res => {
        if (res.code === 200) {
          Toast.success(res.data)
        } else {
          Toast.fail(res.data)
        }
      })
      this.showBase = false
    },

    // 获取商品信息
    getGoodsList() {
      goodsDetail({ guid: this.productId }).then(res => {
        this.goodsDetail = res.data
        this.images = JSON.parse(res.data.rollImg)
        this.detailImg = JSON.parse(res.data.rollImg)
        this.goods.picture = res.data.item_img
        this.sku.price = res.data.price
        // 库存
        this.sku.stock_num = res.data.remain
      })
    }
  }
}
</script>
<style lang="less" scope>
.goods-title {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 13px;
  box-sizing: border-box;
  width: 132px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(151, 118, 80, 1);

  .after {
    width: 3px;
    height: 11px;
    background: linear-gradient(0deg, rgba(255, 212, 145, 1), rgba(212, 157, 70, 1));
    border-radius: 2px;
    margin-right: 13px;
  }
}

.detail-container {
  background-color: #f5f5f5;

  .goods-detail {
    // width: 375px;
    height: 80px;
    background-color: #fff;
    padding: 11px 19px 21px 12px;
    color: #333;
    box-sizing: border-box;

    .h3 {
      width: 100%;
      font-size: 15px;
      font-weight: 500;
      text-overflow: -o-ellipsis-lastline;
      /*overflow: hidden;*/
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
    }

    .h6 {
      width: 100%;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }

  .goods-image {
    img {
      // width: 375px;
      width: 100%;
      display: block;
    }
  }
}

.goods-content {
  width: 100%;
  height: 75px;
  background-color: #fff;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.goods-banner {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;

    img {
      width: 15px;
      height: 15px;
      display: block;
      margin-right: 10px;
    }
  }
}

.item-top {
  color: rgba(85, 60, 31, 1);
  font-weight: bold;
  font-size: 15px;
  flex: 1;
  display: flex;
  align-items: center;
}

.goods-rule {
  width: 100%;
  height: 85px;
  background-color: #fff;
  padding: 0 12px;
  box-sizing: border-box;
  margin-bottom: 10px;

  .select,
  .params {
    height: 42px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    font-size: 13px;

    .div1 {
      width: 36px;
      height: 100%;
      line-height: 42px;
      font-weight: 500;
      color: rgba(120, 120, 120, 1);
    }

    .div2 {
      flex: 1;
      height: 100%;
      line-height: 42px;
      color: rgba(51, 51, 51, 1);
    }

    .van-icon-arrow {
      height: 100%;
      line-height: 42px;
    }
  }

  .params {
    border: none !important;
  }
}

.detail-img {
  width: 200px;
  height: 200px;
}

.access-head {
  width: 50px;
}

.access-name {
  width: 120px;
  margin-top: -38px;
  margin-left: 50px;
  color: #999999;
}

.access-text {
  margin-top: 12px;
  margin-left: 50px;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: #fff;
  padding: 5px 5px;
  // line-break: ;
  word-break: break-all;

}

.price {
  font-size: 25px;
  color: red;
  display: flex;
  justify-content: space-between;

}

.labelshow {
margin-right: 25px;
border-color: red;
padding: 0 5px 0 5px;
border: solid 1px red;
border-radius: 4px;
}

.access-img {
  margin-top: 10px;
  margin-left: 10px;
}

.access {
  border-bottom: 2px solid #fff;
  margin-top: 3px;
}

</style>
