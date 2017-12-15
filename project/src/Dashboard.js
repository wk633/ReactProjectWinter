import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import App from './App';

function Test1(){
    return <h2>test1</h2>
}

function Test2(){
    return <h2>test2</h2>
}

class Test extends React.Component {
    render(){
        return <h2>test component, location: {this.props.match.params.location}</h2>
    }
}

class Dashboard extends React.Component{
    render(){
        return (
            <div>
                <ul>
                    <li><Link to='/dashboard'>root</Link></li>
                    <li><Link to='/dashboard/test1'>test1</Link></li>
                    <li><Link to='/dashboard/test2'>test2</Link></li>
                    <li><Link to='/dashboard/test3'>test3</Link></li>
                </ul>
                <Switch>
                    <Route path='/dashboard' exact component={App}></Route>
                    <Route path='/dashboard/test1' exact component={Test1}></Route>
                    <Route path='/dashboard/test2' exact component={Test2}></Route>
                    <Route path='/dashboard/:location' component={Test}></Route>
                </Switch>
                
            </div>
        );
    }
}
export default Dashboard;