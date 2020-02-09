const API_URL = 'http://motomaniak.net:5000/api/auth/'

class AuthService {
    login(user){
        let options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(API_URL + 'login', options)
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
        return fetch(API_URL + 'register', options)
    }
}

export default new AuthService()
