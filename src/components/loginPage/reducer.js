const initialState = {
    loginData: {
        auth: false,
        login: '',
        password: '',
        role: '',
        token: '',
    },
    loading: false,
    error: null,
}

export default function loginReducer(state = initialState, action) { 
    switch(action.type){
        case 'LOGIN_USER_REQUEST': {
            return {
                ...state,
                loading: true,
            };
        }
        case 'LOGIN_USER_SUCCESS': {
            const { loginData } = action.payload;
            return {
                ...state,
                loginData,
                loading: false,
            };
        }
        case 'FETCH_FAILED': {
            const {errorInfo, errorMessage} = action.payload;
            return {
                ...state,
                loading: false,
                error: {
                    info: errorInfo,
                    message: errorMessage,
                }
            };
        }
        default: 
            return state;
    }
}