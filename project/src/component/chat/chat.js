import React from 'react';
import {List, InputItem, NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux';

@connect(
    state=>state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: '', msg:[]};
    }
    componentDidMount(){
        console.log(this.props.chat.chatmsg);
        if(this.props.chat.chatmsg.length === 0){
            console.log('fdsfds');
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    handleSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }
    render(){
        const user = this.props.match.params.user;
        const Item = List.Item;
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {user}
                </NavBar>
                {this.props.chat.chatmsg.map(v=>{
                    return v.from===user?(
                        <List key={v._id}>
                            <Item>{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item className="chat-me">{v.content}</Item>
                        </List>
                    )
                })}
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