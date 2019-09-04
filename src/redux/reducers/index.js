import combineReducers from 'redux/src/combineReducers';

import authorizationReducer from './authorizationReducer';
import {projectPopoverReducer, projectsReducer} from './projectReducer';
import {entitiesReducer} from './entityReducer';
import {documentsReducer} from './documentReducer';
import {storageReducer} from './storageReducer';
import {notificationReducer, dialogReducer, targetReducer, sidebarReducer} from './globalReducer';

const reducers = combineReducers(
    {
        authStatus: authorizationReducer,
        projects: projectsReducer,
        entities: entitiesReducer,
        documents: documentsReducer,
        storage: storageReducer,
        dialog: dialogReducer,
        notification: notificationReducer,
        target: targetReducer,
        sidebar: sidebarReducer,
        projectPopover: projectPopoverReducer
    }
);

export default reducers;