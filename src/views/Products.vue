<template>
    <div>
        <b-icon-search></b-icon-search>
        <input type="text" id="productSearch" v-model="search">
        <b-form-group label="Filter by Category">
            <b-form-checkbox-group
            id="category-checkbox"
            v-model="selected"
            :options="categories"
            ></b-form-checkbox-group>
        </b-form-group>
        <b-container fluid>
            <b-row>
                <product v-for='product in searchedProducts' :key="product.id" v-bind:data='product'></product>
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
    data(){
        return {
            search: '',
            selected: [],
            categories: []
        }
    },
    computed: {
        searchedProducts() {
            return this.$store.state.products.filter(product => {
                if(this.selected.length > 0){
                    if(this.selected.find(item => item == product.category.name)){
                        return (
                            product.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
                            || product.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                        )
                    }
                }else{
                    return (
                        product.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
                        || product.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                    )
                }

            })
        },
        
    },
    created() {
        fetch(this.$API_URL + '/products')
        .then(res=>res.json())
        .then(data => this.$store.commit('setProducts', data))

        fetch(this.$API_URL + '/categories')
        .then(res => res.json())
        .then(data => {
            for(let item of data){
                this.categories.push({text:item.name, value:item.name})
            }
        })
    }
}
</script>

