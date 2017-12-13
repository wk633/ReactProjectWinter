import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { count } from './myRedux';


const store = createStore(count);

function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
render();
store.subscribe(render);

registerServiceWorker();
