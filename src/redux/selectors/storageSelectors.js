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
            return {
                project: project,
                storage: Object.values(storage).filter(
                    value => value.project_id === project.id
                )
            };
        }
    );
};