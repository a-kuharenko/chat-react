import axios from 'axios';
import api from '../../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';

export function* fetchMessages(action){
    try{
        const { token } = action.payload;
        yield put({type: 'FETCH_MESSAGES_REQUEST'})
        const chat = yield call(axios.get, `${api.url}/chat/${token}`);
        yield put({type: 'FETCH_MESSAGES_SUCCESS', payload: {chat: chat.data}})
    } catch(error){
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Fetch messages failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchFetchMessages(){
    yield takeEvery('FETCH_MESSAGES', fetchMessages);
}

export function* likeMessage(action){
    try{
        const {id, sign, token} = action.payload;
        yield call(axios.put, `${api.url}/chat/like/${id}`, {sign});
        yield put({type: 'FETCH_MESSAGES', payload: {token}})
    } catch(error){
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Like message failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchLikeMessage(){
    yield takeEvery('LIKE_MESSAGE', likeMessage);
}

export function* deleteMessage(action){
    try{
        const {id, token} = action.payload;
        yield call(axios.delete, `${api.url}/chat/${id}`);
        yield put({type: 'FETCH_MESSAGES', payload: {token}})
    } catch(error){
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Delete message failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchDeleteMessage(){
    yield takeEvery('DELETE_MESSAGE', deleteMessage);
}

export function* sendMessage(action){
    try{
        const {id, token, user, message, date} = action.payload;
        yield call(axios.post, `${api.url}/chat/`, {id, user, message, date});
        yield put({type: 'FETCH_MESSAGES', payload: {token}})
    } catch(error){
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Send message failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchSendMessage(){
    yield takeEvery('SEND_MESSAGE', sendMessage);
}

export function* updateMessage(action){
    try{
        const {id, message, date, token} = action.payload;
        yield call(axios.put, `${api.url}/chat/${id}`, {message, date});
        yield put({type: 'FETCH_MESSAGES', payload: {token}})
    } catch(error){
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Update message failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchUpdateMessage(){
    yield takeEvery('UPDATE_MESSAGE', updateMessage);
}


export default function* chatPageSagas(){
    yield all([
        watchFetchMessages(),
        watchLikeMessage(),
        watchDeleteMessage(),
        watchSendMessage(),
        watchUpdateMessage(),
    ])
}