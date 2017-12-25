import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST'; // get chat list
const MSG_RECV = 'MSG_RECV'; // receive message
const MSG_READ = 'MSG_READ'; // read message

const initState = {
    chatmsg: [],
    unread: 0,
    users:[]
}

export function chat(state=initState, action){
    switch(action.type){
        case MSG_LIST:
            return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read && v.to===action.payload.userId).length}
        case MSG_RECV:
            console.log(action.payload.to, action)
            const n = action.payload.to===action.userId ? 1 : 0;
            console.log(n)
            return {...state, chatmsg: [...state.chatmsg, action.payload],unread: state.unread+n }
        case MSG_READ:
        default:
            return state;
    }
}
function msgList(msgs, users, userId){
    return {type: 'MSG_LIST', payload: {msgs, users, userId}};
}
export function getMsgList(){
    return (dispatch, getState)=>{
        axios.get('/user/getmsglist')
        .then(res=>{
            console.log(res);
            if(res.status===200 && res.data.code===0){
                console.log('getState', getState());
                const userId = getState().user._id;
                dispatch(msgList(res.data.msgs, res.data.users, userId))
            }
        })
    }
}

export function sendMsg({from, to, msg}){
    return dispatch=>{
        socket.emit('sendmsg', {from, to, msg})
    }
}

function msgRecv(msg, userId){
    return {type: MSG_RECV, payload: msg, userId}
}
export function recvMsg(){
    return (dispatch, getState)=>{
        socket.on('recvmsg', (data)=>{
            const userId = getState().user._id;
            console.log('recvmsg', data);
            dispatch(msgRecv(data, userId));
        })
    }
}

function msgRead({from, userId, num}){
    return {type: MSG_READ, payload:{from, userId, num}}
}
export function readMsg(from){
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
        .then(res=>{
            const userId = getState().user._id;
            if(res.status === 200 && res.data.code === 0) {
                dispatch(msgRead({from, userId, num: res.data.num}));
            }
        })
    }
}