import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { count } from './myRedux';


const store = createStore(count, applyMiddleware(thunk));

function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
render();
store.subscribe(render);

registerServiceWorker();
