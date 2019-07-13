import React from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './Chat.css';

class Chat extends React.Component{
  constructor(props){
    super(props);
    fetch('https://api.myjson.com/bins/1hiqin')
      .then(body => body.json())
      .then(res => {
        const messages = res;
        this.length = messages.length;
        this.setState({
          chatName: 'My Chat',
          participants: 5,
          lastMessageDate: messages[this.length-1].created_at,
          messages,
          user: 'Sasha',
        });
      })
  }

  onSend = (message) => {
    this.setState(state => {
      const messages = [...state.messages, 
        {
        'id': this.state.messages[this.length-1].id + 1,
        'user': this.state.user,
        'avatar': 'https://i.pravatar.cc/300?img=18',
        'created_at': toFormatDate(new Date()),
        'message': message,
        'marked_read': false,
        }];
      this.length++;
      return {
        messages,
        lastMessageDate:  messages[this.length - 1].created_at,
      }
    })
  }

  onEdit = (message, index) => {
    this.setState(state => {
      const {messages} = state;
      messages[index].message = message;
      messages[index].created_at = 'edited at ' + toFormatDate(new Date());
      return {
        messages,
      }
    })
  }

  onLike = (likes, index) => {
    this.setState((state) => {
      const { messages } = state;
      messages[index].likes = likes;
      return {
        messages,
      };
    })
  }

  onDelete = (index) => {
    this.setState((state) => {
      const { messages } = state;
      messages.splice(index, 1);
      this.length--;
      return {
        messages,
        lastMessageDate: messages[this.length - 1].created_at,
      };
    })
  }

  render(){
    return (
      this.state ? 
        <div>
          <Header data = { this.state }/>
          <MessageList messages = { this.state.messages } user = { this.state.user } 
            onLike = { this.onLike } onDelete = { this.onDelete } onEdit = { this.onEdit }/>
          <MessageInput onSend = { this.onSend }/> 
        </div>
        :
        <div id="loading"></div>
    )
  }
}

function toFormatDate(date){
  return date.toJSON().replace(/T/, ' ').replace(/\..{4}/, '');
}

export default Chat;
