import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import storeConfiguration from './store';

const store = storeConfiguration();

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <Route path='/' component={Chat} />
        </Router>
    </Provider>, 
document.getElementById('root')
);
