import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

@connect(
    state=>state,
    null
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length - 1];
    }
    render(){
        console.log(this.props);
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatId] = msgGroup[v.chatId] || [];
            msgGroup[v.chatId].push(v);
        })
        console.log(msgGroup);
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });

        const Item = List.Item;
        const Brief = Item.Brief;
        const userId = this.props.user._id;
        const userInfo = this.props.chat.users;


        if(!this.props.chat.chatmsg.length){
            return null;
        }

        return (
            <div>
                {chatList.map(v=>{
                    console.log(v);
                    const lastItem = this.getLast(v);
                    const targetId = v[0].from===userId ? v[0].to : v[0].from;
                    const unreadNum = v.filter(v=>!v.read&&v.to===userId).length;

                    if(!userInfo[targetId]){return null;}
                    return (
                        <List
                            key={lastItem._id} 
                        >
                            <Item
                                thumb={require(`../img/${userInfo[targetId].avatar}.svg`)}
                                extra={<Badge text={unreadNum}></Badge>}
                                arrow="horizontal"
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`);
                                }}
                            >
                                {lastItem.content}
                                <Brief>{userInfo[targetId].name}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        );
    }
}
export default Msg;