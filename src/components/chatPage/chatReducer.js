const initialState = { 
    chatName: '',
    participants: '',
    lastMessageDate: '',
    messages: [],
    user: '',
    loading: false,
    error: null,
};

export default function chatReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_MESSAGES_REQUEST': {
        return {
            ...state,
            loading: true,
        }
    }
    case 'FETCH_MESSAGES_SUCCESS': {
        return {
            ...action.payload.chat,
            loading: false,
        }
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
        }
    }
    default: 
      return state;
  }
}