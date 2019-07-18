import React, {useState} from 'react';

function InputPassword(props){
    const [hidden, setHidden] = useState(true);
    return (
        <div>
            <input 
                id="password-input" 
                type={hidden ? "password" : "text"} 
                placeholder="Password" 
                value={props.value}
                onChange={(e) => props.onChange(e, 'password')}
            />
            <button type='button' onClick={() => setHidden(!hidden)}>
                See
            </button>
        </div>
    )
}

export default InputPassword;