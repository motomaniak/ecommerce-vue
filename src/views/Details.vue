<template>
    <div class='details'>
        
        <div v-for="product in products" :key="product.id">
            <div v-if="pId == product.id">
                <b-carousel
                    id="carousel-1"
                    v-model="slide"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333;"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                >
                <b-carousel-slide :img-src="product.image" fluid thumbnail></b-carousel-slide>
                </b-carousel>
                
                <h3>{{ product.name }}</h3>
                {{ product.description }}
                <b-form-select id='quantity' v-model='selected' :options="options"></b-form-select>
                <b-button @click='addToCart(pId)'>Add</b-button>
                <b-modal header-bg-variant="danger" v-model="modalShow">You must be logged in for that!</b-modal>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name:'details',
    computed: {
        products() {
            return this.$store.state.products
        },
        loggedIn(){
            return this.$store.state.auth.status.loggedIn
        }
    },
    data() {
        let options = []
        options.push({value:null, text:"Select quantity to add to cart"})
        for(let i = 1; i <= this.$route.params.quantity; i++){
            options.push({value:i, text:i})
        }
        return {
            pId:this.$route.params.pId,
            selected: null,
            options: options,
            slide: 0,
            sliding: null,
            modalShow: false,
            modalSuccess: false,
        }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        addToCart(pId) {
            if(!this.loggedIn){
                this.modalShow = !this.modalShow
            }else{
                let url = this.$API_URL + `/order/add`
                let options = {
                    method: 'POST',
                    body: JSON.stringify({"product_id":pId, "customer_id":this.$store.state.auth.user.customer.id, "quantity":parseInt(document.getElementById('quantity').value), "discount":0, "date": new Date().toISOString()}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                fetch(url, options)
                    .then(res => {
                        if(res.status === 200){
                            this.$bvToast.toast("Item's added successfully", {
                                title: 'Add Success',
                                autoHideDelay: 2000,
                            })
                        }else{
                            return res.json()
                        }
                    }).then(data => {
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

<style>
img {
    max-width: 500px;
}
</style>
