<template>
  <div class='col-md-12'>
      <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id='input-group-1' label="Fisrt Name:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="form.first_name"
                    required
                    placeholder="Enter first name"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-2' label="Last Name:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.last_name"
                    required
                    placeholder="Enter last name"
                ></b-form-input>
            </b-form-group>
            <b-form-group 
                id='input-group-3'
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="input-3"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-4' label="Address:" label-for="input-4">
                <b-form-input
                    id="input-1"
                    v-model="form.address"
                    required
                    placeholder="Address"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-5' label="City:" label-for="input-5">
                <b-form-input
                    id="input-5"
                    v-model="form.city"
                    required
                    placeholder="City"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-6' label="State:" label-for="input-6">
                <b-form-input
                    id="input-6"
                    v-model="form.state"
                    required
                    placeholder="State"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-7' label="Zip:" label-for="input-7">
                <b-form-input
                    id="input-7"
                    v-model="form.zip"
                    required
                    placeholder="Zip"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-8' label="Phone:" label-for="input-8">
                <b-form-input
                    id="input-1"
                    v-model="form.phone"
                    required
                    placeholder="Phone"
                ></b-form-input>
            </b-form-group>
            <!-- <b-form-group id='input-group-9' label="Password:" label-for="input-9">
                <b-form-input
                    id='input-9'
                    v-model="form.password"
                    required
                    placeholder="Password"
                    type="password"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-10' label="Confirm Password:" label-for="input-10">
                <b-form-input
                    id='input-10'
                    v-model="form.confirmPassword"
                    required
                    placeholder="Password"
                    type="password"
                ></b-form-input> -->
            <!-- </b-form-group> -->
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Cancel</b-button>
        </b-form>
      </div>
  </div>
</template>

<script>
import authHeader from '../services/auth-header.js'

export default {
    data() {
        return {
            user: this.$store.state.auth.user.customer,//this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer : null,
            form: {
                first_name: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.first_name : '',
                last_name: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.last_name : '',
                email: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.email : '',
                address: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.address : '',
                city: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.city : '',
                state: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.state : '',
                zip: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.zip : '',
                phone: this.$store.state.auth.user.customer ? this.$store.state.auth.user.customer.phone : '',
                // password: this.$store.state.auth.user.customer.password ? this.$store.state.auth.user.customer.password : '',
                // confirmPassword: this.$store.state.auth.user.customer.password ? this.$store.state.auth.user.customer.password : ''
            }
        }
    },
    computed: {
        loggedIn(){
            return this.$store.state.auth.status.loggedIn
        }
    },
    created() {
        if(!this.loggedIn){
            this.$router.push('/login')
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            let url = `http://localhost:5000/api/customer/${this.$store.state.auth.user.customer.id}`
            let options = {
                method: 'PUT',
                body: JSON.stringify(this.form),
                headers: authHeader()
            }

            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.$store.commit('auth/user/customer', data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        onReset() {

        }
    }
}
</script>

<style>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 600px !important;
  padding: 40px 40px;
}

.card {
  background-color: beige;
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