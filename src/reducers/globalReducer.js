import {createReducer} from './helpers';
import {ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG} from '../actions/globalActions';

// target
function SetTarget(state, action){
    return {
        id: action.id,
        name: action.name
    }
}

// add, delete, rename dialog
function ShowAddDialog(state, action){
    return ADD_DIALOG;
}

function ShowDeleteDialog(state, action){
    return DELETE_DIALOG;
}

function ShowRenameDialog(state, action){
    return RENAME_DIALOG;
}

function HideDialog(state, action){
    return null;
}

// notification dialog switch
function ShowNotificationDialog(state, action){
    return {
        title: action.title,
        content: action.content
    };
}

function HideNotificationDialog(state, action){
    return null;
}

// reducers
export const targetReducer = createReducer({id: 0, name: ''}, {
    SET_TARGET: SetTarget
});

export const dialogReducer = createReducer(null, {
    SHOW_ADD_DIALOG: ShowAddDialog,
    SHOW_DELETE_DIALOG: ShowDeleteDialog,
    SHOW_RENAME_DIALOG: ShowRenameDialog,
    HIDE_DIALOG: HideDialog
});

export const notificationReducer = createReducer(null, {
    SHOW_NOTIFICATION_DIALOG: ShowNotificationDialog,
    HIDE_NOTIFICATION_DIALOG: HideNotificationDialog
});