import {createSelector} from 'reselect';

// project selectors
const _selectProjects = state => state.projects;
export const selectProjectIds = state => Object.keys(_selectProjects(state));
export const selectProject = (state, id) => _selectProjects(state)[id];
export const selectAllProjects = state => Object.values(_selectProjects(state));
export const selectProjectByName = ()=>{
    return createSelector(
        selectAllProjects,
        (_, name) => name,
        (projects, name)=>{
            return projects.find(value => value.name === name);
        }
    );
};