import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    statusBarHeight: '',
    missingSkey: false,
    userInfo: '',
    toastObj: {
      showToast: false,
      toastText: '',
      toastClass: ''
    }
  },
  actions: {
    setStatusBarHeight: ({ commit }, data) => {
      commit('setStatusBarHeight', data)
    },
    setUser: ({ commit }, data) => {
      commit('setUser', data)
    },
    setSkeyStatus: ({ commit }) => {
      commit('setSkeyStatus')
    },
    setToastStatus: ({ commit }, data) => {
      commit('setToastStatus', data)
    },
    setToastText: ({ commit }, data) => {
      commit('setToastText', data)
    },
    setToastClass: ({ commit }, data) => {
      commit('setToastClass', data)
    }
  },
  mutations: {
    setStatusBarHeight (state, data) {
      state.statusBarHeight = data
    },
    setUser (state, data) {
      state.userInfo = data
    },
    setSkeyStatus (state) {
      state.missingSkey = !state.missingSkey
    },
    setToastStatus (state, data) {
      state.toastObj.showToast = data
    },
    setToastText (state, data) {
      state.toastObj.toastText = data
    },
    setToastClass (state, data) {
      state.toastObj.toastClass = data
    }
  },
  getters: {}
})

export default store
