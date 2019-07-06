import {createReducer} from './helpers';
import {ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG} from '../actions/globalActions';
import {Map} from 'immutable';

// target
function SetTarget(state, action){
    const {id, name} = action
    return state.set('id', id).set('name', name);
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
    const {title, content} = action;
    return state.set('title', title).set('content', content);
}

function HideNotificationDialog(state, action){
    return state.clear();
}

// reducers
export const targetReducer = createReducer(Map({name: '', id: 0}), {
    SET_TARGET: SetTarget
});

export const dialogReducer = createReducer(null, {
    SHOW_ADD_DIALOG: ShowAddDialog,
    SHOW_DELETE_DIALOG: ShowDeleteDialog,
    SHOW_RENAME_DIALOG: ShowRenameDialog,
    HIDE_DIALOG: HideDialog
});

export const notificationReducer = createReducer(Map({}), {
    SHOW_NOTIFICATION_DIALOG: ShowNotificationDialog,
    HIDE_NOTIFICATION_DIALOG: HideNotificationDialog
});