import axios from 'axios';
import api from '../../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';

export function* fetchUser(action) {
    try {
        yield put({ type: 'FETCH_USER_REQUEST'})
        const user = yield call(axios.get, `${api.url}/user/${action.payload.id}`);
        yield put({ type: 'FETCH_USER_SUCCESS', payload: { userData: user.data } })
    } catch (error) {
        yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Fetch user failed',
                errorMessage: error.message
            } 
        })
    }
}

function* watchFetchUser() {
    yield takeEvery('FETCH_USER', fetchUser)
}

export default function* userPageSagas() {
    yield all([
        watchFetchUser()
    ])
};