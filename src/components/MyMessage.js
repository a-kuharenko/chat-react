import React from 'react';
import '../styles/mymessage.css'

class MyMessage extends React.Component{

    onDeleteClick = () => {
        this.props.onDelete(this.props.index);
    }

    onEdit = () => {
        this.props.onEdit(this.props.index);
    }
    render(){
        return (
            <div className = 'mymessage'>
                <span>{ this.props.message.message }</span>
                <br/>
                <br/>
                <label>{ this.props.message.created_at }</label>
                <br/>
                <button className = 'edit' onClick = { this.onEdit }>Edit</button>
                <button onClick = { this.onDeleteClick }>Delete</button>
            </div>
        )
    }
}

export default MyMessage;