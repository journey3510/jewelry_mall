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
            <div class="order-product-simple-img" @click="toGoods(child.item_guid)">
              <img :src="child.item_info.item_img" height="80" width="80" alt="">
              <a>{{ child.item_info.name }}</a>
            </div>
            <div class="order-product-number">
              <div>
                <p style="color: red;font-weight: bolder" class="order-product-price">
                  &yen;
                  {{ child.item_info.price }}
                </p>

                <br>
                <a>X {{ child.quantity }}</a>
              </div>

              <div v-if="items.status == 4" class="evaluation_div">
                <van-button
                  v-if="child.commentStatus == undefined"
                  class="evaluation_btn"
                  type="default"
                  @click="evaluation(child.item_guid, items.order_num)"
                >评价</van-button>
                <van-button
                  v-else
                  class="evaluation_btn"
                  type="default"
                  disabled
                >已评</van-button>
              </div>
            </div>
            <!--  -->
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
      pageSize: 4,
      error: false,
      pageNumber: 1,
      active: 0,
      total: 1,
      orderList: []
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
          this.orderList = [...this.orderList, ...list]
          this.pageNumber++

          if (list.length < this.pageSize) {
            this.finished = true
            this.loading = false
            return
          }
        } else {
          this.error = true
        }
        this.loading = false
      })
    },
    toGoods(item_guid) {
      this.$router.push({
        name: 'detail',
        params: { id: item_guid }
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
                this.onRefresh()
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
            this.onRefresh()
          }, 300)
        }
      })
    },
    evaluation(item_guid, order_num) {
      this.$router.push({ path: '/message',
        query: {
          order_num,
          item_guid
        }

      })
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
<style lang="less" scoped>

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
  display: flex;
  justify-content: space-between;

}

.order-product-number {
  // width: 30%;
  float: left;
  height: 50%;
  text-align: right;
  margin-top: 30px;
  margin-right: 7px;

  /*  */
  display: flex;
  justify-content: flex-end;

  .evaluation_div {
    display: flex;
    align-content: center;
    align-items: center;

    .evaluation_btn {
      // width: 50px;
      height: 25px;
      margin-left: 10px;
      font-size: 12px;
    }
  }

}

.order-product-price {
  /* padding-top: 20px; */
}

.order-product-simple-img {
  // width: 65%;
  padding-top: 14px;
  padding-left: 3%;
  // float: left;

}

.order-product-number p {
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
