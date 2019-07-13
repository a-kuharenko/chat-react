import React from 'react';
import '../styles/messageInput.css'

class MessageInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e){
        this.setState({
            message: e.target.value,
        })
    }

    onClick(){
        this.props.onSend(this.state.message);
    }

    onBlur(e){
        e.target.value = '';
    }

    render(){
        return (
            <div className = 'messageInput'>
                <div className = 'input'>
                    <textarea placeholder = 'Message' 
                        onChange = { this.onChange } onBlur={ this.onBlur }></textarea>
                    <button onClick = { this.onClick }>Send</button>
                </div>
            </div>
        )
    }
}

export default MessageInput;