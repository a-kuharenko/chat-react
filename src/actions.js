import {getNewId, toFormatDate} from './service/service';

export const sendMessage = message => ({
  type: 'SEND_MESSAGE',
  payload: {
    id: getNewId(),
    message,
    date: toFormatDate(new Date()),
  }
})

export const deleteMessage = index => ({
  type: 'DELETE_MESSAGE',
  payload: {
    index
  }
})

export const likeMessage = (index, likes) => ({
  type: 'LIKE_MESSAGE',
  payload: {
    likes,
    index
  }
})

export const editMessage = (index, editedMessage) => ({
  type: 'EDIT_MESSAGE',
  payload: {
      editedMessage,
      index
  }
})

export const showModal = (index) => ({
  type: 'SHOW_MODAL',
  payload: {
      index,
  }
})

export const hideModal = () => ({
  type: 'HIDE_MODAL'
})

export const saveChanges = (message) => ({
  type: 'SAVE_CHANGES',
  payload: {
    message,
    date: 'edited at ' + toFormatDate(new Date())
  }
})