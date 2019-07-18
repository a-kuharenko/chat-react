import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import '../../styles/modalPage.css'
import { connect } from 'react-redux';
import * as actions from '../chatPage/actions';

function EditMessage(props){

    const [message, setMessage] = useState('');

    const onSave = () => {
        const token = localStorage.getItem('jwt');
        props.updateMessage(props.edit.id, message, token);
        props.history.push('/chat');
    }

    const onClose = () => {
        props.history.push('/chat');
    }

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const displayModal = () => {
        return (
            <div>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Editing message</Modal.Title>
                </Modal.Header>
      
                <Modal.Body>
                  <textarea
                    onChange={onChange}
                    defaultValue={props.edit.message}
                  ></textarea>
                </Modal.Body>
      
                <Modal.Footer>
                  <Button onClick={onClose} variant="secondary">
                    Close
                  </Button>
                  <Button onClick={onSave} variant="primary">
                    Save changes
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          );
    };

    return displayModal()
}

const mapStateToProps = state => {
    return {
        edit: state.editMessageReducer,
    }
}
  
const mapDispatchToProps = {
    ...actions,
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditMessage));
  
  