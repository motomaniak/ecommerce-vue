import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        orders: [],
        cart: {}
    },
    mutations: {
        setProducts(state, payload){
            state.products = payload
        },
        setUser(state, payload){
            state.auth.user = payload
        },
        setOrders(state, payload){
            state.orders = payload
        },
        setAuthentication(state, payload){
            state.authenticated = payload
        },
        setCart(state, payload){
            state.cart = payload
        },
        deleteCartItem(state, payload){
            let index = state.cart.order_details.findIndex(item => item.product.id == payload)
            state.cart.order_details.splice(index, 1)
        }
    },
    actions: {
    },
    modules: {
        auth
    }
})
