import React from 'react';
import Message from './Message'
import MyMessage from './MyMessage'
import '../styles/messageList.css'

class MessageList extends React.Component{

    constructor(props){
        super(props);
        this.date = (new Date()).toDateString();
    }

    setDate = (date) => {
        this.date = date;
    }
    render(){
        return (
            <div className = 'messageList'>
                {this.props.messages.map((message, index) => {
                    const miliseconds = Date.parse(message.created_at);
                    const dateOfMessage = (new Date(miliseconds)).toDateString();
                    return message.user !== this.props.user ?
                      (<div key = { index }>
                        {dateLine(dateOfMessage, this.date)}
                        {this.setDate(dateOfMessage)}
                        <Message index = { index } message = { message } onLike = { this.props.onLike }/>
                      </div>)
                    :
                      (<div key = { index }>
                        {dateLine(dateOfMessage, this.date)}
                        {this.setDate(dateOfMessage)}
                        <MyMessage index = { index } message = { message } 
                            onDelete = { this.props.onDelete } onEdit = { this.props.onEdit }/>
                      </div>)
                    }
                )}
            </div>
        )
    }
}

function dateLine(dateOfMessage, dateOfPreviousMessage){
    return dateOfMessage !== dateOfPreviousMessage ? 
        (<div className = 'titleDate'><hr></hr>{ dateOfMessage }</div>) :
        undefined
}

export default MessageList;