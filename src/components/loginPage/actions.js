export const loginUser = (login, password) => ({
    type: 'LOGIN_USER',
    payload: {
        login,
        password
    }
})

export const verifyUser = (token) => ({
    type: 'VERIFY_USER',
    payload: {
        token
    }
})