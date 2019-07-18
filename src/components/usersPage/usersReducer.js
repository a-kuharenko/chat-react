const initialState = {
    users: [],
    loading: false,
    error: null,
}
export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USERS_REQUEST': {
            return {
                ...state,
                loading: true,
            };
        }

        case 'FETCH_USERS_SUCCESS': {
            return {
                ...state,
                users: [...action.payload.users],
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
