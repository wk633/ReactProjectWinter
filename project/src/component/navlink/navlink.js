import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide);
        const {pathname} = this.props.location;

        return (
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item 
                        key={v.path} 
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.svg`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.svg`)}}
                        selected={pathname===v.path}
                        onPress={() => {
                            console.log('onpress');
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        );
    }
}

export default NavLinkBar;