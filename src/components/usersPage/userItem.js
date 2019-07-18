import React from 'react';
import './userItem.css'

class UserItem extends React.Component{
    
    render() {
        return (
            <div className = "userItem">
                <span>{this.props.login}</span>
                <span>{this.props.email}</span>
                <button onClick={()=>this.props.onEdit(this.props.id)}>Edit</button>
                <button onClick={()=>this.props.onDelete(this.props.id)}>Delete</button>
            </div>
        )
    }
}

  export default UserItem;
  