import React from 'react';
import { Switch, Route } from 'react-router-dom'
import EditMessage from './components/editMessage';
import Login from './components/loginPage/index'
import ChatPage from './components/chatPage/index'
import UsersPage from './components/usersPage'
import EditUser from './components/editingUser'
import Spinner from './components/Spinner'
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
          <Switch>
            <Route exact path='/users' component={UsersPage}/>
            <Route exact path='/user' component={EditUser}/>
            <Route exact path='/chat' component={ChatPage}/>
            <Route exact path='/chat/edit' component={EditMessage}/>
            <Route path='/user/:id' component={EditUser}/>
            <Route path='/' component={Login}/>
          </Switch>
        </div>
        :
       <Spinner />
    )
  }
}

export default Chat;