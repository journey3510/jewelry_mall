<template>
  <div class="cart-container">
    <ul class="cart-list">
      <van-checkbox-group ref="checkboxGroup" v-model="result">
        <li v-for="(item,index) in list" :key="index" class="item">
          <van-swipe-cell class="van-swipe-cell">
            <van-card
              :price="item.info.price.toFixed(2)"
              :title="item.info.name"
              :thumb="item.info.item_img"
              :sku="item.info.remain"
            >
              <div slot="num">
                <van-stepper
                  :value="item.quantity"
                  disable-input
                  :max="item.info.remain"
                  min="1"
                  async-change
                  @plus="plusAdd(item.item_guid,item.quantity,index,item.info.price)"
                  @minus="minus(item.item_guid,item.quantity,index,item.info.price)"
                />
              </div>
            </van-card>

            <div slot="right">
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="onClose(item.item_guid)"
              />
            </div>
          </van-swipe-cell>
        </li>
      </van-checkbox-group>
    </ul>

    <!-- 提交栏 -->
    <div>
      <van-submit-bar
        :price="total"
        :button-text="btn_text"
        :loading="loading"
        @submit="onSubmit"
      />
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'vant'
import { Tag } from 'vant'
import { mapGetters } from 'vuex'
import {
  setTempOrder
} from '@/utils/auth'

Vue.use(Tag)
Vue.use(Toast)
import { addCartNum, deleteCart, findCart } from '../../api/cart'

export default {
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
      check: false,
      loading: false,
      result: [],
      btn_text: '提交订单',
      stepper: 1,
      cartEntries: [],
      total: 0,
      list: []
    }
  },
  created() {
    this.getCart()
  },
  methods: {
    onSubmit() {
      if (this.list.length === 0) {
        Toast.fail('请选择商品')
      } else {
        this.loading = true
        const item_array = []
        for (let index = 0; index < this.list.length; index++) {
          const obj = {}
          obj.item_guid = this.list[index].item_guid
          obj.quantity = this.list[index].quantity
          item_array.push(obj)
        }
        setTempOrder(item_array)
        this.$router.push({ path: '/order/createOrder' })
      }
    },
    getCart() {
      const that = this
      this.total = 0
      return new Promise(function(resolve, reject) {
        findCart({ 'user_guid': that.guid }).then(res => {
          if (res) {
            that.list = res.data
            if (res.data.length === 0) {
              that.total = 0
            } else {
              for (const i in that.list) {
                that.total += that.list[i].info.price * 100 * that.list[i].quantity
              }
            }
            resolve(res)
          } else {
            reject('失败')
          }
        })
      })
    },

    onClose(item_guid) {
      deleteCart({ 'user_guid': this.guid, 'item_guid': item_guid }).then(res => {
        if (res.code === 200) {
          this.getCart()
          Toast.success('删除成功')
        } else {
          Toast.fail('删除失败')
        }
      })
    },

    // 添加数量
    plusAdd(item_guid, quantity, index, price) {
      addCartNum({ 'user_guid': this.guid, 'item_guid': item_guid, 'quantity': quantity + 1 }).then(res => {
        if (res.code === 200) {
          quantity = quantity + 1
          this.list[index].quantity = quantity
          this.total = this.total + price * 1 * 100
        } else {
          Toast.fail(res.data)
        }
      })
    },

    // 减少数量
    minus(item_guid, quantity, index, price) {
      if (this.quantity === 1) {
        Toast.fail('减少失败')
        return
      }
      addCartNum({ 'user_guid': this.guid, 'item_guid': item_guid, 'quantity': quantity - 1 }).then(res => {
        if (res.code === 200) {
          quantity = quantity - 1
          this.list[index].quantity = quantity
          this.total = this.total - price * 1 * 100
        } else {
          Toast.fail('减少失败')
        }
      })
    }
  }
}
</script>
<style lang="less">
.cart-container {
  background-color: #f5f5f5;
  padding-bottom: 50px;
}

.cart-list {
  margin: 0 12px;

  border-radius: 10px;

  .item {
    margin: 10px 0;
    background-color: #fff;
    height: 105px;
  }
}

.van-card {
  .van-checkbox {
    position: absolute;
    left: -115px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.van-loading__spinner {
  width: 20px !important;
  height: 20px !important;
}

.goods-card {
  margin: 0;
  background-color: #fff;
}

.van-swipe-cell__right {
  height: 105px;
}

.van-swipe-cell__right > div {
  height: 100%;
}

.delete-button, .warning-button {
  height: 100%;
}

/*.van-submit-bar {*/
/*    margin-bottom: 48px !important;*/
/*}*/

.van-card__tag {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.van-card {
  padding-left: 30px;
}

.van-card__thumb {
  width: 80px !important;
  height: 80px !important;
}

.van-card__price {
  color: #E55050;
  font-weight: bold;
}

/*.coupon-text{*/
/*    font-size: 6px;*/
/*    width: 60px;*/
/*    margin-bottom: -1px;*/
/*    margin-right: 50px;*/
/*}*/

</style>
