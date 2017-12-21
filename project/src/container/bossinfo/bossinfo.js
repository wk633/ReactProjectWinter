import React from 'react';
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';

export default class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: ''
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
                <NavBar mode="dark">Boss Info Page</NavBar>
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
                <InputItem onChange={(v) => this.onChange('company', v)}>
                    company
                </InputItem>
                <InputItem onChange={(v) => this.onChange('salary', v)}>
                    Salary
                </InputItem>
                <TextareaItem onChange={(v) => this.onChange('desc', v)}
                rows = {3}
                autoHeight
                title='Description'
                ></TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type='primary'>Save</Button>
            </div>
        )
    }
}

