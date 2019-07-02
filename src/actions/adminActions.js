// UI SideBar switch
export function SwitchSideBar(status){
    return {type: "SWITCH_SIDEBAR", status: status};
}

// projects and entities
export function AddProject(id, name, created, updated, publicKey){
    return {
        type: "ADD_PROJECT", 
        id: id, 
        name: name, 
        created: created, 
        updated: updated, 
        publicKey: publicKey
    };
}

export function DeleteProject(name){
    return {type: "DELETE_PROJECT", name: name};
}

export function RenameProject(oldName, name, updated){
    return {
        type: "RENAME_PROJECT", 
        oldName: oldName, 
        name: name,
        updated: updated
    };
}

export function AddEntity(projectName, id, name, created, updated){
    return {
        type: "ADD_ENTITY", 
        projectName: projectName, 
        id: id, 
        name: name,
        created: created,
        updated: updated
    };
}

export function DeleteEntity(projectName, name){
    return {type: "DELETE_ENTITY", projectName: projectName, name: name};
}

export function RenameEntity(projectName, oldName, name, updated){
    return {
        type: "RENAME_ENTITY", 
        projectName: projectName, 
        oldName: oldName, 
        name: name,
        updated: updated
    };
}