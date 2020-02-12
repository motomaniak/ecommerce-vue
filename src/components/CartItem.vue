<template>
    <li :id="data.product.id" v-bind:class="{'items even': even, 'items odd':odd}">
        <div class="infoWrap"> 
            <div class="cartSection">
                <img :src="data.product.image" alt="" class="itemImg" />
                <p class="itemNumber">product #: {{data.product.id}}</p>
                <h4>{{data.product.name.substring(0, 20)}}</h4>
        
                <p> <input type="text"  class="qty" :placeholder="data.quantity"/> x $ {{data.list_price}}</p>
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
export default {
    props: ['data', 'index'],
    data(){
        return {
            even: this.index % 2 == 0 ? true : false,
            odd: this.index % 2 == 0 ? false : true,
        }
    },
    methods: {
        removeItem(product_id, order_id){
            let url = `http://localhost:5000/api/cart`
            let options = {
                    method: 'DELETE',
                    body: JSON.stringify({"product_id": product_id, "order_id": order_id}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            fetch(url, options)
                .then(res => {
                    if(res.status === 200){
                        let cart = document.getElementById('cart')
                        let item = document.getElementById(product_id)
                        cart.removeChild(item)
                        this.$store.commit("deleteCartItem", product_id)
                    }else{

                    }
                })
        }
    }
}
</script>

<style scoped>

</style>