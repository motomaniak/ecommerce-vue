<template>
    <transition name='slide-fade'>
        <li v-if="show" :id="data.product.id" v-bind:class="{'items even': even, 'items odd':odd}">
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
    </transition>
</template>

<script>
export default {
    props: ['data', 'index'],
    data(){
        return {
            even: this.index % 2 == 0 ? true : false,
            odd: this.index % 2 == 0 ? false : true,
            show: true,
        }
    },
    methods: {
        removeItem(product_id, order_id){
            let url = `http://motomaniak.net:5000/api/cart`
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
                        this.show = !this.show
                        this.$store.commit("deleteCartItem", product_id)
                    }else{

                    }
                })
        }
    }
}
</script>

<style scoped>
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
