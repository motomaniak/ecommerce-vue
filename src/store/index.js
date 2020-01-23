import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    user: []
  },
  mutations: {
    setProducts(state, payload){
      state.products = payload
    },
    setUser(state, payload){
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
