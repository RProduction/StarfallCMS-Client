import { createReducer } from './helpers';

// admin sidebar switch
function SwitchSideBar(state, action) {
    return action.status;
}

// admin database of project, entity, and item
function AddProject(state, action){
    let temp = state;
    const {id, name, updated, created, publicKey} = action; 

    temp[name] = {
        id: id,
        created: created,
        updated: updated,
        publicKey: publicKey,
        entities: {}
    };

    return temp;      
}

function DeleteProject(state, action){
    let temp = state;
    const {name} = action; 

    delete temp[name];

    return temp;      
}

function RenameProject(state, action){
    let temp = state;
    const {oldName, name, updated} = action;

    let tempValue;
    tempValue = temp[oldName];
    temp[name] = tempValue;
    temp[name].updated = updated;
    delete temp[oldName];

    return temp;      
}

function AddEntity(state, action){
    let temp = state;
    const {id, name, updated, created, projectName} = action; 

    temp[projectName].entities[name] = {
        id: id,
        created: created,
        updated: updated,
        items: {}
    };

    return temp;      
}

function DeleteEntity(state, action){
    let temp = state;
    const {projectName, name} = action;

    delete temp[projectName].entities[name];

    return temp;      
}

function RenameEntity(state, action){
    let temp = state;
    const {projectName, name, oldName, updated} = action; 

    let tempValue;
    tempValue = temp[projectName].entities[oldName];
    temp[projectName].entities[name] = tempValue;
    temp[projectName].entities[name].updated = updated;
    delete temp[projectName].entities[oldName];

    return temp;      
}

// reducers
export const sidebarReducer = createReducer(false, {
    SWITCH_SIDEBAR: SwitchSideBar
});

export const databaseReducer = createReducer({}, {
    ADD_PROJECT: AddProject,
    DELETE_PROJECT: DeleteProject,
    RENAME_PROJECT: RenameProject,
    ADD_ENTITY: AddEntity,
    DELETE_ENTITY: DeleteEntity,
    RENAME_ENTITY: RenameEntity
});