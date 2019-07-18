import axios from 'axios';
import api from '../../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';

export function* loginUser(action) {
    try {
        yield put({ type: 'LOGIN_USER_REQUEST'})
        const { login, password } = action.payload;
        const user = yield call(axios.post, `${api.url}/login`, {login, password});
        yield put({ type: 'LOGIN_USER_SUCCESS', payload: { loginData: user.data } })
    } catch (error) {
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Login user failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchLoginUser() {
    yield takeEvery('LOGIN_USER', loginUser)
}

export function* verifyUser(action) {
    try {
        yield put({ type: 'LOGIN_USER_REQUEST'})
        const { token } = action.payload;
        const user = yield call(axios.put, `${api.url}/login`, {token});
        yield put({ type: 'LOGIN_USER_SUCCESS', payload: { loginData: user.data } })
    } catch (error) {
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Verify user failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchVerifyUser() {
    yield takeEvery('VERIFY_USER', verifyUser)
}

export default function* loginPageSagas() {
    yield all([
        watchLoginUser(),
        watchVerifyUser(),
    ])
};