import React from 'react';
import {Grid, List} from 'antd-mobile';
export default class AvatarSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        let avatarList = ['male', 'female'].map(v => ({
            icon: require(`../img/${v}.svg`),
            text: v
        }))
        const GridHeader = this.state.text
                            ? (<div>
                                selected avatar&nbsp;&nbsp;
                                <img style={{width: 14}} src={this.state.icon}></img>
                                </div>)
                            : (<div>selected avatar</div>)
        return (
            <div>
                <List renderHeader={()=>GridHeader}>
                    <Grid data={avatarList} 
                        columnNum={2}
                        onClick={elm=>{
                            this.setState(elm);
                            this.props.selectAvatar(elm.text);
                        }}
                    >Avatar Select</Grid>
                </List>
            </div>
        )
    }
}