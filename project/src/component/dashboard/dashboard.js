import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../navlink/navlink';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import Msg from '../msg/msg';
import {getMsgList,recvMsg} from '../../redux/chat.redux';


@withRouter
@connect(
    state => state,
    {getMsgList,recvMsg}
)
class DashBoard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render(){
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: 'boss',
                icon: 'boss',
                title: 'boss',
                component: Boss,
                hide: user.type === 'boss'
            },
            {
                path: '/genius',
                text: 'genius',
                icon: 'genius',
                title: 'genius',
                component: Genius,
                hide: user.type === 'genius'
            },
            {
                path: '/msg',
                text: 'message',
                icon: 'message',
                title: 'message',
                component: Msg
            },
            {
                path: '/me',
                text: 'me',
                icon: 'me',
                title: 'me',
                component: User
            }
        ]
        return (
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
            
        )
    }
}

export default DashBoard;