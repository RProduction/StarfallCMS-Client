import {createReducer} from './helpers';
import {produce} from 'immer';

function SetAuthorizationStatus(state, action){
    return action.status;
}

// receive array of user
const InitUsers = (state, action) => produce(state, (draft) => {
    const {users} = action;
    for(const user of users){
        draft[user.id] = {
            id: user.id,
            username: user.username,
            isCreator: user.is_creator
        }
    }
});

// receive user id
const DeleteUser = (state, action) => produce(state, (draft) => {
    const {id} = action;
    delete draft[id];
});

export const authorizationReducer = createReducer(-1, {
    SET_AUTHORIZATION_STATUS: SetAuthorizationStatus
});

export const usersReducer = createReducer({}, {
    INIT_USERS: InitUsers,
    DELETE_USER: DeleteUser
});