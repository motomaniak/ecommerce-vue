<template>
  <div>
    <product v-for='product in products' v-bind:data='product'></product>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product.vue'

export default {
  name: 'products',
  components: {
    Product
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  created() {
    fetch('http://localhost:5000/api/products')
    .then(res=>res.json())
    .then(data => this.$store.commit('setProducts', data))
  }
}
</script>
