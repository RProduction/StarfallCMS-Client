import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import { HideDialog, ShowNotificationDialog, HideNotificationDialog, DELETE_DIALOG} from '../redux/actions/globalActions';
import {DeleteUser} from '../redux/actions/authorizationActions';
import DialogCustom from './DialogCustom';

function UserListDialog(props){
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const dialogType = useSelector(state => state.dialog);
    const notification = useSelector(state => state.notification);

    return(
        <React.Fragment>
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
                        await Axios.delete(`user/${target.id}`);
                        dispatch(DeleteUser(target.id));
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Delete User ${name}`, 
                            `Succeed deleting user ${name}`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Delete User ${name}`, 
                            `Fail deleting user ${name}, error: ${err}`
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

export default UserListDialog;