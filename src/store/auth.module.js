import AuthService from '../services/auth.service'
const user = localStorage.getItem('user')
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };


export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user){
            return AuthService.login(user).then(
                customer => {
                    commit('loginSuccess', customer)
                    return Promise.resolve(customer)
                },
                error => {
                    commit('loginFailure')
                    return Promise.reject(error)
                }
            )
        },
        logout({ commit }) {
            AuthService.logout()
            commit('logout')
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess')
                    return Promise.resolve(response.data)
                },
                error => {
                    commit('regiesterFailure')
                    return Promise.reject(error)
                }
            )
        }
    },
    mutations: {
        loginSuccess(state, user){
            state.status.loggedIn = true
            state.user = user
        },
        updateSuccess(state, user){
            state.user.customer = user
        },
        loginFailure(state){
            state.status.loggedIn = false
            state.user = null
        },
        logout(state){
            state.status.loggedIn = false
            state.user = null
        },
        registerSuccess(state){
            state.status.loggedIn = false
        },
        regiesterFailure(state){
            state.status.loggedIn = false
        }
    }
}