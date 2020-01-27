<template>
    <div class='orders'>
        <table>
            <order v-for="order in orders" v-bind:data="order"></order>
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
            console.log(this.$store.state.orders)
            return this.$store.state.orders;
        }
    },
    created() {
    fetch(`http://localhost:5000/api/orders/${this.$store.state.user.id}`)
    .then(res=>res.json())
    .then(data => this.$store.commit('setOrders', data))
  }
}
</script>

<style>

</style>