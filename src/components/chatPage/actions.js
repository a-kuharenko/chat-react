import {getNewId, toFormatDate} from '../../service/service';

export const sendMessage = (message, user, token) => ({
  type: 'SEND_MESSAGE',
  payload: {
    id: getNewId(),
    user,
    message,
    date: toFormatDate(new Date()),
    token,
  }
})

export const deleteMessage = (id, token) => ({
  type: 'DELETE_MESSAGE',
  payload: {
    id,
    token,
  }
})

export const likeMessage = (id, sign, token) => ({
  type: 'LIKE_MESSAGE',
  payload: {
    id,
    sign,
    token,
  }
})

export const editMessage = (id, editedMessage) => ({
  type: 'EDIT_MESSAGE',
  payload: {
    id,
    editedMessage,
  }
})

export const updateMessage = (id, message, token) => ({
  type: 'UPDATE_MESSAGE',
  payload: {
    id,
    message,
    date: 'edited at ' + toFormatDate(new Date()),
    token,
  }
})

export const fetchMessages = (token) => ({
  type: 'FETCH_MESSAGES',
  payload: {
    token,
  }
});