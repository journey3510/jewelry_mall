<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="clickItem"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { AddressList } from 'vant'

Vue.use(AddressList)

import { Toast } from 'vant'
import { findAddress } from '../../api/address'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      chosenAddressId: 0,
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'guid'
    ])
  },

  watch: {
    '$route': 'getListParams'
  },
  created() {
    this.find()
    // this.getListParams()
  },
  methods: {
    onAdd() {
      this.$router.push({
        path: '/order/editAddress'
      })
      Toast('新增地址')
    },
    onEdit(item, index) {
      this.$router.push({
        path: '/order/editAddress',
        params: {
          name: item.name,
          phone: item.tel,
          address: item.address,
          id: item.id,
          areaCode: item.areaCode
        }
      })
      Toast('编辑地址:' + index)
    },
    find() {
      findAddress({ 'user_guid': this.guid }).then(res => {
        if (res.ServerNo === 200) {
          this.list = res.data
        }
      })
    },
    clickItem(item, index) {
      this.$router.push({
        path: '/order/createOrder',
        query: {
          id: item.id
        }
      })
    },
    getListParams() {
      // 取到路由带过来的参数
      const routerParams = this.$route.query
      this.chosenAddressId = routerParams.id
    }
  }
}
</script>
