import React from 'react';
import PropTypes from 'prop-types';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
 
@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }
    render(){
        return (<WingBlank>
            <WhiteSpace></WhiteSpace>
            {this.props.userlist.map(v=>(
                v.avatar ? 
                (<Card key={v._id} 
                    onClick={()=>this.handleClick(v)}
                >
                    <Card.Header
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.svg`)}
                        extra={<span>{v.title}</span>}
                    >
                    </Card.Header> 
                    <Card.Body>
                        {v.type==='boss' ? (<div >company: {v.company}</div>) : null} 
                        {v.desc.split('\n').map(v=>(
                            <div key={v}>{v}</div>
                        ))}
                        {v.type==='boss' ? (<div >salary: {v.salary}</div>) : null} 
                    </Card.Body>
            </Card>)
            : null
            ))}
        </WingBlank>)
    }
}
export default UserCard;