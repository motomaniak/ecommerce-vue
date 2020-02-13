import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faExclamation,
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faShoppingCart,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faExclamation, faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faShoppingCart);
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.prototype.$API_URL = process.env.VUE_APP_ROOT_API

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


