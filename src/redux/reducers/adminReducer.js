import { createReducer } from './helpers';
import {Map} from 'immutable';
import * as Indexes from '../indexes/database';

// admin sidebar switch
function SwitchSideBar(state, action) {
    return action.status;
}

// admin database of project, entity, and item
// id, name, updated, created, publicKey
function AddProject(state, action){
    const {id, name, updated, created, publicKey} = action; 

    Indexes.AddProject(id, name);

    return state.set(id, {
        id: id,
        name: name,
        created: created,
        updated: updated,
        publicKey: publicKey
    });
}

function DeleteProject(state, action){
    const {id} = action;

    Indexes.DeleteProject(id);

    return state.remove(id);
}

function RenameProject(state, action){
    const {id, name, updated} = action;

    Indexes.RenameProject(id, name);

    return state.update(id, (value)=>{
        value.name = name;
        value.updated = updated;
        return value;
    });
}

function AddEntity(state, action){
    const {id, project_id, name, updated, created} = action; 

    Indexes.AddEntity(id, project_id, name);

    return state.set(id, {
        id: id,
        project_id: project_id,
        name: name,
        created: created,
        updated: updated
    });
}

function DeleteEntity(state, action){
    const {id} = action;

    Indexes.DeleteEntity(id);

    return state.remove(id);
}

function DeleteEntityByProject(state, action){
    const {id} = action;
    
    // get array of related entity id
    // then loop it to delete in state
    // after that remove related entity index
    let result = state;
    const entities = Indexes.GetRelatedEntityByProjectId(id);
    for(let entity of entities){
        result = result.remove(entity);
    }
    Indexes.DeleteRelatedEntity(id);

    return result;
}

function RenameEntity(state, action){
    const {id, name, updated} = action; 

    Indexes.RenameEntity(id, name);

    return state.update(id, (value)=>{
        value.name = name;
        value.updated = updated;
        return value;
    });
}

// reducers
export const sidebarReducer = createReducer(false, {
    SWITCH_SIDEBAR: SwitchSideBar
});

export const projectsReducer = createReducer(Map({}), {
    ADD_PROJECT: AddProject,
    DELETE_PROJECT: DeleteProject,
    RENAME_PROJECT: RenameProject,
});

export const entitiesReducer = createReducer(Map({}), {
    ADD_ENTITY: AddEntity,
    DELETE_ENTITY: DeleteEntity,
    DELETE_ENTITY_BY_PROJECT: DeleteEntityByProject,
    RENAME_ENTITY: RenameEntity
});