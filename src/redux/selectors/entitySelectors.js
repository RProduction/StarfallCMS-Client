import {createSelector} from 'reselect';
import {selectProjectByName} from './projectSelectors';

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
export const selectEntitiesInProjectByName = ()=>{
    return createSelector(
        selectAllEntities,
        (state, name) => {
            const select = selectProjectByName();
            return select(state, name);
        },
        (entities, project)=>{
            return {
                project: project,
                entities: entities.filter(value => value.projectId === project.id)
            };
        }
    );
};
export const selectEntityByName = ()=>{
    return createSelector(
        selectAllEntities,
        (_, name) => name,
        (entities, name)=>{
            return entities.find(value => value.name === name);
        }
    );
};