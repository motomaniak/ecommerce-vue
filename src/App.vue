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
                    <b-nav-item v-if='authenticated' href="#"><router-link v-if='authenticated' to="/profile"><font-awesome-icon icon='user'/> Hello, {{currentUser}}</router-link></b-nav-item>
                    <b-nav-item v-if='authenticated' href="#"><router-link v-if='authenticated' to="/orders">Orders</router-link></b-nav-item>
                    <b-nav-item v-if='authenticated' href="#"><router-link v-if='authenticated' to="/cart"><font-awesome-icon icon='shopping-cart'/></router-link></b-nav-item>
                    <b-nav-item v-if='authenticated' @click.prevent='logout' href='#'><router-link v-if='authenticated' to='/login' replace><font-awesome-icon icon="sign-out-alt" />Logout</router-link></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view @authenticated='setAuthenticated' />
    </div>
</template>

<script>
import authHeader from './services/auth-header.js'

export default {
    data() {
        return {
            authenticated: this.$store.state.auth.status.loggedIn,
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.first_name : ''
        }
    },
    methods: {
        setAuthenticated(status){
            this.authenticated = this.$store.state.auth.status.loggedIn
        },
        logout(){
            this.$store.dispatch('auth/logout', this.$store.state.auth.user)
            .then(() => {
                this.authenticated = this.$store.state.auth.status.loggedIn
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style lang='scss'>
@import './assets/css.scss';

.navbar {
    background-color: #80ced6 !important;
}

label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 600px !important;
    padding: 40px 40px;
}

.card {
    background-color: beige !important;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>
