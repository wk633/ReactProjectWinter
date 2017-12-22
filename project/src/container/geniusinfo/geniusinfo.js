import React from 'react';
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';

@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            desc: ''
        }
    }
    onChange(key, val){
        this.setState({
            [key]: val
        })
    }
    render(){
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">Genius Info Page</NavBar>
                <AvatarSelector
                    selectAvatar={(imgName) => {
                        this.setState({
                            avatar: imgName
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title', v)}>
                    position
                </InputItem>
                <TextareaItem onChange={(v) => this.onChange('desc', v)}
                rows = {3}
                autoHeight
                title='Description'
                ></TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type='primary'
                    onClick={()=>{
                        this.props.update(this.state);
                    }}
                >Save</Button>
            </div>
        )
    }
}

export default GeniusInfo;