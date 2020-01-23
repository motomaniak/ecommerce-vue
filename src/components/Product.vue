<template>
    <div>
    <b-card
        :title="data.name"
        :img-src="data.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
        <b-button href="#" @click="goTodetail(data.id, data.quantity)" variant="primary">View Details</b-button>
    </b-card>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        goTodetail(id, quantity) {
            let productId = id
            this.$router.push({name:'details', params:{pId:productId, quantity:quantity}})
        }
    }
}
</script>

<style scoped>

</style>
