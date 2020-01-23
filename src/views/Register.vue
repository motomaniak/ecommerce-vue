<template>
    <div class='register'>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group 
                id='input-group-1'
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-2' label="Password:" label-for="input-2">
                <b-form-input
                    id='input-2'
                    v-model="form.password"
                    required
                    placeholder="Password"
                    type="password"
                ></b-form-input>
            </b-form-group>
            <b-form-group id='input-group-3' label="Confirm Password:" label-for="input-3">
                <b-form-input
                    id='input-3'
                    v-model="form.confirmPassword"
                    required
                    placeholder="Password"
                    type="password"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            let url = 'http://localhost:5000/api/register'
            let options = {
                method: 'POST',
                body: JSON.stringify(this.form),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch(url, options)
                .then(res => this.$router.push('/login'))
                .catch(err => {
                    console.log(err)
                })
        },
        onReset(e) {
            e.preventDefault()
            this.form.email = ''
            this.form.password = ''
            this.form.confirmPassword = ''
        }
    }
}
</script>

<style>

</style>