export const AuthActionTypes = {
    REGISTER: "REGISTER",
    LOGIN: "LOGIN",
    SET_FIRST_TIME_USER: "SET_FIRST_TIME_USER",
    UPDATE_USER: "UPDATE_USER",
    LOGOUT: "LOGOUT",
}

export const login = (payload) => {
    return {
        type: AuthActionTypes.LOGIN,
        payload
    }
}

export const updateUser = (payload) => {
    return {
        type: AuthActionTypes.UPDATE_USER,
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