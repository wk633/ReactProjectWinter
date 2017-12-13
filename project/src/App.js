import React, { Component } from 'react';
import './App.css';
import {addOne, minusOne, addOneAsync} from './myRedux'

class App extends Component {
  render() {
    const store = this.props.store;
    const value = store.getState();
    return (
      <div className="App">
        {`current state value ${value}`}<br/>
        <button onClick={()=>store.dispatch(addOne())}>add one</button><br/>
        <button onClick={()=>store.dispatch(minusOne())}>minus one</button><br/>
        <button onClick={()=>store.dispatch(addOneAsync())} >add one after 1 s</button>
      </div>
    );
  }
}

export default App;
