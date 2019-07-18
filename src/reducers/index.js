import { combineReducers } from "redux";
import chatReducer from "../components/chatPage/chatReducer";
import usersReducer from "../components/usersPage/usersReducer";
import editReducer from "../components/editingUser/reducer"
import loginReducer from '../components/loginPage/reducer'
import editMessageReducer from '../components/editMessage/editMessageReducer'

const rootReducer = combineReducers({
    chatReducer,
    usersReducer,
    editReducer,
    loginReducer,
    editMessageReducer
});

export default rootReducer;