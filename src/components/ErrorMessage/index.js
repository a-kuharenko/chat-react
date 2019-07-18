import React from 'react';
import './errorMessage.css';
function ErrorMessage(props){
    return (
        <div className = 'errorMessage'>
           <h3>Something went wrong...</h3>
           <h1>Error info: {props.error.info}</h1>
           <h2>Error message: {props.error.message}</h2>
        </div>
    )
}

export default ErrorMessage;