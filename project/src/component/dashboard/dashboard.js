import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../../component/navlink/navlink';

function Boss(){
    return (<h2>boss</h2>);
}

function Genius(){
    return (<h2>genius</h2>);
}

function Msg(){
    return (<h2>Message</h2>);
}

function Me(){
    return (<h2>Me</h2>);
}

@withRouter
@connect(
    state => state,
    null
)
class DashBoard extends React.Component{
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
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'genius',
                icon: 'genius',
                title: 'genius',
                component: Genius,
                hide: user.type === 'boss'
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
                component: Me
            }
        ]
        return (
            <div>
                <NavBar mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
            
        )
    }
}

export default DashBoard;