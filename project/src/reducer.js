// combine all reducer and return

import {combineReducers} from 'redux';
import {count} from './myRedux';
import {auth} from './Auth.redux';

export default combineReducers({count, auth});