import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    orders: [],
    authenticated: false
  },
  mutations: {
    setProducts(state, payload){
      state.products = payload
    },
    setUser(state, payload){
      state.user = payload
    },
    setOrders(state, payload){
      state.orders = payload
    },
    setAuthentication(state, payload){
      state.authenticated = payload
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
