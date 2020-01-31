<template>
    <div class='col-md-12'>
        <div class='card card-con'>
            <b-form @submit.prevent="handleLogin">
                <b-form-group 
                    id='input-group-1'
                    label="Email address:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="user.email"
                        class="form-control"
                        type="email"
                        required
                        placeholder="Enter email"
                        name="email"
                    ></b-form-input>
                    <!-- <div
                        v-if="errors.has('email')"
                        class="alert alert-danger"
                        role="alert"
                    >Email is required!</div> -->
                </b-form-group>
                <b-form-group id='input-group-2' label="Password:" label-for="input-2">
                    <b-form-input
                        id='input-2'
                        v-model="user.password"
                        required
                        placeholder="Password"
                        type="password"
                        name='password'
                    ></b-form-input>
                    <!-- <div
                        v-if="errors.has('password')"
                        class="alert alert-danger"
                        role="alert"
                    >Password is required!</div> -->
                </b-form-group>
                <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Login</span>
                </button>
                </div>
                <!-- <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                </div> -->
                <!-- <b-button type="submit" variant="primary">Submit</b-button> -->
            </b-form>
        </div>
    </div>
</template>

<script>
import User from '../models/User'
export default {
    name: 'Login',
    data() {
        return {
            user: new User('', ''),
            loading: false,
            message: ''
        }
    },
    computed: {
        loggedIn(){
            return this.$store.state.auth.status.loggedIn
        }
    },
    created() {
        if(this.loggedIn){
            this.$router.push('/profile')
        }
    },
    methods: {
        handleLogin() {
            this.loading = true
            if(this.user.email && this.user.password){
                this.$store.dispatch('auth/login', this.user).then(
                    () => {
                        this.$emit('authenticated', this.$store.state.auth.status.loggedIn)
                        this.$router.push('/profile')
                    },
                    error => {
                        this.loading = false
                        this.message = (error.response && error.response.data) || error.message || error.toString()
                    }
                )
            }
        }
    }
}
</script>

<style>

</style>