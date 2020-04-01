<template>
    <div>
        <span v-for="n in 5" :key={n}>
            <span class='gold' v-if="n <= data.rating">{{solid}}</span>
            <span class='star' v-else>{{outline}}</span>
        </span>
        <br/>
        {{data.review}}
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            solid: '\u2605',
            outline: '\u2606'
        }
    }
}
</script>

<style>
.star{
    font-size: 1.6em;
}
.gold {
    font-size: 1.75em;
    color: gold;
}
</style>