<template>
    <div>
        <div class="heading cf">
            <h1>My Cart</h1>
            <a href="#/products" class="continue">Continue Shopping</a>
        </div>
        <div v-if="!cart">
            Your Cart is Empty! Add some items 
        </div>
        <div v-else>
            <transition-group id='cart' name='list' tag='ul' class="slide-fade cartWrap cart">
                <cart-item v-for="(item, index) in cart" v-bind:key="item.product.id" v-bind:data="item" v-bind:index="index"></cart-item>
            </transition-group>
            <div class="promoCode"><label for="promo">Have A Promo Code?</label><input type="text" name="promo" placholder="Enter Code" />
                <a href="#" class="btn inactive"></a>
            </div>
            <div class="cartWrap wrap cart subtotal cf">
                <ul>
                    <li class="totalRow"><span class="label">Subtotal</span><span class="value">${{cartTotal}}</span></li>
                    <li class="totalRow"><span class="label">Shipping</span><span class="value">$5.00</span></li>
                    <li class="totalRow"><span class="label">Tax</span><span class="value">${{(cartTotal * .0825).toFixed(2)}}</span></li>
                    <li class="totalRow final"><span class="label">Total</span><span class="value">${{(cartTotal + 5 + (cartTotal *.0825)).toFixed(2)}}</span></li>
                    <li class="totalRow"><a href="#" @click='checkOut()' class="btn continue">Checkout</a></li>
                </ul>
            </div>
        </div>
        <b-modal header-bg-variant="danger" v-model="modalShow">Session Expired! Please log back in.</b-modal>
    </div>
</template>

<script>
import authHeader from '../services/auth-header.js'
import CartItem from '../components/CartItem.vue'

export default {
    components: {
        CartItem
    },
    data() {
        return {
            modalShow: false
        }
    },
    computed: {
        cartTotal() {
            let total = 0
            for(let item of this.$store.state.cart.order_details){
                total += (item.list_price * item.quantity)
            }
            return total
        },
        loggedIn(){
            return this.$store.state.auth.status.loggedIn
        },
        cart(){
            return this.$store.state.cart ? this.$store.state.cart.order_details : null
        },
        order_id () {
            return this.$store.state.cart.id
        }
    },
    created(){
        if(!this.loggedIn){
            this.$router.push('/login')
        }

        let url = this.$API_URL + `/cart`
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        fetch(url, options)
            .then(res => {
                if(res.status === 401){
                    this.modalShow = !this.modalShow
                    this.$parent.logout()
                }
                return res.json()
            })
            .then(data => this.$store.commit('setCart', data))
    },
    methods: {
        checkOut(){
            let url = this.$API_URL + `/cart/checkout`
            let options = {
                method: 'PUT',
                body: JSON.stringify({"order_id": this.order_id}),
                headers: authHeader()
            }
        
            
            fetch(url, options)
                .then(res => {
                    if(res.status === 200){
                        this.$store.commit('setCart', null)
                        this.$router.push('/orders')
                    }else if(res.status === 401){
                        this.modalShow = !this.modalShow
                        this.$parent.logout()
                    }
                })
            }
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
</style>
