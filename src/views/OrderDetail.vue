<template>
    <div class='orderdetails'>
        Order ID: {{order_id}} <br/>
        Order Date: {{order_date}} <br/>
        <ul>
            <li v-for="product in orderProduts()" :key="product">{{product}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name:'OrderDetail',
    data(){
        return {
            order_date: this.$route.params.data.order_date,
            order_id: this.$route.params.data.id,
            order_details: this.$route.params.data
        }
    },
    methods: {
        orderProduts(){
            let products = []
            for(let product of this.$route.params.data.order_details){
                products.push(product.product.name)
                products.push(product.quantity)
                products.push(product.list_price)
            }
            return products
        }
    }
}
</script>

<style>

</style>