<template>
    <div class='details'>
        <div v-for="product in products" :key="product.id">
            <b-container v-if="productId == product.id">
                <b-row>
                    <b-col>
                        <b-carousel
                        id="carousel-1"
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        background="white"
                        img-width="400"
                        img-height="auto"
                        style="text-shadow: 1px 1px 2px #333;"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd">
                            <b-carousel-slide :img-src="product.image"></b-carousel-slide>
                            <div v-if="product.images.length > 0">
                                <b-carousel-slide v-for="image in product.images" :key="image" :img-src="image.image_location"></b-carousel-slide>
                            </div>  
                        </b-carousel>
                    </b-col>
                    <b-col>
                        <h3>{{ product.name }}</h3>
                        <p>{{ product.description }}</p>
                        <b-form-select id='quantity' v-model='selected' :options="options"></b-form-select>
                        <b-button @click='addToCart(productId)'>Add</b-button>
                        <b-modal header-bg-variant="danger" v-model="modalShow">You must be logged in for that!</b-modal>
                    </b-col>
                </b-row>
                <div v-if="reviews.length == 0">
                    No reviews yet
                </div>
                <div v-else>
                    <ProductReview v-for="review in reviews" :key="review.customer_id" v-bind:data="review"></ProductReview>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>
import ProductReview from '@/components/ProductReview.vue'
export default {
    components: {
        ProductReview
    },
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
            productId: this.$route.params.productId,
            selected: null,
            options: options,
            slide: 0,
            sliding: null,
            modalShow: false,
            reviews: []
        }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        addToCart(productId) {
            if(!this.loggedIn){
                this.modalShow = !this.modalShow
            }else{
                let url = this.$API_URL + `/order/add`
                let options = {
                    method: 'POST',
                    body: JSON.stringify({"productId":productId, "customer_id":this.$store.state.auth.user.customer.id, "quantity":parseInt(document.getElementById('quantity').value), "discount":0, "date": new Date().toISOString()}),
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
                        }else if(res.status === 401){
                            this.modalShow = !this.modalShow
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
    },
    created() {
        let url = this.$API_URL + `/reviews/` + this.productId
        let options = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }
        
        fetch(url, options)
            .then(res => res.json())
            .then(data => this.reviews = data)
    }
}
</script>

<style>
.carousel{
    width: 400px !important;
    float: left;
}
.details{
    position: relative;
}
.section{
    margin-left: 400px;
}
</style>
