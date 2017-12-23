import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import browserCookies from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';

@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        const alert = Modal.alert;
        alert('Log Out', 'Are you confirmed to log out?', [
            {text: 'Cancel', onPress: () => {}},
            {text: 'OK', onPress: () => {
                // browserCookies.erase('userId');
                this.props.logoutSubmit();
            }}
        ])
    }
    render(){
        console.log(this.props);
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief
        return props.user?(
            <div>
                <Result 
                    img={<img src={require(`../img/${props.avatar}.svg`)} style={{width: 50}} alt=''></img>}
                    title={props.user}
                    message={props.type==='boss'?props.comapny:null}
                />
                <List renderHeader={()=>'Introduction'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.salary?<Brief>Salary: ${props.salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>Log Out</Item>
                </List>
            </div>
        ): <Redirect to={this.props.redirectTo} />
    }
}
export default User;