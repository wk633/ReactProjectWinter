import React from 'react';
import axios from 'axios';

export default class AuthRoute extends React.Component{
    componentDidMount(){
        // get user info
        axios.get('/user/info')
        .then((res) => {
            if(res.status === 200) {
                console.log(res.data);
            }
        })
    }
    render(){
        return null;
    }
}