<template>
    <li :id="data.product.id" v-bind:class="{'items even': even, 'items odd':odd}">
        <div class="infoWrap"> 
            <div class="cartSection">
                <img :src="data.product.image" alt="" class="itemImg" />
                <p class="itemNumber">product #: {{data.product.id}}</p>
                <h4>{{data.product.name.substring(0, 20)}}</h4>
        
                <p> <input type="text"  class="qty" v-model="quantity" v-on:blur="updateQuantity(data.product.id, data.order_id)"/> x $ {{data.list_price}}</p>
            </div>  
            <div class="prodTotal cartSection">
                <p>${{(data.list_price * data.quantity).toFixed(2)}}</p>
            </div>
            <div class="cartSection removeWrap">
                <a @click='removeItem(data.product.id, data.order_id)' href="#"><font-awesome-icon icon='trash'/></a>
            </div>
        </div>
    </li>
</template>

<script>
import authHeader from '../services/auth-header'
export default {
    props: ['data', 'index'],
    data(){
        return {
            quantity: this.data.quantity,
            even: this.index % 2 == 0 ? true : false,
            odd: this.index % 2 == 0 ? false : true,
        }
    },
    watch: {
        quantity: function(val, oldVal){
            this.quantity = val
        }
    },
    methods: {
        removeItem(product_id, order_id){
            let url = this.$API_URL + `/cart`
            let options = {
                method: 'DELETE',
                body: JSON.stringify({"product_id": product_id, "order_id": order_id}),
                headers: authHeader()
            }

            fetch(url, options)
                .then(res => {
                    if(res.status === 200){
                        let cart = document.getElementById('cart')
                        let item = document.getElementById(product_id)
                        cart.removeChild(item)
                        this.$store.commit("deleteCartItem", product_id)
                        if(this.$store.state.cart.order_details.length == 0){
                            this.$store.commit('setCart', null)
                        }
                    }
                    if(res.status === 401){
                        this.$parent.logout()
                    }
                })
        },
        updateQuantity(product_id, order_id){
            let url = this.$API_URL + `/cart`
            let options = {
                method: 'PUT',
                body: JSON.stringify({'product_id': product_id, 'order_id': order_id, 'quantity': this.quantity}),
                header: authHeader()
            }

            if(this.quantity < 1){
                this.$bvToast.toast("Must be 1 or more items", {
                    title: 'Error',
                    autoHideDelay: 2000,
                })
            }else{
                fetch(url, options)
                    .then(res => {
                        if(res.status == 200){
                            this.$bvToast.toast("Shopping cart updated successfully", {
                                title: 'Add Success',
                                autoHideDelay: 2000,
                            })
                            this.$store.commit("updateCartItem", {'id':product_id, 'quantity':this.quantity})
                        }else if(res.status === 401){
                            this.$$parent.logout()
                        }
                        else{
                            return res.json()
                        }
                    })
                    .then(data => {
                        if(data != null){
                            this.$bvToast.toast(data.error, {
                                title: 'Error',
                                autoHideDelay: 2000,
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
    }
}
</script>

<style scoped>

</style>