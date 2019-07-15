import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store = {store}>
        <Chat />
    </Provider>, 
document.getElementById('root')
);
