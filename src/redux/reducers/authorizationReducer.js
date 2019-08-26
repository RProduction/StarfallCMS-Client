import {createReducer} from './helpers';

function SetAuthorizationStatus(state, action){
    return action.status;
}

const authorizationReducer = createReducer(-1, {
    SET_AUTHORIZATION_STATUS: SetAuthorizationStatus
});

export default authorizationReducer;