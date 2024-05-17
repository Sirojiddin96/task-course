import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || null,
    }
  },
  mutations: {
    setTokenForNow(state, token) {
      state.token = token
    },
    setState(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    loginAction({ commit }, token) {
      commit('setState', token)
    },
  }
})

export default store