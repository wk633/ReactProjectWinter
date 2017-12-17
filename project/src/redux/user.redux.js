import axios from 'axios';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

import {getRedirectPath} from '../util';

const initState = {
    isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: ''
}



// reducer
export function user(state=initState, action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        case LOGIN_SUCCESS:
            return {...state, isAuth: false, redirectTo: getRedirectPath(action.payload), ...action.payload};
        default: 
            return state
    }
    
}
function errorMsg(msg){
    return {msg, type: ERROR_MSG};
}
function registerSuccess(data){
    return {type: REGISTER_SUCCESS, payload: data};
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
                dispatch(registerSuccess({user, pwd, type}));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

function loginSuccess(data){
    return {type: LOGIN_SUCCESS, payload: data};
}

export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('username or password needed');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
        .then(res => {
            console.log(res);
            if(res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}