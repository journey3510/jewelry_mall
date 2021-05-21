<template>
  <div>
    <div class="register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ validator: phonetest, message: '请填写正确的手机号' }]"
        />
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[
            { validator: passwordtest, message: '字母或数字，6-16位' },
          ]"
        />
        <van-field
          v-model="password_2"
          type="password"
          name="password_2"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ validator: passwordtest_2, message: '两次密码不相同' }]"
        />

        <div style="margin: 16px;" class="login-button">
          <van-button round block type="info" native-type="submit">
            立即注册
          </van-button>
        </div>
      </van-form>

      <div class="login-text">
        <span>已有账号？点击 </span>
        <span style="color: #5590d6" href="" @click="tologin">登录</span>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import { Form } from 'vant'
import { register } from '@/api/user'
import { Toast } from 'vant'

Vue.use(Toast)
Vue.use(Form)

import md5 from 'js-md5'

export default {
  data() {
    return {
      phone: '',
      username: '',
      password: '',
      password_2: ''
    }
  },

  methods: {
    onSubmit(val) {
      this.userRegister()
    },
    phonetest(val) {
      return /^[1]([3-9])[0-9]{9}$/.test(val)
    },

    passwordtest(val) {
      return /^[A-Za-z0-9]{6,16}$/.test(val)
    },
    passwordtest_2(val) {
      if (val !== this.password) {
        return false
      } else {
        return true
      }
    },
    userRegister() {
      const rasPw = md5(this.password) // ras 加密 密码
      const data = {
        'phone': this.phone,
        'nick_name': this.username,
        'password': rasPw
      }

      register(data).then(res => {
        if (res.ServerNo === 200) {
          Toast.success('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 500)
        } else {
          Toast.fail('注册失败')
        }
      })
    },
    tologin() {
      this.$router.push('/login')
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
