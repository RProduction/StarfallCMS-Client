import { createReducer } from './helpers';
import {produce} from 'immer';
import * as Indexes from '../indexes/database';

// admin sidebar switch
function SwitchSideBar(state, action) {
    return action.status;
}

// admin database of project, entity, and item
// id, name, updated, created, publicKey
const AddProject = (state, action) => produce(state, (draft)=>{
    const {id, name, updated, created, publicKey} = action; 
    
    Indexes.AddProject(id, name);
    draft[id] = {
        id: id,
        name: name,
        created: created,
        updated: updated,
        publicKey: publicKey
    };
});

const DeleteProject = (state, action) => produce(state, (draft)=>{
    const {id} = action;
    Indexes.DeleteProject(id);
    delete draft[id];
});

const RenameProject = (state, action) => produce(state, (draft)=>{
    const {id, name, updated} = action;
    Indexes.RenameProject(id, name);
    draft[id].name = name;
    draft[id].updated = updated;
});

const AddEntity = (state, action) => produce(state, (draft)=>{
    const {id, project_id, name, updated, created} = action; 
    Indexes.AddEntity(id, project_id, name);
    draft[id] = {
        id: id,
        project_id: project_id,
        name: name,
        created: created,
        updated: updated
    };
});

const DeleteEntity = (state, action) => produce(state, (draft)=>{
    const {id} = action;
    Indexes.DeleteEntity(id);
    delete draft[id];
});

const DeleteEntityByProject = (state, action) => produce(state, (draft)=>{
    const {id} = action;
    
    // get array of related entity id
    // then loop it to delete in state
    // after that remove related entity index
    const entities = Indexes.GetRelatedEntityByProjectId(id);
    for(let entity of entities){
        delete draft[entity];
    }
    Indexes.DeleteRelatedEntity(id);
});

const RenameEntity = (state, action) => produce(state, (draft)=>{
    const {id, name, updated} = action; 
    Indexes.RenameEntity(id, name);
    draft[id].name = name;
    draft[id].updated = updated;
});

// reducers
export const sidebarReducer = createReducer(false, {
    SWITCH_SIDEBAR: SwitchSideBar
});

export const projectsReducer = createReducer({}, {
    ADD_PROJECT: AddProject,
    DELETE_PROJECT: DeleteProject,
    RENAME_PROJECT: RenameProject,
});

export const entitiesReducer = createReducer({}, {
    ADD_ENTITY: AddEntity,
    DELETE_ENTITY: DeleteEntity,
    DELETE_ENTITY_BY_PROJECT: DeleteEntityByProject,
    RENAME_ENTITY: RenameEntity
});