import React, {useState} from 'react';
import '../../styles/messageInput.css'
import { connect } from 'react-redux';
import * as actions from './actions';
function MessageInput(props) {
    const [message, setMessage] = useState('');
  
    const onChange = e => {
      setMessage(e.target.value);
    };
  
    const onClick = () => {
      const token = localStorage.getItem("jwt");
      props.sendMessage(message, props.chat.user, token);
    };
  
    const onBlur = e => {
      e.target.value = '';
    };
    return (
      <div className="messageInput">
        <div className="input">
          <textarea
            placeholder="Message"
            onChange={onChange}
            onBlur={onBlur}
          ></textarea>
          <button onClick={onClick}>Send</button>
        </div>
      </div>
    );
}
  
const mapStateToProps = state => {
    return {
        chat: state.chatReducer,
    }
  }
  
  const mapDispatchToProps = {
    ...actions,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
  