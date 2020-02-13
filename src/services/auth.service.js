const API_URL = process.env.VUE_APP_ROOT_API

class AuthService {
    login(user){
        let options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(API_URL + '/auth/login', options)
            .then(res => {
                if(!res.ok){
                    res.json()
                    throw Error("Email or password is incorrect")
                }
                return res.json()
            })
            .then(data => {
                if(data.access_token){
                    localStorage.setItem('user', data.access_token)
                }
                return data
            })
    }

    logout(){
        localStorage.removeItem('user')
        // this.$store.state.auth
    }

    register(user){
        let options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(API_URL + '/auth/register', options)
    }
}

export default new AuthService()