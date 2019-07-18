import React, {useEffect} from 'react';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { connect } from 'react-redux';
import * as actions from './actions';

function ChatPage(props){

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(token) props.fetchMessages(token);
        else props.history.push('/');
    }, []);

    
    const displayComponent = (error, loading) => {
        if(!error)
            return (
                <div>
                    <Header chat = {props.chat}/>
                    <MessageList />
                    <MessageInput /> 
                    <Spinner loading = {loading} />
                </div>
            )
        return <ErrorMessage error={error}/>
    }

    const {loading, error} = props.chat    
    return displayComponent(error, loading)
}

const mapStateToProps = state => {
    return {
        chat: state.chatReducer,
    }
}
  
const mapDispatchToProps = {
    ...actions,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);