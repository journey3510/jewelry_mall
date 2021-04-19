<template>
  <div id="app">
    <div v-if="$route.meta.head" class="header-nav">
      <headerNav :title="$route.meta.title" />
    </div>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
        <!-- 这里是会被缓存的视图组件 -->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>

    <div class="tab-bar">
      <Tabbar v-if="$route.meta.layout" style="z-index: 888888 !important" />
    </div>
  </div>
</template>
<script>
import Tabbar from './components/tabBar/index'
import headerNav from './components/headerNav/index'

export default {
  name: 'App',
  components: {
    Tabbar,
    headerNav
  },
  provide() {
    return {
      // reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
    .tab-bar {
        width: 100%;
        height: 60px;
    }

    .header-nav {
        width: 100%;
        height: 46px;

    }
</style>

