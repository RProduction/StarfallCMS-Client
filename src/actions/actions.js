// authorization status
export const SET_AUTHORIZATION_STATUS = "SET_AUTHORIZATION_STATUS";
export const FIRST_BOOT = "FIRST_BOOT";
export const NOT_AUTHORIZED = "NOT_AUTHORIZED";
export const USER = "USER";
export const MANAGER = "MANAGER";
export const CREATOR = "CREATOR";
export const AUTHORIZATION_STATUS = {
    "0": FIRST_BOOT,
    "-1": NOT_AUTHORIZED,
    "1": USER,
    "2": MANAGER,
    "3": CREATOR
};

export function SetAuthStatus(status){
    return {type: SET_AUTHORIZATION_STATUS, status: status};
}

// UI SideBar switch
export const SWITCH_SIDEBAR = "SWITCH_SIDEBAR";
export function SwitchSideBar(status){
    return {type: SWITCH_SIDEBAR, status: status};
}

// projects and entities
export const ADD_PROJECT = "ADD_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const RENAME_PROJECT = "RENAME_PROJECT";

export const ADD_ENTITY = "ADD_ENTITY";
export const DELETE_ENTITY = "DELETE_ENTITY";
export const RENAME_ENTITY = "RENAME_ENTITY";

export function AddProject(id, name){
    return {type: ADD_PROJECT, id: id, name: name};
}

export function DeleteProject(id){
    return {type: DELETE_PROJECT, id: id};
}

export function RenameProject(id, name){
    return {type: RENAME_PROJECT, id: id, name: name};
}

export function AddEntity(projectid, id, name){
    return {type: ADD_ENTITY, projectid: projectid, id: id, name: name};
}

export function DeleteEntity(projectid, id){
    return {type: DELETE_ENTITY, projectid: projectid, id: id};
}

export function RenameEntity(projectid, id, name){
    return {type: RENAME_ENTITY, projectid: projectid, id: id, name: name};
}