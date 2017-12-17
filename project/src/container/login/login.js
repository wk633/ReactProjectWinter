import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';

@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            type: ''
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    register(){
        this.props.history.push('/register');
    }
    handleChange(key, value){
        this.setState({
            [key]: value
        });
    }
    handleLogin(){
        this.props.login(this.state);
    }
    render(){
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >UserName</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this.handleChange('pwd', v)}
                            type='password'
                        >Password</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>Log In</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">Sign Up</Button>
                </WingBlank>  
            </div>
                  
        );
    }
}
export default Login;