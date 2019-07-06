import {createSelector} from 'reselect';

// project selectors
const _selectProjects = state => state.projects;
export const selectProjectIds = state => Object.keys(_selectProjects(state));
export const selectProject = (state, id) => _selectProjects(state)[id];
export const selectAllProjects = state => Object.values(_selectProjects(state));

// entity selectors
const _selectEntities = state => state.entities;
export const selectEntityIds = state => Object.keys(_selectEntities(state));
export const selectEntity = (state, id) => _selectEntities(state)[id];
export const selectAllEntities = state => Object.values(_selectEntities(state));
export const selectEntitiesInProject = ()=>{
    return createSelector(
        selectAllEntities,
        (_, id) => id,
        (entities, id)=>{
            return entities.filter(value => value.projectId === id);
        }
    );
};

const _selectDocuments = state => state.documents;
export const selectDocumentIds = state => Object.keys(_selectDocuments(state));
export const selectDocument = (state, id) => _selectDocuments(state)[id];
export const selectAllDocuments = state => Object.values(_selectDocuments(state));
export const selectRelatedDocuments = ()=>{
    return createSelector(
        [selectEntity, selectAllDocuments],
        (entity, documents)=>{
            const res = documents.filter( value => value.entity_id === entity.id);
            if(res.length === 0) return null;

            return res[0];
        }
    );
};