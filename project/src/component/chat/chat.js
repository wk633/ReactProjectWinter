import React from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../util';
import QueueAnim from 'rc-queue-anim';

@connect(
    state=>state,
    {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: '', msg:[]};
    }
    componentDidMount(){
        console.log(this.props.chat.chatmsg);
        if(this.props.chat.chatmsg.length === 0){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    componentWillUnmount(){
        console.log('unmount');
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }
    handleSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        console.log({from, to, msg});
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }
    render(){
        const userId = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        const chatId = getChatId(userId, this.props.user._id);
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatId===chatId);
        console.log(users);
        if(!users[userId]){return null;}

        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>{
                        this.props.history.goBack();
                    }}
                >
                    {users[userId].name}
                </NavBar>
                <QueueAnim delay={100}>
                    {chatmsgs.map(v=>{
                        console.log(v);
                        console.log(users);
                        const avatar = require(`../img/${users[v.from].avatar}.svg`)
                        return v.from===userId?(
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item
                                    extra={<img src={avatar} alt=''/>}
                                    className="chat-me">{v.content}</Item>
                            </List>
                        )
                    })}
                </QueueAnim>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='Please input message'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text: v});
                            }}
                            extra={<span onClick={()=>this.handleSubmit()}>Submit</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;