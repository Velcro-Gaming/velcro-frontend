export const AuthActionTypes = {
    REGISTER: "REGISTER",
    SET_FIRST_TIME_USER: "SET_FIRST_TIME_USER",
    LOGIN: "LOGIN",
    PARTIAL_LOGIN: "PARTIAL_LOGIN",
    LOGOUT: "LOGOUT",
}

export const login = (payload) => {
    return {
        type: AuthActionTypes.LOGIN,
        payload
    }
}

export const partialLogin = (payload) => {
    return {
        type: AuthActionTypes.PARTIAL_LOGIN,
        payload
    }
}

export const logout = () => {
    return {
        type: AuthActionTypes.LOGOUT
    }
}

export const register = (payload) => {
    return {
        type: AuthActionTypes.REGISTER,
        payload
    }
}