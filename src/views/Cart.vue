<template>
    <div>
        <div class="heading cf">
            <h1>My Cart</h1>
            <a href="#" class="continue">Continue Shopping</a>
        </div>
        <transition-group id='cart' name='list' tag='ul' class="slide-fade cartWrap cart">
            <cart-item v-for="(item, index) in cart" v-bind:key="item.product.id" v-bind:data="item" v-bind:index="index"></cart-item>
        </transition-group>
    </div>
</template>

<script>
import authHeader from '../services/auth-header.js'
import CartItem from '../components/CartItem.vue'

export default {
    components: {
        CartItem
    },
    computed: {
        loggedIn(){
            return this.$store.state.auth.status.loggedIn
        },
        cart(){
            return this.$store.state.cart.order_details
        }
    },
    created(){
        if(!this.loggedIn){
            this.$router.push('/login')
        }

        let url = `http://localhost:5000/api/cart`
        let options = {
            method: 'GET',
            headers: authHeader()
        }
        
        fetch(url, options)
            .then(res=>res.json())
            .then(data => this.$store.commit('setCart', data))
    }
}
</script>

<style lang='scss' scoped>
@import '../assets/css.scss';
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>