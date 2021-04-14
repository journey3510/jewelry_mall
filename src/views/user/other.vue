<template>
  <div class="other-center">
    <div class="other-icon">
      <van-grid :column-num="3" :border="false">
        <van-grid-item url="" to="/order/editAddress">
          <i class="iconfont icondizhi" style=" font-size: 25px;color: #A3C3EE" />
          <span class="van-grid-item__text">地址</span>
        </van-grid-item>
        <van-grid-item url="">
          <i class="iconfont iconshezhi1" style=" font-size: 25px;color: #E55050" />
          <span class="van-grid-item__text">设置</span>
        </van-grid-item>
        <van-grid-item url="" @click="showContactPopup">
          <i class="iconfont iconlianxi" style=" font-size: 25px;color: #F9D194" />
          <span class="van-grid-item__text">联系</span>
        </van-grid-item>

      </van-grid>
    </div>
    <van-popup v-model="show">
      <van-image src="" alt="" />
    </van-popup>

    <van-popup v-model="showContact">
      <van-image :src="img" alt="" />
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import { Grid, GridItem, Toast } from 'vant'
import { Popup } from 'vant'

Vue.use(Popup)
Vue.use(Grid)
Vue.use(GridItem)

export default {
  name: 'Other',
  data() {
    return {
      show: false,
      showContact: false,
      img: require('../../assets/images/weixing.jpg')
    }
  },
  methods: {
    onImgClick() {
      Toast('coding... 请选择其他内容')
    },
    showPopup() {
      this.show = true
    },
    showContactPopup() {
      this.showContact = true
    }
  }
}
</script>

<style>

    .other-center {
        width: 94%;
        height: 90px;
        margin-left: 3%;
        border-radius: 10px;
        background-color: white;
    }

    .other-icon {
        padding-top: 1px;
    }

    .van-grid-item__text {
        margin-top: 4px;
    }
</style>
