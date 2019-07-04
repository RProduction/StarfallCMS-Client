import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Fab, Box} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import OverviewCard from './OverviewCard';
import {CREATOR} from '../actions/authorizationActions';
import {selectAllProjects} from '../selectors/adminSelectors';

import { ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG, HideDialog, ShowAddDialog, ShowNotificationDialog, HideNotificationDialog } from '../actions/globalActions';
import OverviewPopover from './OverviewPopover';
import DialogRename from './DialogRename';
import DialogDelete from './DialogDelete';
import DialogAdd from './DialogAdd';
import DialogNotification from './DialogNotification';

function Authorized(props){
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const dialogType = useSelector(state=>state.dialog);
    const notification = useSelector(state=>state.notification);

    return(
        <React.Fragment>
            <DialogAdd
                dialogProps={{
                    open: dialogType === ADD_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                addCategory="Project"
                addRequest="project"
                onSucceed={(res, name) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Add New Project ${name}`, 
                        `Succeed adding new project ${name}`
                    ));
                }}
                onFail={(err, name) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Add New Project ${name}`, 
                        `Fail adding new project ${name}, error: ${err}`
                    ));
                }}
            />
            <DialogDelete
                dialogProps={{
                    open: dialogType === DELETE_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                targetName={target.name}
                deleteRequest={`project/${target.id}`}
                onSucceed={(res, name) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Delete Project ${name}`, 
                        `Succeed deleting project ${name}`
                    ));
                }}
                onFail={(err, name) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Delete Project ${name}`, 
                        `Fail deleting project ${name}, error: ${err}`
                    ));
                }}
            />
            <DialogRename
                dialogProps={{
                    open: dialogType === RENAME_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                renameRequest={`project/${target.id}/rename`}
                targetName={target.name}
                onSucceed={(res, name, newName) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Rename Project ${name}`, 
                        `Succeed renaming project ${name} into ${newName}`
                    ));
                }}
                onFail={(err, name, newName) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Rename Project ${name}`, 
                        `Fail renaming project ${name} into ${newName}, error: ${err}`
                    ));
                }}
            />
            <DialogNotification 
                title={notification ? notification.title : ''} 
                content={notification ? notification.content : ''}
                dialogProps={{
                    open: Boolean(notification),
                    onClose: ()=>dispatch(HideNotificationDialog())
                }}
            />
            <OverviewPopover/>
            <Box component={Fab} position="fixed" 
                bottom={30} right={30} zIndex={50}
                onClick={()=>dispatch(ShowAddDialog())}
            >
                <Add/>
            </Box>
        </React.Fragment>
    )
}

// fetch authStatus from redux store and setAuthorized(true) if creator
// Any actions in Overview will affect Project and need Creator level Authorization
function Overview(props){
    const status = useSelector(state=>state.authStatus);
    const projects = useSelector(selectAllProjects);
    const [authorized, setAuthorized] = useState(false);

    useEffect(()=>{
        if(status === CREATOR) setAuthorized(true);
        else setAuthorized(false);
    }, status);

    // view all projects within CMS and their attribute
    // project name
    // project thumbnail
    // project last modified
    // how many entity
    // list of entity and their last modified

    return(
        <Grid container>
            {authorized ? <Authorized/> : null}
            {
                projects.map((value, index)=>{
                    return(
                        <OverviewCard key={index+1} index={index+1} 
                            {...value} authorized={authorized}
                        />
                    )
                })
            }
        </Grid>
    )
}

export default Overview;