import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { count } from './myRedux';

const reduxDevTools = window.devToolsExtension?window.devToolsExtension():f=>f;


const store = createStore(count, compose(applyMiddleware(thunk), reduxDevTools));

function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
render();
store.subscribe(render);

registerServiceWorker();
