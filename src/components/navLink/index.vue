<template>
  <div class="navLink-class">
    <div
      :class="(buttonList.type == &quot;2&quot; ? &quot;cap-image-ad__image-nav&quot; : &quot;cap-image-ad__slide cap-image-ad__text-nav nav-link&quot;)"
      :style="&quot;overflow-x:hidden; background-color:&quot;+buttonList.backgroundcolor"
    >
      <div
        v-for="(item,index) in buttonList"
        :key="index"
        class="image-wrapper"
        :style="'width:'+ width+'%; margin-right: 0px;'"
      >
        <router-link
          to="/goods/detail"
          class="cap-image-ad__link cap-image-ad__link--image-nav"
        >
          <div class="cap-image-ad__image">
            <img :src="item.url" style="width: 100%; ">
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { swiperList } from '../../api'

export default {
  props: {
    data: Object
  },
  data() {
    return {
      buttonList: [],
      height: 0,
      width: 20
    }
  },
  created() {
    const type = 2
    swiperList(type).then(res => {
      this.buttonList = res.data
      this.width = 20
    })
  },
  methods: {

  }
}
</script>

<style>
    .nav-link{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .navLink-class{
      background: #FFFFFF;
    }
</style>
