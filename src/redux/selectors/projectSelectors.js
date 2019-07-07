// project selectors
const _selectProjects = state => state.projects;
export const selectProjectIds = state => Object.keys(_selectProjects(state));
export const selectProject = (state, id) => _selectProjects(state)[id];
export const selectAllProjects = state => Object.values(_selectProjects(state));