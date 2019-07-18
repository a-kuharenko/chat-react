import React from 'react';
import Message from './Message'
import MyMessage from './MyMessage'
import '../../styles/messageList.css'
import { connect } from 'react-redux';
import * as actions from './actions';

function MessageList(props) {
    let date = new Date().toDateString();
  
    const setDate = dateOfMessage => {
      date = dateOfMessage;
    };
  
    const onLike = (id, sign, token) => {
      props.likeMessage(id, sign, token);
    };
  
    const onDelete = (id, token) => {
      props.deleteMessage(id, token);
    };
  
    const getMessage = (message, id, index, dateOfMessage) => {
      return (
        <div key={index}>
          {dateLine(dateOfMessage, date)}
          {setDate(dateOfMessage)}
          <Message id={id} message={message} onLike={onLike} />
        </div>
      );
    };
  
    const getMyMessage = (message, id, index, dateOfMessage) => {
      return (
        <div key={index}>
          {dateLine(dateOfMessage, date)}
          {setDate(dateOfMessage)}
          <MyMessage id={id} message={message} onDelete={onDelete} />
        </div>
      );
    };
  
    return (
      <div className="messageList">
        {props.chat.messages.map((message, index) => {
          const milliseconds = Date.parse(message.created_at);
          const dateOfMessage = new Date(milliseconds).toDateString();
          return message.user !== props.chat.user
            ? getMessage(message, message.id, index, dateOfMessage)
            : getMyMessage(message, message.id, index, dateOfMessage);
        })}
      </div>
    );
}
  
function dateLine(dateOfMessage, dateOfPreviousMessage) {
    return dateOfMessage !== dateOfPreviousMessage ? (
      <div className="titleDate">
        <hr></hr>
        {dateOfMessage}
      </div>
    ) : null;
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
  