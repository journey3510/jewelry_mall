<template>
  <div class="cart-container">

    <van-field
      v-model="message"
      rows="5"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <div style="margin: 20px auto 20px;width: 100%;text-align: center;">
      <van-button
        style="widtth: 100px;"
        round
        type="danger"
        @click="messageSend"
      >提交</van-button>

    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button, Toast } from 'vant'
import { mapGetters } from 'vuex'
import { addComment } from '@/api/user'

Vue.use(Toast)
Vue.use(Button)

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
      time: '',
      message: '',
      order_num: '',
      item_guid: ''
    }
  },
  created() {
    this.item_guid = this.$route.query.item_guid
    this.order_num = this.$route.query.order_num
  },
  destroyed() {
    // clearInterval(this.time)
  },
  methods: {
    messageSend() {
      if (this.message === '') {
        Toast('不能为空')
        return
      }
      const data = {
        item_guid: this.item_guid,
        order_num: this.order_num,
        user_guid: this.guid,
        text: this.message
      }
      addComment(data).then(res => {
        if (res.code === 200) {
          Toast.success('成功提交')
          setTimeout(() => {
            this.$router.push('/order/orderList')
          }, 300)
        }
      })
    }
  }
}
</script>
<style lang="less">

</style>
