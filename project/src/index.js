import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    BrowserRouter, 
    Route, 
    Switch,
    Redirect
} from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
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
            <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter> 
    </Provider>
), document.getElementById('root'));



registerServiceWorker();
