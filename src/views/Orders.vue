<template>
    <div class='orders'>
        <table>
            <order v-for="order in orders" :key="order.id" v-bind:data="order"></order>
        </table>
    </div>
</template>

<script>
import Order from '@/components/Order.vue'

export default {
    name:'orders',
    components: {
        Order
    },
    computed: {
        orders() {
            return this.$store.state.orders;
        },
        loggedIn(){
            return this.$store.state.auth.status.loggedIn
        }
    },
    created() {
        if(!this.loggedIn){
            this.$router.push('/login')
        }
        fetch(`http://localhost:5000/api/orders/${this.$store.state.auth.user.customer.id}`)
            .then(res=>res.json())
            .then(data => this.$store.commit('setOrders', data))
    }
}
</script>

<style>

</style>