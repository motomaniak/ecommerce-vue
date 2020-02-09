<template>
    <div>
        <b-container fluid>
            <b-row>
                <product v-for='product in products' :key="product.id" v-bind:data='product'></product>
            </b-row>
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product.vue'

export default {
    components: {
        Product
    },
    computed: {
        products() {
            return this.$store.state.products
        }
    },
    created() {
        fetch('http://motomaniak.net:5000/api/products')
        .then(res=>res.json())
        .then(data => this.$store.commit('setProducts', data))
    }
}
</script>
