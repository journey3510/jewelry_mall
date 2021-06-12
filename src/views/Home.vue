<template>
  <div>
    <van-search
      v-model="search_word"
      placeholder="请输入搜索关键词"
      input-align="center"
      @search="onSearch"
      @cancel="onCancel"
    />

    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      mode="closeable"
      left-icon="volume-o"
      text="新的商品上架了，快来看看"
    />

    <goodsList class="goodslist" :title="'最新商品'" :type="'goods'" />
  </div>
</template>

<script>

import goodsList from '../components/goods/list'

import { Swipe, SwipeItem } from 'vant'

Vue.use(Swipe)
Vue.use(SwipeItem)

import Vue from 'vue'
import { Toast } from 'vant'
import { NoticeBar } from 'vant'
Vue.use(Toast)
Vue.use(NoticeBar)
export default {
  name: 'Home',
  components: {
    goodsList
  },
  data() {
    return {
      search_word: '',
      type1: 'goods',

      list: []
    }
  },
  computed: {

  },
  created() {
    // this.load()
  },
  mounted() {

  },
  methods: {
    onImgClick() {
      Toast('coding... 请选择其他商品')
    },
    onSearch(val) {
      if (val !== '') {
        this.$router.push({
          name: 'categoryList',
          params: { 'search_word': this.search_word }
        })
      }
    },
    onCancel() {
      Toast('取消')
    }

  }
}
</script>

<style lang="less" scoped>
  .banner-img{

    border-radius: 10px;
    background: #F5F5F5 !important;
    img{
      width: 100%;
      height:100%;
    }
  }
  .goodslist /deep/ .goods-item {
    margin-bottom: 20px;
  }

  //
    .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

</style>
