<template>
  <div>
    <div>
      <van-tabs v-model="active" :before-change="beforeChange(active)">
        <van-tab title="待付款">
          <orderSimpleList :key="timer" :status="1" class="orderSimpleList" />
        </van-tab>

        <van-tab title="待发货">
          <orderSimpleList :key="timer" :status="2" class="orderSimpleList" />
        </van-tab>
        <van-tab title="待收货">
          <orderSimpleList :key="timer" :status="3" class="orderSimpleList" />

        </van-tab>
        <van-tab title="待评价">
          <orderSimpleList :key="timer" :status="4" class="orderSimpleList" />

        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>
<script>

import { Tab, Tabs } from 'vant'
import Vue from 'vue'
import { mapGetters } from 'vuex'

import { Cell, CellGroup } from 'vant'
import { Divider } from 'vant'
import orderSimpleList from './orderSimpleList'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, { name: 'v-touch' })

Vue.use(Divider)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tab)
Vue.use(Tabs)
export default {
  components: {
    orderSimpleList
  },

  data() {
    return {
      status: 0,
      list: [],
      timer: '',
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 4,
      error: false,
      pageNumber: 1,
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'guid'
    ])
  },
  created() {
    this.getListParams()
  },
  methods: {
    getListParams() {
      this.active = this.$route.params.active
    },
    handleLoad() {
      this.timer = new Date().getTime()
    },
    getList() {

    },
    beforeChange(index) {
      this.status = index
    }
  }
}
</script>
<style>
.orderSimpleList {
  height: 185px;
  min-height: 185px
}

</style>
