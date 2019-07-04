import { createReducer } from './helpers';

// admin sidebar switch
function SwitchSideBar(state, action) {
    return action.status;
}

// admin database of project, entity, and item
function AddProject(state, action){
    let temp = state;
    const {id, name, updated, created, publicKey} = action; 

    temp.ids.push(id);
    temp.byId[id] = {
        id: id,
        name: name,
        created: created,
        updated: updated,
        publicKey: publicKey
    };

    return temp;      
}

function DeleteProject(state, action){
    let temp = state;
    const {id} = action;

    temp.ids = temp.ids.filter(value => value !== id);
    delete temp.byId[id];

    return temp;      
}

function RenameProject(state, action){
    let temp = state;
    const {id, name, updated} = action;

    temp.byId[id].name = name;
    temp.byId[id].updated = updated;

    return temp;      
}

function AddEntity(state, action){
    let temp = state;
    const {id, project_id, name, updated, created} = action; 

    temp.ids.push(id);
    temp.byId[id] = {
        id: id,
        project_id: project_id,
        name: name,
        created: created,
        updated: updated
    };

    return temp;      
}

function DeleteEntity(state, action){
    let temp = state;
    const {id} = action;

    temp.ids = temp.ids.filter(value => value !== id);
    delete temp.byId[id];

    return temp;      
}

function DeleteEntityByProject(state, action){
    let temp = state;
    const {id} = action;
    
    const entities = Object.values(temp.byId).filter(value => value.project_id === id);
    for(let entity of entities){
        temp.ids = temp.ids.filter(value => value !== entity.id);
        delete temp.byId[entity.id];
    }

    return temp;      
}

function RenameEntity(state, action){
    let temp = state;
    const {id, name, updated} = action; 

    temp.byId[id].name = name;
    temp.byId[id].updated = updated;

    return temp;      
}

// reducers
export const sidebarReducer = createReducer(false, {
    SWITCH_SIDEBAR: SwitchSideBar
});

export const projectsReducer = createReducer({byId: {}, ids: []}, {
    ADD_PROJECT: AddProject,
    DELETE_PROJECT: DeleteProject,
    RENAME_PROJECT: RenameProject,
});

export const entitiesReducer = createReducer({byId: {}, ids: []}, {
    ADD_ENTITY: AddEntity,
    DELETE_ENTITY: DeleteEntity,
    DELETE_ENTITY_BY_PROJECT: DeleteEntityByProject,
    RENAME_ENTITY: RenameEntity
});