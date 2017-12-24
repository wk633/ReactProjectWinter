import React from 'react';
import {List, InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg} from '../../redux/chat.redux';
import io from 'socket.io-client';
// const socket = io('ws://localhost:9093');

@connect(
    state=>state,
    {getMsgList, sendMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: '', msg:[]};
    }
    componentDidMount(){
        this.props.getMsgList();
    }
    handleSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }
    render(){
        return (
            <div>
                {this.state.msg.map(v=>{
                    return <p key={v}>{v}</p>
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