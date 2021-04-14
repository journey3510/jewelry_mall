<template>
  <div>
    <!-- <div>
      <van-sticky>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </van-sticky>
    </div> -->

    <van-search
      v-model="search_word"
      placeholder="请输入搜索关键词"
      input-align="center"
      @search="onSearch"
      @cancel="onCancel"
    />

    <!-- 列表 -->
    <div>
      <goodsList class="goodsList" :option-id="optionId" :title="title" :type="type" :category="category" :search="word" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { DropdownMenu, DropdownItem, Toast } from 'vant'
import goodsList from '@/components/goods/list'

import { Sticky } from 'vant'

Vue.use(Sticky)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

export default {
  components: {
    goodsList
  },
  data() {
    return {
      optionId: '',
      title: '',
      category: '',
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      type: 'goods',
      search_word: '',
      word: ''
    }
  },

  created() {
    // console.log('this.$route.params.search_word: ', typeof this.$route.params.search_word)
    if (this.$route.params.search_word !== undefined) {
      this.search_word = this.$route.params.search_word
      this.type = 'search'
      this.title = '搜索结果'
      return
    }
    this.optionId = this.$route.params.optionId
    this.title = this.$route.params.title
    this.category = this.$route.params.category
    this.type = 'goods'
  },
  methods: {
    onSearch(val) {
      this.type = 'search'
      this.word = val
    },
    onCancel() {
      Toast('取消')
    }
  }

}
</script>

<style lang="less" scoped>
  .goodslist /deep/ .goods-item {
    margin-bottom: 20px;
  }
</style>
