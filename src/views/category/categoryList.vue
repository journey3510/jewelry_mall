<template>
  <div>
    <van-search
      v-model="word"
      placeholder="请输入搜索关键词"
      input-align="center"
      @search="onSearch"
      @cancel="onCancel"
    />

    <!-- 列表 -->
    <goodsList class="goodsList" :option-id="optionId" :title="title" :type="type" :category="category" :search="word" />
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
  name: 'CategoryList',
  components: {
    goodsList
  },
  data() {
    return {
      optionId: '',
      title: '',
      category: '',
      type: 'goods',
      word: ''
    }
  },

  created() {
    if (this.$route.params.search_word !== undefined) {
      this.word = this.$route.params.search_word
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
