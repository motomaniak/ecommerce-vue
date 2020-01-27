<template>
  <div id="app">
    <b-navbar toggleable="lg" type='dark' variant="warning">
      <b-navbar-brand href="#"><h2>Congo</h2></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class='ml-auto'>
            <b-nav-item href="#"><router-link to="/">Products</router-link></b-nav-item>
            <b-nav-item href="#"><router-link to="/register">Register</router-link></b-nav-item>
            <b-nav-item href="#"><router-link to="/login">Login</router-link></b-nav-item>
            <b-nav-item href="#" @click.prevent='logout'>Logout</b-nav-item>
            <b-nav-item href="#"><router-link to="/profile">Profile</router-link></b-nav-item>
            <b-nav-item href="#"><router-link to="/orders">Orders</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      this.$store.state.user = null
      this.$router.push('/login')
    }
  },
  data() {
    return {
      user: this.$store.state.user ? this.$store.state.user : null
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
