import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../navlink/navlink';
import Boss from '../boss/boss';
import Genius from '../genius/genius';


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