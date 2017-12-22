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
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo.js';
import DashBoard from './component/dashboard/dashboard.js';

const reduxDevTools = window.devToolsExtension?window.devToolsExtension():f=>f;

const store = createStore(reducer, compose(applyMiddleware(thunk), reduxDevTools));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter></AuthRouter>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/geniusinfo' component={GeniusInfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route component={DashBoard}></Route>
            </div>
        </BrowserRouter> 
    </Provider>
), document.getElementById('root'));



registerServiceWorker();
