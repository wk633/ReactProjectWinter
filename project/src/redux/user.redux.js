import axios from 'axios';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

import {getRedirectPath} from '../util';

const initState = {
    msg: '',
    user: '',
    type: ''
}



// reducer
export function user(state=initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        case LOAD_DATA:
            return {...state, ...action.payload};
        default: 
            return state
    }
    
}
function errorMsg(msg){
    return {msg, type: ERROR_MSG};
}

function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload: data};
}

export function loadData(userinfo){
    return {type: LOAD_DATA, payload: userinfo}; 
}
export function register({user, pwd, repeatpwd, type}){
    if(!user || !pwd || !type) {
        return errorMsg('need username and password');
    }
    if(pwd !== repeatpwd){
        return errorMsg('password should be the same');
    }
    // asynchronous method
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
        .then(res => {
            console.log(res);
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, type}));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}


export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('username or password needed');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
        .then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function update(data){
    return dispatch => {
        axios.post('/user/update', data)
        .then(res=>{
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}