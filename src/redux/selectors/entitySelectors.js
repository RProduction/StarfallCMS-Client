import {createSelector} from 'reselect';

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