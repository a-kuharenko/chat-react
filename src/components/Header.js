import React from 'react';
import '../styles/header.css';

class Header extends React.Component{
    
    render() {
        const {chatName, messages, participants, lastMessageDate} = this.props.data;
        return (
            <div className='header'>
                <label>{ chatName }</label>
                <label>{ messages.length } messages</label>
                <label>{ participants } participants</label>
                <label>last message at { lastMessageDate }</label>
            </div>
        )
    }
}

export default Header;