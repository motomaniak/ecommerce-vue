<template>
  <div id="app">
    <b-navbar toggleable="md">
      <b-navbar-brand href="#"><h2>Congo</h2></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class='ml-auto'>
            <b-nav-item href="#"><router-link to="/products">Products</router-link></b-nav-item>
            <b-nav-item v-if='!authenticated' href="#"><router-link v-if='!authenticated' to="/register">Register</router-link></b-nav-item>
            <b-nav-item v-if='!authenticated' href="#"><router-link v-if='!authenticated' to="/login">Login</router-link></b-nav-item>
            <b-nav-item v-if='authenticated' href='#'><router-link v-if='authenticated' to='/login' v-on:click.native='logout()' replace>Logout</router-link></b-nav-item>
            <b-nav-item v-if='authenticated' href="#"><router-link v-if='authenticated' to="/profile">Profile</router-link></b-nav-item>
            <b-nav-item v-if='authenticated' href="#"><router-link v-if='authenticated' to="/orders">Orders</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <router-view @authenticated='setAuthenticated' />
  </div>
</template>

<script>
export default {
  data() {
    return {
      authenticated: this.$store.state.auth.status.loggedIn,
      // user: this.$store.state.user ? this.$store.state.user : null
    }
  },
  methods: {
    setAuthenticated(status){
      this.authenticated = this.$store.state.auth.status.loggedIn
    },
    logout(){
      this.$store.dispatch('auth/logout').then(
        () => {
          this.authenticated = this.$store.state.auth.status.loggedIn
          this.$router.push('/login')
        }
      )
      // this.authenticated = false
      // this.$store.state.auth.status.loggedIn = false
    }
  }
}
</script>

<style>
.navbar {
  background-color: #80ced6 !important;
}
</style>
