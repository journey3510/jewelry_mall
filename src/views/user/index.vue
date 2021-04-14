<template>
  <div class="person-center">
    <div v-if="nickname!=null" class="my-head">
      <div class="head-img">
        <img width="50px" height="50px" alt="" :src="avatar">
        <label>{{ name }}</label>
        <button @click="toLogin"> {{ loginstatus }}</button>
      </div>
    </div>

    <div class="my-order">
      <div class="my-order-cell">
        <van-cell title="我的订单" value="查看全部订单" is-link to="/order/orderList" title-class="my-order-list" size="16px" />
      </div>
      <div>
        <van-grid :border="false" icon-size="22px" :column-num="4">
          <van-grid-item icon="todo-list-o" text="待付款" url="" :badge="tobePay" :to="{ name: 'orderList', params: { active: 0 }}" />
          <van-grid-item icon="logistics" text="待发货" url="" :badge="pay" :to="{ name: 'orderList', params: { active: 1 }}" />
          <van-grid-item icon="send-gift-o" text="待收货" url="" :badge="tobeDelivered" :to="{ name: 'orderList', params: { active: 2 }}" />
          <van-grid-item icon="notes-o" text="待评价" url="" :badge="received" :to="{ name: 'orderList', params: { active: 3 }}" />
        </van-grid>
      </div>
    </div>
    <div class="swipe">
      <van-swipe>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" width="100%" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <other class="other-icon" />
  </div>
</template>

<script>
import other from './other'
import Vue from 'vue'
import { Grid, GridItem, Icon } from 'vant'
import { Cell, CellGroup } from 'vant'
import { Image as VanImage } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Lazyload, Dialog } from 'vant'
import { Divider } from 'vant'

import { personCenter } from '../../api/user'
import { mapGetters } from 'vuex'
import { setGuid, setToken, setName, setAvatar } from '@/utils/auth'

Vue.use(Divider)
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(CellGroup)

Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)

export default {
  components: { other },
  computed: {
    ...mapGetters([
      'guid',
      'avatar',
      'name'
    ])
  },
  data() {
    return {
      nickname: '',
      tobePay: '',
      pay: '',
      tobeDelivered: '',
      received: '',
      headImg: '',
      images: [
        require('../../assets/images/banner-1.jpg'),
        require('../../assets/images/banner-2.jpg')
      ],
      loginstatus: '登录'
    }
  },
  created() {
    console.log('this.guid: ', this.guid)
    if (this.guid === '' || this.guid === undefined) {
      this.loginstatus = '登录'
    } else {
      this.loginstatus = '退出'
    }
  },

  methods: {
    personCenter() {
      personCenter().then(res => {
        this.nickname = res.data.data.user.userName
        this.headImg = res.data.data.user.headImg
        if (res.data.data.tobePay > 0) {
          this.tobePay = res.data.data.tobePay
        }
        if (res.data.data.tobeDelivered > 0) {
          this.tobeDelivered = res.data.data.tobeDelivered
        }
        if (res.data.data.received > 0) {
          this.received = res.data.data.received
        }
        if (res.data.data.pay > 0) {
          this.pay = res.data.data.pay
        }
      })
    },
    goOrderList() {
      this.$router.push({ path: '/order/orderList' })
    },
    toLogin() {
      if (this.guid !== '' && this.guid !== undefined) {
        Dialog.confirm({
          title: '确认退出',
          message: '退出'
        })
          .then(() => {
            setGuid('')
            setToken('')
            setName('')
            setAvatar('')
            this.$router.go(0)
            const that = this

            this.$store.dispatch('user/FedLogOut')
              .then(() => {
                console.log('xx')
                this.toast.success('退出成功')
              }).catch(() => {

              })
          })
          .catch(() => {
          // on cancel
          })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
}

</script>
<style>

    .swipe {
        width: 94%;
        margin-left: 3%;
        margin-top: 14px;

    }

    .van-swipe {
        border-radius: 10px;
    }

    .my-order {
        width: 94%;
        margin-left: 3%;
        margin-top: 14px;
        border-radius: 10px;
        height: 120px;
        background-color: white;

    }

    .van-grid-item__content {
        padding-top: 13px !important;
    }

    .head-img label {
        padding-left: 2%;
    }

    .head-img img {
        border: 3px solid #fff;
        border-radius: 50%;
        vertical-align: -18px;
        margin-left: 6%;
    }

    .head-img button {
        border-radius: 4%;
        font-size: 12px !important;
        background-color: #bb9951;
        width: 80px;
        height: 20px;
        border: none;
        float: right;
        margin-right: 20px;
        margin-top: 15px;
    }

    .my-order-cell {
        padding-top: 8px;
    }

    .other-icon {
        margin-top: 14px;

    }

    .my-head {
        background-image: linear-gradient(to right, #dfc48e, #c4a566);
        width: 100%;
        height: 130px;
    }

    .head-img {
        padding-top: 10%;
        color: white;
        font-size: 18px;

    }

    .head-img label {
        padding-left: 2%;
    }

    .head-img img {
        border: 3px solid #fff;
        border-radius: 50%;
        vertical-align: -18px;
        margin-left: 6%;
    }

    .head-img button {
        border-radius: 4%;
        font-size: 12px !important;
        background-color: #bb9951;
        width: 80px;
        height: 20px;
        border: none;
        float: right;
        margin-right: 20px;
        margin-top: 15px;
    }

    .vip-description {
        padding-top: 10px;
        margin-left: 10%;
        width: 60%;
    }

    .vip-text {
        font-size: 16px;
        font-weight: bolder;

    }

    .vip-text img {
        vertical-align: -2px;
    }

    .vip-icon {
        float: right;
        margin-top: -35px;
        margin-right: 10px;
    }
</style>
