import React from 'react';
import '../styles/message.css'

class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            likes: this.props.message.likes || 0,
            liked: false,
        }
    }

    onLike = () => {
        let likes;
        if(this.state.liked){
            likes = this.state.likes - 1;
        }
        else{
            likes = this.state.likes + 1;
        }
        this.props.onLike(this.props.index, likes);
        this.setState({
            liked: !this.state.liked,
            likes,
        })
    }
    
    render(){
        return (
            <div className = 'message'>
                <img className = 'avatar' src = { this.props.message.avatar } alt = 'avatar'/>
                <span>{ this.props.message.message }</span>
                <br/>
                <br/>
                <label>{ this.props.message.created_at }</label>
                <br/>
                <label>{ this.state.likes }</label>
                <button onClick = { this.onLike }>
                    <img className = 'like' src = 'https://pngicon.ru/file/uploads/like.png' alt = 'like'/>
                </button>
            </div>
        )
    }
}

export default Message;