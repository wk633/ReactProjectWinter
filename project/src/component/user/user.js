import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace} from 'antd-mobile';

@connect(
    state=>state.user,
    null
)
class User extends React.Component{
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
                    <Item>Log Out</Item>
                </List>
            </div>
        ): null
    }
}
export default User;