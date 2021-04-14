<template>
  <div>
    <van-search
      v-model="search_word"
      placeholder="请输入搜索关键词"
      input-align="center"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- <homeSwiper /> -->
    <!-- <navLink /> -->

    <!-- <div class="banner-img">
      <img src="" alt="" @click="onImgClick">
    </div> -->

    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      mode="closeable"
      left-icon="volume-o"
      text="新的商品上架了，快来看看"
    />

    <goodsList class="goodslist" :title="'推荐商品'" :type="'goods'" />
  </div>
</template>

<script>
// import homeSwiper from '../components/swiper'
// import navLink from '../components/navLink'
import goodsList from '../components/goods/list'

import Vue from 'vue'
import { Toast } from 'vant'
import { NoticeBar } from 'vant'
Vue.use(Toast)
Vue.use(NoticeBar)
export default {
  name: 'Home',
  components: {
    // homeSwiper,
    // navLink,
    goodsList
  },
  data() {
    return {
      search_word: '',
      type1: 'goods'
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    onImgClick() {
      Toast('coding... 请选择其他商品')
    },
    onSearch(val) {
      // Toast(val)
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
    //margin: 10px;
    //height: 96px;
    border-radius: 10px;
    background: #F5F5F5 !important;
    /*overflow: hidden;*/
    img{
      width: 100%;
      height:100%;
    }
  }
  .goodslist /deep/ .goods-item {
    margin-bottom: 20px;
  }

</style>
