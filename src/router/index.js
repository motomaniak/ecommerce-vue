import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'products',
    //     component: Products
    // },
    {
        path: '/products',
        name: 'products',
        component: Products
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/details',
        name: 'details',
        component: ()=> import('../views/Details.vue')
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/profile',
        name: 'profile',
        component: ()=> import('../views/Profile.vue')
    },
    {
        path: '/orders',
        name: 'orders',
        component: ()=> import('../views/Orders.vue')
    },
    {
        path: '/order_detail',
        name: 'OrderDetail',
        component: ()=> import('../views/OrderDetail.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Cart.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router
