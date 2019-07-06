import { createReducer } from './helpers';
import {produce} from 'immer';

// admin sidebar switch
function SwitchSideBar(state, action) {
    return action.status;
}

// admin database of project, entity, and item
// receive array of id, name, updated, created, publicKey
const AddProjects = (state, action) => produce(state, (draft)=>{
    const {projects} = action;
    for(let project of projects){
        draft[project.id] = {
            id: project.id,
            name: project.name,
            created: project.created,
            updated: project.updated,
            publicKey: project.publicKey
        }
    }
});

const DeleteProject = (state, action) => produce(state, (draft)=>{
    const {id} = action;
    delete draft[id];
});

const RenameProject = (state, action) => produce(state, (draft)=>{
    const {id, name, updated} = action;
    draft[id].name = name;
    draft[id].updated = updated;
});

// receive array of id, projectId, name, updated, created
const AddEntities = (state, action) => produce(state, (draft)=>{
    const {entities} = action;
    for(let entity of entities){
        draft[entity.id] = {
            id: entity.id,
            projectId: entity.projectId,
            name: entity.name,
            created: entity.created,
            updated: entity.updated
        }
    }
});

// receive array of entity id
const DeleteEntities = (state, action) => produce(state, (draft)=>{
    const {entities} = action;
    for(let entity of entities){
        delete draft[entity];
    }
});

const RenameEntity = (state, action) => produce(state, (draft)=>{
    const {id, name, updated} = action; 
    draft[id].name = name;
    draft[id].updated = updated;
});

// reducers
export const sidebarReducer = createReducer(false, {
    SWITCH_SIDEBAR: SwitchSideBar
});

export const projectsReducer = createReducer({}, {
    ADD_PROJECTS: AddProjects,
    DELETE_PROJECT: DeleteProject,
    RENAME_PROJECT: RenameProject,
});

export const entitiesReducer = createReducer({}, {
    ADD_ENTITIES: AddEntities,
    DELETE_ENTITIES: DeleteEntities,
    RENAME_ENTITY: RenameEntity
});