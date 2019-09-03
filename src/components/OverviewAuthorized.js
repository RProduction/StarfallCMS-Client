import React from 'react';

import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Add from '@material-ui/icons/Add';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import { ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG, IMG_DIALOG
    , HideDialog, ShowAddDialog, ShowNotificationDialog
    , HideNotificationDialog } from '../redux/actions/globalActions';
import OverviewPopover from './OverviewPopover';
import DialogCustom from './DialogCustom';

const FAB = React.forwardRef((props, ref)=>{
    return <Fab {...props} innerRef={ref} color="secondary"/>
});

function OverviewAuthorized(props){
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const dialogType = useSelector(state => state.dialog);
    const notification = useSelector(state => state.notification);

    return(
        <React.Fragment>
            <DialogCustom
                dialogProps={{
                    open: dialogType === ADD_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                category="add"
                title="Add New Project"
                btn="Add New Project"
                request={async({name})=>{
                    try{
                        await Axios.post("project", {
                            name: name
                        });
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Add New Project ${name}`, 
                            `Succeed adding new project ${name}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Add New Project ${name}`, 
                            `Fail adding new project ${name}, error: ${err}`
                        ));
                    }
                }}
            />
            <DialogCustom
                dialogProps={{
                    open: dialogType === DELETE_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                category="delete"
                title={`PERMANENTLY DELETE "${target.name}"`}
                btn={`PERMANENTLY DELETE "${target.name}"`}
                content={`This action will PERMANENTLY DELETE "${target.name}". Proceed with caution!`}
                targetName={target.name}
                request={async({name})=>{
                    try{
                        await Axios.delete(`project/${target.id}`);
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Delete Project ${name}`, 
                            `Succeed deleting project ${name}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Delete Project ${name}`, 
                            `Fail deleting project ${name}, error: ${err}`
                        ));
                    }
                }}
            />
            <DialogCustom
                dialogProps={{
                    open: dialogType === RENAME_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                category="rename"
                title={`Rename "${target.name}"`}
                btn={`Rename "${target.name}"`}
                targetName={target.name}
                request={async({name, newName})=>{
                    try{
                        await Axios.post(`project/${target.id}/rename`, {
                            name: newName
                        });
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename Project ${name}`, 
                            `Succeed renaming project ${name} into ${newName}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename Project ${name}`, 
                            `Fail renaming project ${name} into ${newName}, error: ${err}`
                        ));
                    }
                }}
            />
            <DialogCustom
                category="notification"
                title={notification.title} 
                content={notification.content}
                dialogProps={{
                    open: notification.title !== '' && notification.content !== '',
                    onClose: ()=>dispatch(HideNotificationDialog())
                }}
            />
            <OverviewPopover/>
            <Box component={FAB} position="fixed" 
                bottom={30} right={30} zIndex={50}
                onClick={()=>dispatch(ShowAddDialog())}
            >
                <Add/>
            </Box>
        </React.Fragment>
    )
}

export default OverviewAuthorized;