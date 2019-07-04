import {createSelector} from 'reselect';

// project selectors
export const selectProjectIds = state => state.projects.ids;
export const selectProject = (state, id) => state.projects.byId[id];
export const selectAllProjects = state => Object.values(state.projects.byId);
export const selectProjectByName = ()=>{
    return createSelector(
        selectAllProjects,
        (_, name) => name,
        (projects, name)=>{
            const res = projects.filter( value => value.name === name);
            if(res.length === 0) return null;

            return res[0];
        }
    );
};

// entity selectors
export const selectEntityIds = state => state.entities.ids;
export const selectEntity = (state, id) => state.entities.byId[id];
export const selectAllEntities = state => Object.values(state.entities.byId);
export const selectRelatedEntities = ()=>{
    return createSelector(
        [selectProject, selectAllEntities],
        (project, entities)=>{
            return entities.filter( value => value.project_id === project.id);
        }
    );
};
export const selectEntityByName = ()=>{
    return createSelector(
        selectAllEntities,
        (_, name) => name,
        (entities, name)=>{
            const res = entities.filter( value => value.name === name);
            if(res.length === 0) return null;

            return res[0];
        }
    );
};

export const selectDocumentIds = state => state.documents.ids;
export const selectDocument = (state, id) => state.documents.byId[id];
export const selectAllDocuments = state => Object.values(state.documents.byId);
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