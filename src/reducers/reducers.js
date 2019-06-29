import {combineReducers} from 'redux';
import { SET_AUTHORIZATION_STATUS, SWITCH_SIDEBAR, ADD_PROJECT
    , DELETE_PROJECT, RENAME_PROJECT, ADD_ENTITY, DELETE_ENTITY
    , RENAME_ENTITY } from '../actions/actions';

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
    let tempValue;
    const {type, projectName, oldName, id, name} = action; 
    switch(type){
        case ADD_PROJECT:
            temp[name] = {
                id: id,
                entities: {}
            };
        break;
        case DELETE_PROJECT:
            delete temp[name];
        break;
        case RENAME_PROJECT:
            tempValue = temp[oldName];
            temp[name] = tempValue;
            delete temp[oldName];
        break;
        case ADD_ENTITY:
            temp[projectName].entities[name] = {
                id: id,
                items: {}
            };
        break;
        case DELETE_ENTITY:
            delete temp[projectName].entities[name];
        break;
        case RENAME_ENTITY:
            tempValue = temp[projectName].entities[oldName];
            temp[projectName].entities[name] = tempValue;
            delete temp[projectName].entities[oldName];
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