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
            return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read).length}
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload],unread: state.unread+1 }
        case MSG_READ:
        default:
            return state;
    }
}
function msgList(msgs, users){
    return {type: 'MSG_LIST', payload: {msgs, users}};
}
export function getMsgList(){
    return dispatch=>{
        axios.get('/user/getmsglist')
        .then(res=>{
            console.log(res);
            if(res.status===200 && res.data.code===0){
                dispatch(msgList(res.data.msgs, res.data.users))
            }
        })
    }
}

export function sendMsg({from, to, msg}){
    return dispatch=>{
        socket.emit('sendmsg', {from, to, msg})
    }
}

function msgRecv(msg){
    return {type: MSG_RECV, payload: msg}
}
export function recvMsg(){
    return dispatch=>{
        socket.on('recvmsg', (data)=>{
            console.log('recvmsg', data);
            dispatch(msgRecv(data));
        })
    }
}