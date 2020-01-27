import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'products',
    component: Products
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/details',
    name: 'details',
    component: ()=> import('../views/Details.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('../views/Login.vue')
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
  }

]

const router = new VueRouter({
  routes
})

export default router
