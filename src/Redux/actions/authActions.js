import { LOGIN, LOGOUT } from '../constants'

export const loginAction = data =>{
    return {
        type: LOGIN,
        payload: data
    }
}

export const logoutAction = () =>{
    return {
        type: LOGOUT
    }
}