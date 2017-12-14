import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    BrowserRouter, 
    Route, 
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { count } from './myRedux';

const reduxDevTools = window.devToolsExtension?window.devToolsExtension():f=>f;


const store = createStore(count, compose(applyMiddleware(thunk), reduxDevTools));

function Test1(){
    return <h2>test1</h2>
}

function Test2(){
    return <h2>test2</h2>
}

class Test extends React.Component {
    render(){
        return <h2>test component, location: {this.props.match.params.location}</h2>
    }
}

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
