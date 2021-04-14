<template>
  <div class="cart-container" />
</template>
<script>
import Vue from 'vue'
import { Toast } from 'vant'
import { Tag } from 'vant'
import { mapGetters } from 'vuex'

Vue.use(Tag)
Vue.use(Toast)
// import { addCart, addCartNum, deleteCart, findCart, selectCart } from '../../api/cart'

export default {
  inject: ['reload'],
  components: {},
  computed: {
    ...mapGetters([
      'guid',
      'avatar',
      'name'
    ])
  },
  data() {
    return {
      time: ''
    }
  },
  created() {
    this.time = setInterval(() => {
      this.getMessage()
    }, 3000)
  },
  destroyed() {
    clearInterval(this.time)
  },
  methods: {
    getMessage() {
    }
  }
}
</script>
<style lang="less">

</style>
