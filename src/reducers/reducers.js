import {combineReducers} from 'redux';
import { SET_AUTHORIZATION_STATUS, SWITCH_SIDEBAR, ADD_PROJECT, DELETE_PROJECT, RENAME_PROJECT, ADD_ENTITY, DELETE_ENTITY, RENAME_ENTITY } from '../actions/actions';

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

function SwitchSideBar(state = false, action){
    switch(action.type){
        case SWITCH_SIDEBAR:
            state = action.status;
        break;
        default:
        break;
    }
    return state;
}

function SetDatabase(state = {}, action){
    let temp = state;
    const {type, projectid, id, name} = action; 
    switch(type){
        case ADD_PROJECT:
            temp[id] = {
                name: name,
                entities: {}
            };
        break;
        case DELETE_PROJECT:
            delete temp[id];
        break;
        case RENAME_PROJECT:
            temp[id].name = name;
        break;
        case ADD_ENTITY:
            temp[projectid].entities[id] = {
                name: name,
                items: {}
            };
        break;
        case DELETE_ENTITY:
            delete temp[projectid].entities[id];
        break;
        case RENAME_ENTITY:
            temp[projectid].entities[id].name = name;
        break;
    }
    return temp;
}

const reducers = combineReducers(
    {
        authStatus: SetAuthorizationStatus,
        sidebar: SwitchSideBar,
        database: SetDatabase
    }
);

export default reducers;