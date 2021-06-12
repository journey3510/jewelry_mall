import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

// const modulesFiles = require.context('./modules', true, /\.js$/)
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

const store = new Vuex.Store({
  modules: {
    user
  },
  getters,
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, token) {
      state.Authorization = token
      localStorage.setItem('Authorization', token)
    }
  }
})

export default store
