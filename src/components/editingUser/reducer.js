const initialState = {
    userData: {
        login: '',
        email: '',
        password: '',
    },
    loading: false,
    error: null,
}

export default function editReducer(state = initialState, action){
    switch (action.type) {
        case 'FETCH_USER_REQUEST': {
            return {
                ...state,
                loading: true,
            };
        }
        case 'FETCH_USER_SUCCESS': {
            const { userData } = action.payload;
            return {
                ...state,
                userData,
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