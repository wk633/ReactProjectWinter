import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    BrowserRouter
} from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import './config';

const reduxDevTools = window.devToolsExtension?window.devToolsExtension():f=>f;


const store = createStore(reducer, compose(applyMiddleware(thunk), reduxDevTools));
// console.log(store.getState());


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
        </BrowserRouter> 
    </Provider>
), document.getElementById('root'));



registerServiceWorker();
