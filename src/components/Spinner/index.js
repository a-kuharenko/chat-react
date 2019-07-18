import React from 'react';
import './spinner.css'
function Spinner(props) {
    return props.loading ? <div id="loading"></div> : null;
}  

export default Spinner;