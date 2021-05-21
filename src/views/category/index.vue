
<template>
  <!-- 商品类型筛选 -->
  <div>
    <!-- 商品侧边栏 -->
    <div class="sidebar">
      <van-sidebar v-model="activeKey">
        <div v-for="(item,index) in speciesList" :key="index">
          <van-sidebar-item :title="item.name" @click="click(item.id)" />
        </div>
      </van-sidebar>
    </div>

    <div class="grid">
      <van-grid :border="false" :column-num="2">
        <div v-for="(item,index) in speciesOptions" :key="index" class="grid-text">
          <van-grid-item
            :to="{
              name:'categoryList',
              params:{
                optionId:item.id,
                title:item.name,
                category: id
              }
            }"
          >
            <van-image :src="item.cateImg" width="50px" height="50px" />
          </van-grid-item>
          <div class="grid-text-a">
            <a>{{ item.name }}</a>
          </div>

        </div>
      </van-grid>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sidebar, SidebarItem } from 'vant'
import { Notify } from 'vant'
import { Grid, GridItem } from 'vant'

import { config } from '@/config/index.js'

import { serielist } from '@/api/goods.js'

Vue.use(Grid)
Vue.use(GridItem)
Vue.use(SidebarItem)
Vue.use(Sidebar)

export default {

  data() {
    return {
      activeKey: 0,
      id: 1,
      speciesList: config.speciesList,
      speciesOptions: config.speciesOptions[0],
      serielist: []
    }
  },
  created() {
    this.goodsSeries()
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false // 让 A 不缓存，即刷新
    next()
  },
  methods: {
    onChange(index) {
      Notify({ type: 'primary', message: index })
    },
    click(index) {
      this.id = index
      if (index !== 3) {
        this.speciesOptions = config.speciesOptions[this.id - 1]
      } else {
        this.speciesOptions = JSON.parse(JSON.stringify(this.serielist))
      }
    },
    goodsSeries() {
      serielist().then(res => {
        if (res.code === 200) {
          this.serielist = res.data
          this.serielist.forEach(element => {
            element.id = element.guid
          })
        }
      })
    }
  }
}
</script>
<style>
.sidebar {
  width: 80px;
  float: left;
}

.grid {
  margin-left: 90px;
  height: 100%;
}

.van-grid-item {
  height: 76px;

}

.grid-text {
  margin: 5px;
}

.grid-text-a {
  color: #999999;
  text-align: center;
  width: 70px;
  margin-top: 20px;
  margin-bottom: 10px;
}

</style>
