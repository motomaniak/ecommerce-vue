<template>
    <div class='details'>
        <div v-for="product in products">
            <div v-if="pId == product.id">
                <b-img :src="product.image" fluid thumbnail></b-img>
                <h3>{{ product.name }}</h3>
                {{ product.description }}
                <b-form-select id='quantity' v-model='selected' :options="options"></b-form-select>
                <b-button @click='addToCart(pId)'>Add</b-button>
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
            options: options
        }
    },
    methods: {
        addToCart(pId) {
            let url = `http://localhost:5000/api/order/add`
            let options = {
                method: 'POST',
                body: JSON.stringify({"product_id":pId, "customer_id":this.$store.state.user.id, "quantity":parseInt(document.getElementById('quantity').value), "discount":0, "date": new Date(0)}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch(url, options)
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>