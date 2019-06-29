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

export function DeleteProject(name){
    return {type: DELETE_PROJECT, name: name};
}

export function RenameProject(oldName, name){
    return {type: RENAME_PROJECT, oldName: oldName, name: name};
}

export function AddEntity(projectName, id, name){
    return {type: ADD_ENTITY, projectName: projectName, id: id, name: name};
}

export function DeleteEntity(projectName, name){
    return {type: DELETE_ENTITY, projectName: projectName, name: name};
}

export function RenameEntity(projectName, oldName, name){
    return {type: RENAME_ENTITY, projectName: projectName, oldName: oldName, name: name};
}