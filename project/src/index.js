import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    BrowserRouter, 
    Route, 
    Link,
    Switch
} from 'react-router-dom';
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
            <div>
                <ul>
                    <li><Link to='/'>root</Link></li>
                    <li><Link to='/test1'>test1</Link></li>
                    <li><Link to='/test2'>test2</Link></li>
                    <li><Link to='/test3'>test3</Link></li>
                </ul>
                <Switch>
                    <Route path='/' exact component={App}></Route>
                    <Route path='/test1' exact component={Test1}></Route>
                    <Route path='/test2' exact component={Test2}></Route>
                    <Route path='/:location' component={Test}></Route>
                </Switch>
                
            </div>
        </BrowserRouter> 
    </Provider>
), document.getElementById('root'));



registerServiceWorker();
