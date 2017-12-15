import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WhiteSpace, WingBlank, Button} from 'antd-mobile';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius'
        }
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>UserName</InputItem>
                        <WhiteSpace/>
                        <InputItem>Password</InputItem>
                        <WhiteSpace/>
                        <InputItem>Confirm</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type=='genius'}>Genius</RadioItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type=='boss'}>Boss</RadioItem>
                        <WhiteSpace/>
                        <Button type="primary">Register</Button>
                    </List>
                    
                </WingBlank>
            </div>
        );
    }
}

export default Register;
