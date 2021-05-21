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
import { updateAddress } from '../../api/address'

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
    this.addressInfo = JSON.parse(getAddress())[0]
  },
  methods: {
    onSave(content) {
      const data = content
      data.user_guid = this.guid
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
    }
  }
}
</script>
