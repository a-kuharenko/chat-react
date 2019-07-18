import React from 'react';
import '../../styles/header.css';
function Header(props) {
    const { chatName, messages, participants, lastMessageDate } = props.chat;
    return (
      <div className="header">
        <label>{chatName}</label>
        <label>{messages.length} messages</label>
        <label>{participants} participants</label>
        <label>last message at {lastMessageDate}</label>
      </div>
    );
}
  
export default Header;
  