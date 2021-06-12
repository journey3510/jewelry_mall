import axios from 'axios'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

import { Toast } from 'vant'

// response 拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (response.data.code === '1004' || response.data.code === '1008') {
      Toast.fail('登录失效，请重新登录')
      router.replace({
        path: '/login'
      })
    } // 这里处理一些response 正常放回时的逻辑
    return res
  },
  error => {
    // 这里处理一些response 出错时的逻辑
    Toast.fail('网络开小差了。。。')
    return Promise.reject(error)
  }
)

export default service
