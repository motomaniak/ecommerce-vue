<template>
    <div class='login'>
        <b-form @submit="onSubmit">
            <b-form-group 
                id='input-group-1'
                label="Email address:"
                label-for="input-1"
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
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            let url = 'http://localhost:5000/api/login'
            let options = {
                method: 'POST',
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
                    this.$router.push('/profile')
                })  
        }
    }
}
</script>

<style>

</style>