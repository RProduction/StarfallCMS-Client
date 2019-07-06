import {createReducer} from './helpers';
import {ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG} from '../actions/globalActions';
import {produce} from 'immer';

// target
const SetTarget = (state, action) => produce(state, (draft)=>{
    const {id, name} = action;
    draft.id = id;
    draft.name = name;
});

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
const ShowNotificationDialog = (state, action) => produce(state, (draft)=>{
    const {title, content} = action;
    draft = {
        title: title,
        content: content
    };
});

const HideNotificationDialog = (state, action) => produce(state, (draft)=>{
    draft = null;
});

// reducers
export const targetReducer = createReducer({name: '', id: 0}, {
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