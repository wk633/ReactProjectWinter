import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {addOne, minusOne, addOneAsync} from './myRedux'

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

const mapStatetoProps = (state) => {
  return {value: state};
}
const actionCreator = {addOne, minusOne, addOneAsync};
App = connect(mapStatetoProps, actionCreator)(App);

export default App;
