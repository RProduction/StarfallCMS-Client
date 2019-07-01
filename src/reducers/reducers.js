import {combineReducers} from 'redux';

import authorizationReducer from './authorizationReducer';
import {databaseReducer, sidebarReducer} from './adminReducer';
import {projectPopoverReducer} from './projectReducer';
import {notificationReducer, dialogReducer, targetReducer} from './globalReducer';

const reducers = combineReducers(
    {
        authStatus: authorizationReducer,
        sidebar: sidebarReducer,
        database: databaseReducer,
        dialog: dialogReducer,
        target: targetReducer,
        notification: notificationReducer,
        projectPopover: projectPopoverReducer
    }
);

export default reducers;