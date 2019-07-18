import axios from 'axios';
import api from '../../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';

export function* fetchUsers() {
	try {
		yield put({ type: 'FETCH_USERS_REQUEST'})
		const users = yield call(axios.get, `${api.url}/users`);
		yield put({ type: 'FETCH_USERS_SUCCESS', payload: { users: users.data } })
	} catch (error) {
		yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Fetch users failed',
                errorMessage: error.message
            } 
        })
	}
}

function* watchFetchUsers() {
	yield takeEvery('FETCH_USERS', fetchUsers)
}

export function* addUser(action) {
	const newUser = { ...action.payload.data, id: action.payload.id };

	try {
		yield call(axios.post, `${api.url}/user`, newUser);
		yield put({ type: 'FETCH_USERS' });
	} catch (error) {
		yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Add user failed',
                errorMessage: error.message
            } 
        })
	}
}

function* watchAddUser() {
	yield takeEvery('ADD_USER', addUser)
}

export function* updateUser(action) {
	const id = action.payload.id;
	const updatedUser = { ...action.payload.data };
	
	try {
		yield call(axios.put, `${api.url}/user/${id}`, updatedUser);
		yield put({ type: 'FETCH_USERS' });
	} catch (error) {
		yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Update user failed',
                errorMessage: error.message
            } 
        })
	}
}

function* watchUpdateUser() {
	yield takeEvery('UPDATE_USER', updateUser)
}

export function* deleteUser(action) {
	try {
		yield call(axios.delete, `${api.url}/user/${action.payload.id}`);
		yield put({ type: 'FETCH_USERS' })
	} catch (error) {
		yield put({
            type: 'FETCH_FAILED', 
            payload: {
                errorInfo: 'Delete user failed',
                errorMessage: error.message
            } 
        })
	}
}

function* watchDeleteUser() {
	yield takeEvery('DELETE_USER', deleteUser)
}

export default function* usersSagas() {
	yield all([
		watchFetchUsers(),
		watchAddUser(),
		watchUpdateUser(),
		watchDeleteUser()
	])
};