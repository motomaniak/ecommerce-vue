export default function authHeader(){
    console.log(localStorage.getItem('user'))
    let user = JSON.parse(localStorage.getItem('user'))
    
    if(user && user.accessToken){
        return { Authorization: 'Bearer ' + user.accessToken}
    }else{
        return {}
    }
}