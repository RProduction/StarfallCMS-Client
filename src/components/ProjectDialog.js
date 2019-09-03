import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import { ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG, HideDialog, ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogCustom from './DialogCustom';

function ProjectAuthorized(props){
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
                title="Add New Entity"
                btn="Add New Entity"
                request={async({name})=>{
                    try{
                        await Axios.post(`entity/${target.id}`, {
                            name: name
                        });
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Add New Entity ${name}`, 
                            `Succeed adding new entity ${name}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Add New Entity ${name}`, 
                            `Fail adding new entity ${name}, error: ${err}`
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
                        await Axios.delete(`entity/${target.id}`);
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Delete Entity ${name}`, 
                            `Succeed deleting entity ${name}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Delete Entity ${name}`, 
                            `Fail deleting entity ${name}, error: ${err}`
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
                        await Axios.post(`entity/${target.id}/rename`, {
                            name: newName
                        });
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename Entity ${name}`, 
                            `Succeed renaming entity ${name} into ${newName}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename Entity ${name}`, 
                            `Fail renaming entity ${name} into ${newName}, error: ${err}`
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
        </React.Fragment>
    )
}

export default ProjectAuthorized;