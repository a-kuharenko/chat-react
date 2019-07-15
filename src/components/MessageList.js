import React from 'react';
import Message from './Message'
import MyMessage from './MyMessage'
import '../styles/messageList.css'
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageList extends React.Component{

    constructor(props){
        super(props);
        this.date = (new Date()).toDateString();
    }

    setDate = (date) => {
        this.date = date;
    }

    onLike = (index, likes) => {
        this.props.likeMessage(index, likes);
    }

    onDelete = (index) => {
        this.props.deleteMessage(index);
    }

    onEdit = (index) => {
        this.props.showModal(index);
    }
      
    render(){
        return (
            <div className = 'messageList'>
                {this.props.chat.messages.map((message, index) => {
                    const milliseconds = Date.parse(message.created_at);
                    const dateOfMessage = (new Date(milliseconds)).toDateString();
                    return message.user !== this.props.chat.user ?
                      (<div key = { index }>
                        {dateLine(dateOfMessage, this.date)}
                        {this.setDate(dateOfMessage)}
                        <Message index = { index } message = { message } onLike = { this.onLike }/>
                      </div>)
                    :
                      (<div key = { index }>
                        {dateLine(dateOfMessage, this.date)}
                        {this.setDate(dateOfMessage)}
                        <MyMessage index = { index } message = { message } 
                            onDelete = { this.onDelete } onEdit = { this.onEdit }/>
                      </div>)
                    }
                )}
            </div>
        )
    }
}

function dateLine(dateOfMessage, dateOfPreviousMessage){
    return dateOfMessage !== dateOfPreviousMessage ? 
        (<div className = 'titleDate'><hr></hr>{ dateOfMessage }</div>) :
        undefined
}

const mapStateToProps = state => {
    return {
        chat: state.chatReducer,
    }
}
  
const mapDispatchToProps = {
    ...actions,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
  