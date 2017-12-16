import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';

@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }
    handleRegister(){
        this.props.register(this.state);
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? this.props.msg : null}
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >UserName</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this.handleChange('pwd', v)}
                            type='password'
                        >Password</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this.handleChange('repeatpwd', v)}
                            type='password'
                        >Confirm</InputItem>
                        <WhiteSpace/>
                        <RadioItem 
                            checked={this.state.type==='genius'}
                            onChange={v => this.handleChange('type', 'genius')}
                        >Genius</RadioItem>
                        <WhiteSpace/>
                        <RadioItem 
                            checked={this.state.type==='boss'}
                            onChange={v => this.handleChange('type', 'boss')}
                        >Boss</RadioItem>
                        <WhiteSpace/>
                        <Button onClick={this.handleRegister}type="primary">Register</Button>
                    </List>
                    
                </WingBlank>
            </div>
        );
    }
}

export default Register;
