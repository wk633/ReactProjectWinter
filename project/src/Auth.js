import React from 'react';
import {connect} from 'react-redux';
import { login, getUserData } from './Auth.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state =>  state.auth,
    {login, getUserData}
)
class Auth extends React.Component{
    componentDidMount(){
        this.props.getUserData();
    }
    render(){
        console.log(this);
        return (
            <div>
                {this.props.isAuth ? <Redirect to='/dashboard' /> : null}
                <h2>login first! user:{this.props.name}, age: {this.props.age}</h2>
                <button onClick={this.props.login}>login</button>
            </div>
        );
    }
}
export default Auth;