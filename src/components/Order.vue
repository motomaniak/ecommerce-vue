<template>
    <div>
        <tr>
            <td><b-img thumbnail fluid :src=data.order_details[0].product.image ></b-img></td>
            <td>{{data.order_date}}</td>
            <td>{{data.status}}</td>
            <td>{{data.shipped_date}}</td>
            <td>{{data.order_details[0].product.name}}</td>
        </tr>    
    </div>
</template>

<script>
export default {
    props: [
        'data'
    ]
}
</script>

<style>

</style>