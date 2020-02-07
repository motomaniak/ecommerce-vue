<template>
    <div>
        <div class="heading cf">
            <h1>My Cart</h1>
            <a href="#" class="continue">Continue Shopping</a>
        </div>
        <div class="cart">
            <ul class="cartWrap">
                <cart-item v-for="(item, index) in cart" v-bind:key="item.id" v-bind:data="item" v-bind:index="index"></cart-item>
            </ul>
        </div>
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
            console.log(this.$store.state.cart)
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
@import '../assets/css.scss'

</style>