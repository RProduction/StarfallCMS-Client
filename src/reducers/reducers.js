import {combineReducers} from 'redux';

import authorizationReducer from './authorizationReducer';
import {projectsReducer, entitiesReducer, sidebarReducer} from './adminReducer';
import {projectPopoverReducer} from './projectReducer';
import {notificationReducer, dialogReducer, targetReducer} from './globalReducer';

const reducers = combineReducers(
    {
        authStatus: authorizationReducer,
        projects: projectsReducer,
        entities: entitiesReducer,
        dialog: dialogReducer,
        notification: notificationReducer,
        target: targetReducer,
        sidebar: sidebarReducer,
        projectPopover: projectPopoverReducer
    }
);

export default reducers;