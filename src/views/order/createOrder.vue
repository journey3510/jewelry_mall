<template>
  <div class="order-main">
    <van-notice-bar
      left-icon="volume-o"
      text="欢迎下单"
      mode="closeable"
    />

    <!-- 地址信息 -->
    <div class="address-main">
      <div class="order-address">
        <div class="address" @click="choseAddress">
          <div class="order-address-name">
            <span>
              {{ name }}
            </span>
            <span>
              {{ phone }}
            </span>
          </div>
          <div class="order-detail-address">
            <span :style="address == ''? 'color:red;':''">{{ address | nullAddress }}</span>
          </div>
        </div>

        <div class="address-chose" @click="choseAddress">
          <van-icon name="arrow" size="16px" color="#b3b3b3" />
        </div>
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="order-product">
      <div class="order-product-img">
        <swiper class="swiper">
          <div v-for="banner in banners" :key="banner.item_guid" class="swiper-slide">
            <swiper-slide>
              <van-badge :content="banner.quantity">
                <!-- <div class="child" /> -->
                <img
                  style="border-radius:4px;"
                  :src="banner.item_info.item_img"
                  width="68px"
                  height="68px"
                >
              </van-badge>
            </swiper-slide>
          </div>
        </swiper>
      </div>
      <div class="order-product-to">
        <div class="order-product-num">
          <span>  共 {{ totalNum }}件</span>
        </div>
        <div class="order-product-icon">
          <van-icon name="arrow" size="16px" color="#b3b3b3" />
        </div>
      </div>
    </div>

    <!-- other -->
    <div class="balance-amount">
      <div class="balance-amount-detail">
        <van-cell-group :border="false">
          <van-cell title="商品金额" :border="false">
            ￥{{ totalAmount }}
          </van-cell>
          <van-cell title="运费" :border="false">
            ￥{{ 0 }}
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <!-- 支付 -->
    <div>
      <van-popup v-model="show" round>
        <div class="pay-code-div">
          <div class="wx-pay-text">
            <img src="../../assets/images/wxlog.png" width="40px" height="40px">
            <a>微信支付</a>
          </div>

          <div class="pay-code">
            <img class="code" :src="payUrl" alt="">
          </div>
          <div class="pay-warn">
            <a disabled="true">长按识别二维码支付</a>
          </div>
        </div>
        <van-button style="width: 100%;" type="primary" @click="paySuccess">支付成功</van-button>
      </van-popup>

      <!-- 底部支付栏 -->
      <van-submit-bar
        button-text="支付"
        :loading="loading"
        @submit="createOrder()"
      >
        <div class="bottom-price">
          <span> 应付：</span>
          <span style="font-size: 16px;font-weight: bolder">￥{{ payAmount }}</span>
        </div>
      </van-submit-bar>
    </div>
  </div>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Vue from 'vue'
import { } from 'vant'
import { orderSure, createOrder, orderPay } from '../../api/order'
import {
  CouponCell,
  Popup,
  Toast,
  Tag,
  CouponList,
  Badge,
  NoticeBar, Form, Dialog, Overlay } from 'vant'

import { mapGetters } from 'vuex'

import {
  setTempOrder,
  getTempOrder,
  getAddress

} from '@/utils/auth'

Vue.use(Tag)
Vue.use(Toast)
Vue.use(Overlay)
Vue.use(Form)
Vue.use(CouponCell)
Vue.use(CouponList)
Vue.use(NoticeBar)
Vue.use(Popup)
Vue.use(Badge)

export default {

  name: 'SwiperExampleResponsiveBreakpoints',
  title: 'Responsive breakpoints',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      chosenCoupon: -1,
      showList: false,
      loading: false,
      totalAmount: 0,
      addressId: 0,

      name: '',
      phone: '',
      address: '',

      show: false,
      username: '',
      password: '',
      payUrl: '',
      payAmount: 0,
      totalNum: 0,
      coupons: [],
      disabledCoupons: [],
      banners: [],
      couponDiscount: 0,
      tempOrder: []
    }
  },
  computed: {
    ...mapGetters(['guid'])
  },
  filters: {
    nullAddress(val) {
      if (val === '') {
        return '请填写地址'
      }
      return val
    }
  },
  created() {
    this.tempOrder = getTempOrder()
    // 避免 返回
    if (this.tempOrder === null || this.tempOrder === '') {
      this.$router.push({
        path: '/order/orderList'
      })
    } else {
      this.orderSure()
    }
    const address = JSON.parse(getAddress())
    if (address.length !== 0) {
      this.name = address[0].name
      this.phone = address[0].tel
      this.address = address[0].address
    }
  },

  methods: {

    showPopup() {
      this.show = true
    },
    choseAddress() {
      this.$router.push({
        path: '/order/editAddress',
        query: {
          id: this.addressId
        }
      })
    },
    createOrder() {
      if (this.address === '') {
        Toast.fail('请编辑地址')
        return
      }
      const data = {
        list: this.tempOrder,
        user_guid: this.guid,
        money: this.payAmount,
        total_num: this.totalNum,
        address: this.addres
      }

      createOrder(data).then(res => {
        if (res.code === 200) {
          const order_num = res.data
          Dialog.confirm({
            title: '确认支付',
            message: '弹窗内容'
          })
            .then(() => {
              orderPay({ order_num }).then(res => {
                if (res.code === 200) {
                  Toast.success('成功')
                  setTimeout(() => {
                    // 缓存设置空
                    setTempOrder('')
                    this.$router.push({
                      path: '/order/orderList'
                    })
                  }, 500)
                }
              })
            })
            .catch(() => {
              Toast.fail('已取消')
              // 缓存设置空
              setTimeout(() => {
                setTempOrder('')
                this.$router.push({
                  path: '/order/orderList'
                })
              }, 500)
            })
        }
      })
    },

    //  重新 付款
    orderSure() {
      const data = {
        list: this.tempOrder,
        user_guid: this.guid
      }
      orderSure(data).then(res => {
        this.banners = res.data
        for (const i in this.banners) {
          this.totalNum += this.banners[i].quantity
          this.payAmount += this.banners[i].item_info.price * this.banners[i].quantity
        }
        this.totalAmount = this.payAmount
      })
    },
    paySuccess() {
      this.$router.push({ path: '/order/orderList' })
    },
    getOrderParams() {
      // 取到路由带过来的参数
      const routerParams = this.$route.query
      // 将数据放在当前组件的数据内
      this.addressId = routerParams.id
    },
    toProduct() {
      this.$route.push({
        path: '/order/orderProduct'
      })
    }

  }
}

</script>

<style>

.order-address {
  width: 94%;
  height: 95px;
  margin-left: 3%;
  margin-top: 6%;
  padding-bottom: 2px;
  box-sizing: border-box;

  background: linear-gradient(45deg, #f25953 12.5%, #fbfaf5 12.5%, #fbfaf5 25%, #5590d6 25%, #5590d6 37.5%, #fbfaf5 37.5%, #fbfaf5 50%, #f25953 50%, #f25953 62.5%, #fbfaf5 62.5%, #fbfaf5 75%, #5590d6 75%, #5590d6 87.5%, #fbfaf5 87.5%, #fbfaf5 100%);
  background-size: 30px 30px;
}

.address-main {
  margin-left: 5%;
  width: 90%;
  height: 95px;
  border-radius: 10px;
  background: #FFF;

}

.order-product {
  margin-top: 20px;
  margin-left: 5%;
  width: 90%;
  height: 100px;
  border-radius: 10px;
  background: #FFF;
}

.address {
  width: 94%;
  height: 100%;
  float: left;
  background: #FFF;
}

.order-address-name {
  width: 100%;
  height: 50%;
  float: left;
  line-height: 60px;
  margin-left: 3%;
  background: #FFF;
}

.order-detail-address {
  margin-left: 3%;
  background: #FFF;
}

.order-address-name span {
  font-size: 16px;
  font-weight: bold;
  background: #FFF;
}

.swiper-slide {
  width: 80px;
  height: 80px;
}

.address-chose {
  width: 6%;
  height: 100%;
  float: left;
  text-align: center;
  line-height: 100px;
  background: #FFF;
}

.swiper-slide {
  width: 80px !important;
  margin-top: 10px;
}

.order-product-img {
  width: 72%;
  float: left;
  margin-left: 5px;
}

.order-product-to {
  width: 26%;
  float: left;
  font-size: 13px;
  /*position: absolute;*/
}

.order-product-num {
  width: 55%;
  float: left;
  font-size: 13px;
  height: 100%;
  margin-left: 8%;
}

.order-product-icon {
  width: 20px;
  height: 100%;
  float: left;
  text-align: center;
  line-height: 100px;
  background: #FFF;
}

.order-product-to span {
  line-height: 90px;
  /* margin-left: 10px; */
}

.pay-code-div {
  background: #25AB38;
  width: 220px;
  height: 260px;
}

.wx-pay-text {
  color: #FFFFFF;
  font-size: 30px;
  font-family: SONGTI, serif;
  width: 160px;
  height: 50px;
  margin: 0 auto;
}

.wx-pay-text img {
  vertical-align: -10px;
}

.pay-code {
  margin-left: 16%;
  margin-top: 10px;
}

.pay-warn {
  color: #FFFFFF;
  font-family: SONGTI, serif;
  font-size: 15px;
  /*margin: 0 auto;*/
  width: 150px;
  height: 20px;
  margin-top: 4px;
  margin-left: 18%;
}

.balance-amount {
  margin-top: 20px;
  margin-left: 5%;
  width: 90%;
  height: 100px;
  border-radius: 10px;
  background: #FFF;

}

.balance-amount-detail {
  padding-top: 6px;
}

.invoice {
  width: 100%;
  height: 500px;
}

.bottom-price {
  color: #E55050;
  text-align: left;
  width: 70%;
}

</style>
