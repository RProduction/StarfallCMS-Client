import {combineReducers} from 'redux';
import { SET_AUTHORIZATION_STATUS } from '../actions/actions';

function SetAuthorizationStatus(state = '', action){
    switch(action.type){
        case SET_AUTHORIZATION_STATUS:
            state = action.status;
        break;
        default:
        break;
    }
    return state;
}

const reducers = combineReducers(
    {
        authStatus: SetAuthorizationStatus
    }
);

export default reducers;