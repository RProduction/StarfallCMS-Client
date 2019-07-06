import {createSelector} from 'reselect';
import * as Indexes from '../indexes/database';

// project selectors
const _selectProjects = state => state.projects;
export const selectProjectIds = state => Array.from(_selectProjects(state).keys());
export const selectProject = (state, id) => _selectProjects(state).get(id);
export const selectAllProjects = state => Array.from(_selectProjects(state).values());
export const selectProjectByName = ()=>{
    return createSelector(
        _selectProjects,
        (_, name) => name,
        (projects, name)=>{
            const id = Indexes.GetProjectIdByName(name);
            return projects.get(id);
        }
    );
};

// entity selectors
const _selectEntities = state => state.entities;
const _selectRelatedEntities = (state, id) => Indexes.GetRelatedEntityByProjectId(id);
export const selectEntityIds = state => Array.from(_selectEntities(state).keys());
export const selectEntity = (state, id) => _selectEntities(state).get(id);
export const selectAllEntities = state => Array.from(_selectEntities(state).values());
export const selectRelatedEntities = ()=>{
    return createSelector(
        [_selectRelatedEntities, _selectEntities],
        (relatedIds, entities)=>{
            return relatedIds.map((value) =>{
                return entities.get(value);
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
            return entities.get(id);
        }
    );
};

const _selectDocuments = state => state.documents;
export const selectDocumentIds = state => Array.from(_selectDocuments(state).keys());
export const selectDocument = (state, id) => _selectDocuments(state).get(id);
export const selectAllDocuments = state => Array.from(_selectDocuments(state).values());
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