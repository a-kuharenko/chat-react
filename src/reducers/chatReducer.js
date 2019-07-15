import {default as messages} from '../messages.json'

const initialState = { 
    chatName: 'My Chat',
    participants: 5,
    lastMessageDate: messages[messages.length - 1].created_at,
    messages,
    user: 'Sasha',
    length: messages.length
};
export function chatReducer(state = initialState, action) {
  switch(action.type) {
    case 'SEND_MESSAGE': {
        const {id, message, date} = action.payload;
        const newMessage = {
            id,
            'user': state.user,
            'avatar': 'https://i.pravatar.cc/300?img=18',
            'created_at': date,
            'message': message,
            'marked_read': false,
        }
        state.messages = [...state.messages, newMessage];
        state.lastMessageDate = newMessage.created_at
        return {...state};
    }

    case 'DELETE_MESSAGE': {
        const { index } = action.payload;
        state.messages.splice(index, 1);
        state.length--;
        state.lastMessageDate = state.messages[state.length - 1].created_at;
        return {...state};
    }

    case 'LIKE_MESSAGE': {
        const {index, likes} = action.payload;
        state.messages[index].likes = likes;
        return {...state}
    }

    case 'SHOW_MODAL': {
        const {index} = action.payload;
        state.isShown = true;
        state.editing = state.messages[index].message;
        state.editIndex = index;
        return {...state}
    }

    case 'HIDE_MODAL': {
        state.isShown = false;
        return {...state}
    }

    case 'SAVE_CHANGES': {
       const {message, date} = action.payload;
       state.messages[state.editIndex].message = message;
       state.messages[state.editIndex].created_at = date;
       return {...state}
    }

    default: 
      return state;
  }
}