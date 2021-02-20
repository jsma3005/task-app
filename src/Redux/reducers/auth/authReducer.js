import { LOGIN, LOGOUT } from '../../constants'

const initState = {
    isLogin: false,
    token: null
}

export default function AuthReducer(state = initState, {type, payload}){
    switch(type){
        case LOGIN: {
            return {
                ...state,
                isLogin: true,
                token: payload.token
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isLogin: false,
                token: null
            }
        }
        default: {
            return state
        }
    }
}