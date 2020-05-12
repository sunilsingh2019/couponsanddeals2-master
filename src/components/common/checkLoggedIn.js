
export function CheckLoggedIn(){
    if (window.localStorage.getItem('access_token')!==null){
        return true
    }else{
        return false
    }
}
 