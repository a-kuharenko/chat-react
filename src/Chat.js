import React from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ModalPage from './components/ModalPage';
import './Chat.css';

class Chat extends React.Component{

  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }
  componentDidMount() {
    this.setState({isLoading: false});
  }
  render(){
    return (
      !this.state.isLoading ? 
        <div>
          <Header />
          <ModalPage />
          <MessageList />
          <MessageInput /> 
        </div>
        :
        <div id="loading"></div>
    )
  }
}

export default Chat;