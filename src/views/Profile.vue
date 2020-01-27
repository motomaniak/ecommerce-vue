<template>
  <div class='profile'>
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
</template>

<script>
export default {
    data() {
        return {
            user: this.$store.state.user ? this.$store.state.user : null,
            form: {
                first_name: this.$store.state.user ? this.$store.state.user.first_name : '',
                last_name: this.$store.state.user ? this.$store.state.user.last_name : '',
                email: this.$store.state.user ? this.$store.state.user.email : '',
                address: this.$store.state.user ? this.$store.state.user.address : '',
                city: this.$store.state.user ? this.$store.state.user.city : '',
                state: this.$store.state.user ? this.$store.state.user.state : '',
                zip: this.$store.state.user ? this.$store.state.user.zip : '',
                phone: this.$store.state.user ? this.$store.state.user.phone : '',
                // password: this.$store.state.user.password ? this.$store.state.user.password : '',
                // confirmPassword: this.$store.state.user.password ? this.$store.state.user.password : ''
            }
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            let url = `http://localhost:5000/api/customer/${this.$store.state.user.id}`
            let options = {
                method: 'PUT',
                body: JSON.stringify(this.form),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.$store.commit('setUser', data)
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

</style>