<template>
    <div class='col-md-12'>
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            />
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

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
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