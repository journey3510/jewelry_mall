import { login } from '@/api/user'
import {
  getToken, setToken, getName, setName, getAvatar,
  setAvatar, setAddress, getGuid, setGuid, removeGuid, removeToken
} from '@/utils/auth'
const state = {
  token: getToken(),
  name: getName(),
  avatar: getAvatar(),
  guid: getGuid()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 用户ID
  SET_GUID: (state, guid) => {
    state.guid = guid
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { phone, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone: phone.trim(), password: password.trim() }).then(response => {
        // console.log('response: ', response)
        if (response.code === 200) {
          setToken(response.ResultData.token)
          setGuid(response.ResultData.guid)
          setName(response.ResultData.nick_name)
          setAddress(response.ResultData.address)
          setAvatar(response.ResultData.avatar_img)
          commit('SET_TOKEN', response.ResultData.token)
          commit('SET_GUID', response.ResultData.guid)
          commit('SET_AVATAR', response.ResultData.avatar_img)
          commit('SET_NAME', response.ResultData.nick_name)
        } else {
          reject('')
        }
        // localStorage.setItem('Authorization', response.ResultData.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_GUID', '')
      removeToken()
      removeGuid()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
