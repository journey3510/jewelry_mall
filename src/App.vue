<template>
  <div id="app">
    <div v-if="$route.meta.head" class="header-nav">
      <headerNav :title="$route.meta.title" />
    </div>

    <keep-alive>
      <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    <router-view v-if="!$route.meta.keepAlive" />

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
  data: () => ({
    include: []
  }),

  watch: {
    $route(to, from) {
      // if (to.meta.keepAlive) {
      //   !this.include.includes(to.name) && this.include.push(to.name)
      // }

      // if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
      //   const index = this.include.indexOf(from.name)
      //   index !== -1 && this.include.splice(index, 1)
      // }
    }
  },
  methods: {

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

