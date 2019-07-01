import {createReducer} from './helpers';

// project popover
function SetProjectPopover(state, action){
    return action.anchor;
}

// reducers
export const projectPopoverReducer = createReducer(null, {
    SET_PROJECT_POPOVER: SetProjectPopover
});