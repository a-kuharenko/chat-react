import { all } from 'redux-saga/effects';
import usersSagas from '../components/usersPage/sagas.js';
import editUserSagas from '../components/editingUser/sagas.js'
import loginPageSagas from '../components/loginPage/sagas.js';
import chatPageSagas from '../components/chatPage/sagas.js'

export default function* rootSaga() {
    yield all([
        usersSagas(),
        editUserSagas(),
        loginPageSagas(),
        chatPageSagas(),
    ])
};