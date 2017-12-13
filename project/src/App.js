import React, { Component } from 'react';
import './App.css';
import {addOne, minusOne} from './myRedux'

class App extends Component {
  render() {
    const store = this.props.store;
    const value = store.getState();
    return (
      <div className="App">
        {`current state value ${value}`}<br/>
        <button onClick={()=>store.dispatch(addOne())}>add one</button>
        <button onClick={()=>store.dispatch(minusOne())}>minus one</button>
      </div>
    );
  }
}

export default App;
