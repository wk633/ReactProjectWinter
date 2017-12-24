import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST'; // get chat list
const MSG_RECV = 'MSG_RECV'; // receive message
const MSG_READ = 'MSG_READ'; // read message

const initState = {
    chatmsg: [],
    unread: 0
}

export function chat(state=initState, action){
    switch(action.type){
        case MSG_LIST:
            return {...state, chatmsg: action.payload, unread:action.payload.filter(v=>!v.read).length}
        case MSG_RECV:
        case MSG_READ:
        default:
            return state;
    }
}
function msgList(msgs){
    return {type: 'MSG_LIST', payload: msgs};
}
export function getMsgList(){
    return dispatch=>{
        axios.get('/user/getmsglist')
        .then(res=>{
            if(res.state===200 && res.data.code===0){
                dispatch(msgList(res.data.msgs))
            }
        })
    }
}

export function sendMsg({from, to, msg}){
    return dispatch=>{
        socket.emit('sendmsg', {from, to, msg})
    }
}