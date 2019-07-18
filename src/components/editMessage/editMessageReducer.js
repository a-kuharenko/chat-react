const initialState = { 
    id: '',
    message: ''
};

export default function editMessageReducer(state = initialState, action) {
  switch(action.type) {
    case "EDIT_MESSAGE": {
        const {id, message} = action.payload;
        return {
            ...state,
            id,
            message
        }
    }
    default: 
      return state;
  }
}