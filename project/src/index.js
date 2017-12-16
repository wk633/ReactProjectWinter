import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    BrowserRouter, Route
} from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRouter from './component/authroute/authroute';

const reduxDevTools = window.devToolsExtension?window.devToolsExtension():f=>f;


const store = createStore(reducer, compose(applyMiddleware(thunk), reduxDevTools));
// console.log(store.getState());


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter></AuthRouter>
                <Route path='/boss' component={null}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter> 
    </Provider>
), document.getElementById('root'));



registerServiceWorker();
