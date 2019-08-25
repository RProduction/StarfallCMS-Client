import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { ADD_DIALOG, RENAME_DIALOG, HideDialog
    , ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogCustom from './DialogCustom';

import Axios from '../Axios';

function StorageAuthorized(props){
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
                title="Add New Folder"
                btn="Add New Folder"
                request={async({name})=>{
                    try{
                        await Axios.post(`storage/${target.id}/folder`, {
                            path: target.path ? `${target.path}/${name}` : name
                        });
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Add New Folder ${name}`, 
                            `Succeed adding new folder ${name}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Add New Folder ${name}`, 
                            `Fail adding new folder ${name}, error: ${err}`
                        ));
                    }
                }}
            />
            <DialogCustom
                dialogProps={{
                    open: dialogType === RENAME_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                category="add"
                title={`Rename "${target.name}"`}
                btn={`Rename ${target.name}`}
                request={async({name})=>{
                    try{
                        await Axios.post(`storage/${target.id}/rename`, {
                            path: target.path,
                            name: target.name, 
                            new_name: name
                        });
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename "${target.name}" into "${name}"`, 
                            `Succeed renaming "${target.name}" into "${name}"`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename "${target.name}" into "${name}"`, 
                            `Fail renaming "${target.name}" into "${name}, error: ${err}"`
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

export default StorageAuthorized;