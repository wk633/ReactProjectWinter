import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {addOne, minusOne, addOneAsync} from './myRedux'

@connect(
  state => ({value: state.currentNum}), // reducers.js: combineReducers({currentNum: count, auth})
  {addOne, minusOne, addOneAsync}
)
class App extends Component {
  render() {
    return (
      <div className="App">
        {`current state value ${this.props.value}`}<br/>
        <button onClick={this.props.addOne}>add one</button><br/>
        <button onClick={this.props.minusOne}>minus one</button><br/>
        <button onClick={this.props.addOneAsync} >add one after 1 s</button>
      </div>
    );
  }
}


export default App;
