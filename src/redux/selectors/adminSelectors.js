import {createSelector} from 'reselect';
import * as Indexes from '../indexes/database';

// project selectors
const _selectProjects = state => state.projects;
export const selectProjectIds = state => Object.keys(_selectProjects(state));
export const selectProject = (state, id) => _selectProjects(state)[id];
export const selectAllProjects = state => Object.values(_selectProjects(state));
export const selectProjectByName = ()=>{
    return createSelector(
        _selectProjects,
        (_, name) => name,
        (projects, name)=>{
            const id = Indexes.GetProjectIdByName(name);
            return projects[id];
        }
    );
};

// entity selectors
const _selectEntities = state => state.entities;
const _selectRelatedEntities = (state, id) => Indexes.GetRelatedEntityByProjectId(id);
export const selectEntityIds = state => Object.keys(_selectEntities(state));
export const selectEntity = (state, id) => _selectEntities(state)[id];
export const selectAllEntities = state => Object.values(_selectEntities(state));
export const selectRelatedEntities = ()=>{
    return createSelector(
        [_selectRelatedEntities, _selectEntities],
        (relatedIds, entities)=>{
            return relatedIds.map((value) =>{
                return entities[value];
            });
        }
    );
};
export const selectEntityByName = ()=>{
    return createSelector(
        _selectEntities,
        (_, name) => name,
        (entities, name)=>{
            const id = Indexes.GetEntityIdByName(name);
            return entities[id];
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