import React, {useState}  from 'react';
import '../../styles/message.css'

function Message(props) {
    const [liked, setLiked] = useState(false);
    const token = localStorage.getItem("jwt");
    const onLike = () => {
      let sign;
      if (liked) {
        sign = -1;
      } else {
        sign = 1;
      }
      props.onLike(props.id, sign, token);
      setLiked(!liked);
    };
  
    return (
      <div className="message">
        <img className="avatar" src={props.message.avatar} alt="avatar" />
        <span>{props.message.message}</span>
        <br />
        <br />
        <label>{props.message.created_at}</label>
        <br />
        <label>{props.message.likes || 0}</label>
        <button type="button" onClick={onLike}>
          <img
            className="like"
            src="https://pngicon.ru/file/uploads/like.png"
            alt="like"
          />
        </button>
      </div>
    );
}  

export default Message;