<template>
  <div>
    <div class="login-class">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ validator: phonetest, message: '请填写正确的手机号' }]"
        />

        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;" class="login-button">
          <van-button round block type="info" native-type="submit">
            立即登录
          </van-button>
        </div>

      </van-form>
      <div class="login-text">
        <span>还没有账号？点击 </span>
        <span style="color: #5590d6" @click="toregister">立即注册</span>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import { Form } from 'vant'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
Vue.use(Toast)
Vue.use(Form)

import md5 from 'js-md5'

export default {
  data() {
    return {
      phone: '13768351699',
      password: '333333'
      // phone: '',
      // password: ''

    }
  },
  computed: {
    ...mapGetters(['guid'])
  },
  created() {

  },
  methods: {
    onSubmit(val) {
      this.userLogin()
    },
    phonetest(val) {
      console.log('val: ', val)
      return /^[1]([3-9])[0-9]{9}$/.test(val)
    },
    toregister() {
      this.$router.push('/register')
    },
    userLogin() {
      const rasPw = md5(this.password) // ras 加密 密码
      const params = {
        phone: this.phone,
        password: rasPw
      }
      this.loading = true
      const toast = this.$toast
      this.$store.dispatch('user/login', params)
        .then(() => {
          toast.success('登录成功')
          this.$router.push('/')
          this.loading = false
        }).catch(() => {
          toast.fail('号码或密码输入错误')
          this.loading = false
        })
    }
  }
}
</script>
<style>
.login-class {
  margin-top: 20px;
  width: 94%;
  margin-left: 3%;
}

.login-button {
  padding-top: 20px;
}

.login-text {
  font-size: 16px;
  text-align: center;
}

.tableTitle {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.midText {
  position: absolute;
  left: 50%;
  background-color: #f5f5f5;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}

.login-other {
  margin-top: 50%;
}

.login-logo {
  margin-top: 80px;
}
</style>
