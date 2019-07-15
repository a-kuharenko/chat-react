import React from 'react';
import '../styles/header.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Header extends React.Component{
    
    render() {
        const {chatName, messages, participants, lastMessageDate} = this.props.chat;
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

const mapStateToProps = state => {
    return {
        chat: state.chatReducer,
    }
  }
  
  const mapDispatchToProps = {
    ...actions,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);
  