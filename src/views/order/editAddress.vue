<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="false"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="addressInfo"
      @save="onSave"
    />

  </div>

</template>
<script>
import Vue from 'vue'
import { AddressEdit } from 'vant'
import { Toast } from 'vant'
import areaList from '../../utils/area'
import { mapGetters } from 'vuex'
import { getAddress, setAddress } from '@/utils/auth'
import { addAddress, findAddressById, updateAddress } from '../../api/address'

Vue.use(AddressEdit)
Vue.use(Toast)

export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'guid'
    ])
  },
  created() {
    // this.getParams()
    this.addressInfo = JSON.parse(getAddress())[0]
  },
  methods: {
    onSave(content) {
      const data = content
      // const id = data.id
      // console.log('data.id: ', data.id)
      data.user_guid = this.guid
      // const defaultOrNot = data.isDefault
      updateAddress(data).then(res => {
        if (res.code === 200) {
          Toast.success('修改成功')
          setAddress(res.data)
          setTimeout(() => {
            this.$router.go(1)
          }, 300)
        } else {
          Toast.fail(res.message)
        }
      })

      // if (typeof id !== 'undefined') {
      //   updateAddress(data, defaultOrNot).then(res => {
      //     if (res.code === 200) {
      //       this.$router.push({ path: '/order/addressList',
      //         query: {
      //           id: id
      //         }})
      //       Toast.success('修改成功')
      //     } else {
      //       Toast.fail(res.message)
      //     }
      //   })
      // } else {
      //   addAddress(data).then(res => {
      //     if (res.code === 200) {
      //       Toast.success('添加成功')
      //       this.$router.go(1)
      //     } else {
      //       Toast.fail(res.message)
      //     }
      //   })
      // }
    },

    getParams() {
      // 取到路由带过来的参数
      const routerParams = this.$route.query
      this.addressInfo.id = routerParams.id
      findAddressById(routerParams.id).then(res => {
        if (res.code == '0000') {
          this.addressInfo = res.data
          if (res.data.deafult == 1) {
            this.addressInfo.isDefault = true
          }
        }
      })
    }
  }
}
</script>
