<template>
    <div>
        <table>
            <Order v-for="order in orders" :key="order.id" v-bind:data="order"></Order>
        </table>
    </div>
</template>

<script>
import Order from '@/components/Order.vue'

export default {
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
        fetch(this.$API_URL + `/orders/${this.$store.state.auth.user.customer.id}`)
            .then(res=>res.json())
            .then(data => this.$store.commit('setOrders', data))
    }
}
</script>

<style>

</style>