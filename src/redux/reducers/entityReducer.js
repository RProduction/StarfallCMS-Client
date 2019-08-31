import { createReducer } from './helpers';
import {produce} from 'immer';

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
export const entitiesReducer = createReducer({}, {
    ADD_ENTITIES: AddEntities,
    DELETE_ENTITIES: DeleteEntities,
    RENAME_ENTITY: RenameEntity
});
