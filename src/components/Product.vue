<template>
    <div>
        <b-col sm='auto'>
            <b-card
                :title="data.name"
                :img-src="data.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
            >
                <b-button class='stretched-link' href="#" @click="goTodetail(data.id, data.quantity)" variant="primary">View Details</b-button>
            </b-card>
        </b-col>
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
.card-img-top {
    height: auto;
    width: 200px !important;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>
