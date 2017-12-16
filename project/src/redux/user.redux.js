import axios from 'axios';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

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
            return {...state, isAuth: true, ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
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
        axios.post('/user/register')
        .then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(registerSuccess({user, pwd, type}));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
    
    ;
}