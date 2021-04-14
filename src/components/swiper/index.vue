<template>
  <div class="swiper-class">
    <van-swipe
      :autoplay="3000"
      :style="'height:' + height + 'px'"
    >
      <van-swipe-item
        v-for="(image, index) in whellList"
        :key="index"
      >
        <a v-if="image.type == '1'" @click="onclickImg(index)">
          <img style="width: 100%;" :src="image.url">
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
// import { swiperList } from '../../api'
import { carouselList } from '@/config/index'

import { Toast } from 'vant'
export default {
  props: {
    data: Object
  },
  data() {
    return {
      whellList: carouselList,
      height: 0
    }
  },
  created() {
    // this.getSwiperList()
    console.log('whellList: ', this.whellList)
  },
  methods: {

    onclickImg(index) {
      Toast('这是banner ' + index + ' 哦')
    }
  }
}
</script>
<style>
.swiper-class{
  background: #F5F5F5 !important;
}
</style>
