import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/modalPage.css'
import { connect } from 'react-redux';
import * as actions from '../actions';
class ModalPage extends React.Component{
   constructor(props){
       super(props);
       this.state = {
          message: ''
       }
       this.onChange = this.onChange.bind(this);    
   }

    onSave = () => {
        this.props.saveChanges(this.state.message);
        this.props.hideModal();
    }

    onChange(e){
        this.setState({
            message: e.target.value,
        })
    }
    displayModal(){
        return (
                <div>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Editing message</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <textarea onChange = { this.onChange }>{this.props.chat.editing}</textarea>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick ={this.props.hideModal} variant="secondary">Close</Button>
                        <Button onClick ={this.onSave} variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div> 
            )
    }
    render(){
        return (
            this.props.chat.isShown ? 
                this.displayModal() :
                null
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalPage);
  
  