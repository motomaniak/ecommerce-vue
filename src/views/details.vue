<template>
    <div class='details'>
        <div v-for="product in products">
            <div v-if="pId == product.id">
                <b-img :src="product.image" fluid thumbnail></b-img>
                <h3>{{ product.name }}</h3>
                {{ product.description }}
                <b-form-select v-model='selected' :options="options"></b-form-select>
                <b-button >Add</b-button>
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
    }
}
</script>

<style>

</style>