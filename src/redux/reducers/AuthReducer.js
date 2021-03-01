import { AuthActionTypes } from '../actions/AuthActions'

const INITIAL_STATE = {
    loggedIn: false,
    accessToken: null,

    rememberMe: null,
    user: null,
}

const AuthReducer = (state = INITIAL_STATE, action) => {
    let user, accessToken, rememberMe

    switch (action.type) {

        case AuthActionTypes.REGISTER:
            return { ...state, user: action.payload }

        case AuthActionTypes.SET_FIRST_TIME_USER:
            return { ...state, firstTimeUser: false }

        case AuthActionTypes.LOGIN:
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            }
        case AuthActionTypes.PARTIAL_LOGIN:
            return {
                ...state,
                loggedIn: false,
                user: action.payload
            }
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                loggedIn: false,
                accessToken: null,
            }

        default:
            return state
    }
}

export default AuthReducer