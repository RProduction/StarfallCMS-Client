// UI SideBar switch
export function SwitchSideBar(status){
    return {type: "SWITCH_SIDEBAR", status: status};
}

// UI Notification Dialog switch and content data
export function ShowNotificationDialog(title, content){
    return {type: "SHOW_NOTIFICATION_DIALOG", title: title, content: content};
}

export function HideNotificationDialog(){
    return {type: "HIDE_NOTIFICATION_DIALOG"};
}

// UI dialog
export const ADD_DIALOG = "ADD_DIALOG";
export const DELETE_DIALOG = "DELETE_DIALOG";
export const RENAME_DIALOG = "RENAME_DIALOG";
export const IMG_DIALOG = "IMG_DIALOG";

export function ShowAddDialog(){
    return {type: "SHOW_ADD_DIALOG"};
}

export function ShowDeleteDialog(){
    return {type: "SHOW_DELETE_DIALOG"};
}

export function ShowRenameDialog(){
    return {type: "SHOW_RENAME_DIALOG"};
}

export function ShowImgDialog(){
    return {type: "SHOW_IMG_DIALOG"};
}

export function HideDialog(){
    return {type: "HIDE_DIALOG"};
}

// current target information
// id can be projectId or id for certain condition
export function SetTarget(id, name){
    return {type: "SET_TARGET", id: id, name: name};
}