<template>
    <div>
        <tr @click="goTodetail(data)">
            <td><b-img thumbnail fluid :src=data.order_details[0].product.image ></b-img></td>
            <td>{{getDate(data.order_date)}}</td>
            <td>{{data.status}}</td>
            <td>{{data.shipped_date ? getDate(data.shipped_date) : ""}}</td>
            <td>{{data.order_details[0].product.name}}</td>
        </tr>    
    </div>
</template>

<script>
export default {
    methods: {
        getDate(date){
            let d = new Date(date)
            return d.toString().slice(0, 16)
        },
        goTodetail(data) {
            this.$router.push({name:'OrderDetail', params:{data:data}})
        }
    },
    props: [
        'data'
    ]
}
</script>

<style>
img {
    height: 100px;
    width: 100px;
}
</style>