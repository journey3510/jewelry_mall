<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-for="(items,index) in orderList" :key="index" class="order-table">
          <div class="order-id-time">
            <div class="order-id">
              <a> 订单编号: <span style="color: #66ccff">{{ items.order_num }}</span></a>
            </div>
            <div class="order-time">
              <a> {{ items.order_time | timestampToTime }}</a>
            </div>
          </div>

          <div
            v-for="(child, index1) in items.orderinfo"
            :key="index1"
            class="order-product-simple"
          >
            <div class="order-product-simple-img">
              <img :src="child.item_info.item_img" height="80" width="80" alt="">
              <a>{{ child.item_info.name }}</a>
            </div>
            <div class="order-product-number">
              <a style="color: red;font-weight: bolder" class="order-product-price">&yen;
                {{ child.item_info.price }}</a>
              <br>
              <br>
              <a>X {{ child.quantity }}</a>
            </div>
          </div>

          <div v-if="items.status == 1" :class="items.status == 1 ? 'order-product-count':'order-need-to-pay'">
            共
            <a style="color: red;font-weight: bolder">{{ }}</a>
            <span>{{ items.total_num }}件商品,应付总额:</span>
            <a style="color: red;font-weight: bolder">&yen;{{ items.money }}</a>
            <van-button class="pay-button" type="default" color="#DD1A21" @click="topay(items.order_num)">支付</van-button>
          </div>
          <div v-if="items.status == 2" class="order-product-count">
            共
            <a style="color: red;font-weight: bolder">{{ }}</a>
            <span>{{ items.total_num }}件商品,共付额:</span>
            <a style="color: red;font-weight: bolder">&yen;{{ items.money }}</a>
          </div>
          <div v-if="items.status == 3" class="order-product-count">
            共
            <a style="color: red;font-weight: bolder">{{ }}</a>
            <span>{{ items.total_num }}件商品,共付额:</span>
            <a style="color: red;font-weight: bolder">&yen;{{ items.money }}</a>
            <van-button v-if="items.status == 3" class="pay-button" type="default" color="#DD1A21" @click="receipt(items.order_num)">确定收货</van-button>
          </div>
          <div v-if="items.status == 4" class="order-product-count">
            共
            <a style="color: red;font-weight: bolder">{{ }}</a>
            <span>{{ items.total_num }}件商品,共付额:</span>
            <a style="color: red;font-weight: bolder">&yen;{{ items.money }}</a>
            <van-button v-if="items.status == 4" class="pay-button" type="default" color="#DD1A21" @click="evaluation(items.order_num)">去评价</van-button>
          </div>

        </div>
      </van-list>
    </van-pull-refresh>
  </div>

</template>
<script>
import Vue from 'vue'

import { Dialog, Toast, CountDown, Button } from 'vant'

import { findOrderList, orderPay, receipt } from '../../api/order'

import { mapGetters } from 'vuex'
import { timestampToTime } from '@/utils/data'

Vue.use(CountDown)
Vue.use(Button)

export default {
  name: 'OrderSimpleList',
  filters: {
    timestampToTime(val) {
      return timestampToTime(val)
    }
  },
  props: ['status'],
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 5,
      error: false,
      pageNumber: 1,
      active: 0,
      total: 1,
      orderList: [
        {
          order: {
            order_num: '',
            timeStr: '',
            orderStatus: 0,
            payAmount: '',
            totalNum: 0,
            number: 0
          },
          time: 0,
          orderLine: {
            productName: '',
            price: '',
            quantity: ''
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['guid'])
  },
  mounted() {
    this.onLoad()
  },
  methods: {

    onLoad() {
      this.loading = true
      const data = {
        user_guid: this.guid,
        status: this.status,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }
      findOrderList(data).then(res => {
        if (res.code === 200) {
          const list = res.data || []
          for (let i = 0; i < list.length; i++) {
            list[i].orderinfo = JSON.parse(list[i].orderinfo)
          }

          if (list == null) {
            this.finished = true
            return
          }
          if (list.length < this.pageSize) {
            this.orderList = list
            this.finished = true
            return
          } else {
            if (this.pageNumber > 1) {
              this.orderList = [...this.orderList, ...list]
            } else {
              this.orderList = list
            }
            this.pageNumber++
          }
          this.total = list[0].total
        } else {
          this.error = true
        }
        this.loading = false
      })
    },

    getListParams() {
      this.active = this.$route.params.active
    },
    topay(order_num) {
      Dialog.confirm({
        title: '确认支付',
        message: '弹窗内容'
      })
        .then(() => {
          orderPay({ 'order_num': order_num }).then(res => {
            if (res.code) {
              Toast.success('支付成功')
              setTimeout(() => {
                this.onLoad()
              }, 300)
            } else {
              Toast.fail('支付失败')
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },

    // 订单收货
    receipt(order_num) {
      receipt({ order_num }).then(res => {
        if (res.code === 200) {
          Toast.success('收货成功')
          setTimeout(() => {
            this.onLoad()
          }, 300)
        }
      })
    },
    evaluation(order_num) {
      Toast('正在开发中')
    },
    beforeChange(index) {
    },

    onRefresh() {
      // 清空列表数据
      this.orderList = []
      this.pageNumber = 1
      this.finished = false
      this.onLoad()
      this.refreshing = false
    }
  }
}
</script>
<style>

.order-table {
  background-color: white;
  margin-top: 20px;
  width: 100%;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  min-height: 185px
}

.order-product-simple {
  height: 105px;
  background-color: #F5F5F5;
}

.order-product-number {
  width: 25%;
  float: left;
  height: 50%;
  text-align: right;
  margin-top: 30px;

}

.order-product-price {
  padding-top: 20px;
}

.order-product-simple-img {
  width: 70%;
  padding-top: 14px;
  padding-left: 3%;
  float: left;

}

.order-product-number a {
  font-size: 14px;

}

.order-product-simple-img img {
  vertical-align: -50px;
}

.order-product-simple a {
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  margin-left: 10px;
  padding-top: -20px;
}

.order-need-to-pay {
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  line-height: 44px;
  font-size: 14px;
  width: 95%;
}

.order-product-count {
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  line-height: 44px;
  font-size: 14px;
  text-align: right;
  width: 95%;
}

.order-id-time {
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}

.order-id {
  width: 54%;
  float: left;
  margin-left: 3%;
}

.pay-button {
  width: 90px;
  height: 30px;
  margin-left: 20px;
  float: right;
  margin-top: 6px;
  color: white;
}

.order-time {
  width: 40%;
  float: left;;
}
</style>
