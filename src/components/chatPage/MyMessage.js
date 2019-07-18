import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../editMessage/editMessageActions'
import '../../styles/mymessage.css'

function MyMessage(props){

    const onDeleteClick = () => {
        const token = localStorage.getItem('jwt');
        props.onDelete(props.id, token);
    }

    const onEdit = () => {
        props.editMessage(props.id, props.message.message);
        props.history.push('/chat/edit');
    }

    return (
        <div className="mymessage">
          <span>{props.message.message}</span>
          <br />
          <br />
          <label>{props.message.created_at}</label>
          <br />
          <button className="edit" onClick={onEdit}>
            Edit
          </button>
          <button onClick={onDeleteClick}>Delete</button>
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
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyMessage));