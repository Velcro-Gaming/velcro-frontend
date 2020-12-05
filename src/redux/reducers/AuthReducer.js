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
            // accessToken = action.data.access_token
            // rememberMe = action.payload.rememberMe ? action.payload.rememberMe : null
            return { ...state, loggedIn: true }

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