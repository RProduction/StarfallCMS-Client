import {createReducer} from './helpers';
import {ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG, IMG_DIALOG} from '../actions/globalActions';
import {produce} from 'immer';

// admin sidebar switch
function SwitchSideBar(state, action) {
    return action.status;
}

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

function ShowImgDialog(state, action){
    return IMG_DIALOG;
}

function HideDialog(state, action){
    return null;
}

// notification dialog switch
const ShowNotificationDialog = (state, action) => produce(state, (draft)=>{
    const {title, content} = action;
    draft.title = title;
    draft.content = content;
});

const HideNotificationDialog = (state, action) => produce(state, (draft)=>{
    draft.title = '';
    draft.content = '';
});

// reducers
export const sidebarReducer = createReducer(false, {
    SWITCH_SIDEBAR: SwitchSideBar
});

export const targetReducer = createReducer({name: '', id: 0}, {
    SET_TARGET: SetTarget
});

export const dialogReducer = createReducer(null, {
    SHOW_ADD_DIALOG: ShowAddDialog,
    SHOW_DELETE_DIALOG: ShowDeleteDialog,
    SHOW_RENAME_DIALOG: ShowRenameDialog,
    SHOW_IMG_DIALOG: ShowImgDialog,
    HIDE_DIALOG: HideDialog
});

export const notificationReducer = createReducer({title: '', content: ''}, {
    SHOW_NOTIFICATION_DIALOG: ShowNotificationDialog,
    HIDE_NOTIFICATION_DIALOG: HideNotificationDialog
});