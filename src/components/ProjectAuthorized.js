import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG, HideDialog
    , ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogRename from './DialogRename';
import DialogDelete from './DialogDelete';
import DialogAdd from './DialogAdd';
import DialogNotification from './DialogNotification';

function ProjectAuthorized(props){
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const dialogType = useSelector(state => state.dialog);
    const notification = useSelector(state => state.notification);

    return(
        <React.Fragment>
            <DialogAdd
                dialogProps={{
                    open: dialogType === ADD_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                addCategory="Entity"
                addRequest={`entity/${target.id}`}
                onSucceed={(res, name) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Add New Entity ${name}`, 
                        `Succeed adding new entity ${name}`
                    ));
                }}
                onFail={(err, name) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Add New Entity ${name}`, 
                        `Fail adding new entity ${name}, error: ${err}`
                    ));
                }}
            />
            <DialogDelete
                dialogProps={{
                    open: dialogType === DELETE_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                targetName={target.name}
                deleteRequest={`entity/${target.id}`}
                onSucceed={(res, name) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Delete Entity ${name}`, 
                        `Succeed deleting entity ${name}`
                    ));
                }}
                onFail={(err, name) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Delete Entity ${name}`, 
                        `Fail deleting entity ${name}, error: ${err}`
                    ));
                }}
            />
            <DialogRename
                dialogProps={{
                    open: dialogType === RENAME_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                renameRequest={`entity/${target.id}/rename`}
                targetName={target.name}
                onSucceed={(res, name, newName) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Rename Entity ${name}`, 
                        `Succeed renaming entity ${name} into ${newName}`
                    ));
                }}
                onFail={(err, name, newName) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Rename Entity ${name}`, 
                        `Fail renaming entity ${name} into ${newName}, error: ${err}`
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
        </React.Fragment>
    )
}

export default ProjectAuthorized;