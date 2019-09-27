import {createSelector} from 'reselect';
import {selectProjectByName} from './projectSelectors';

// storage selectors
const _selectStorage = state => state.storage;
export const selectStorageInProjectByName = ()=>{
    return createSelector(
        _selectStorage,
        (_, project) => {
            const select = selectProjectByName();
            return select(_, project);
        },
        (storage, project)=>{
            return project ? {
                project: project,
                storage: Object.values(storage).filter(
                    value => value.project_id === project.id
                )
            } : null;
        }
    );
};

// file upload selectors
const _selectFileUpload = state => state.fileUpload;
export const selectFileUploadName = (state, project) => {
    const res = _selectFileUpload(state)[project];
    return res ? Object.keys(res) : [];
};
export const selectFileUpload = (state, project, name) => {
    const res = _selectFileUpload(state)[project];
    return res ? res[name] : null;
};
export const selectAllFileUpload = (state, project) => {
    const res = _selectFileUpload(state)[project];
    return res ? Object.values(res) : [];
};