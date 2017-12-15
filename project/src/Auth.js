import React from 'react';
import {connect} from 'react-redux';
import { login } from './Auth.redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

@connect(
    state =>  state.auth,
    {login}
)
class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    componentDidMount(){
        axios.get('/data')
        .then(res => {
            if(res.status === 200) {
                console.log(res);
                this.setState({data: res.data[0]})
            }
            
        })
    }
    render(){
        const userName = this.state.data.name;
        console.log(userName);
        return (
            <div>
                {this.props.isAuth ? <Redirect to='/dashboard' /> : null}
                <h2>login first! user: {userName}</h2>
                <button onClick={this.props.login}>login</button>
            </div>
        );
    }
}
export default Auth;