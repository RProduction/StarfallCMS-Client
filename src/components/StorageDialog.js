import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import { RENAME_DIALOG, HideDialog, ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogCustom from './DialogCustom';

function StorageDialog(props){
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const dialogType = useSelector(state => state.dialog);
    const notification = useSelector(state => state.notification);

    return(
        <React.Fragment>
            <DialogCustom
                dialogProps={{
                    open: dialogType === RENAME_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                category="add"
                title={`Rename "${target.name}"`}
                btn={`Rename ${target.name}`}
                request={async({name})=>{
                    // check if this is file or folder
					// if file then add extension behind name
					const extension = target.name.split('.')[1];
                    const new_name = extension ? `${name}.${extension}` : name;
                    
                    try{
                        await Axios.post(`storage/${target.id}/rename`, {
                            name: new_name
                        });
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename "${target.name}" into "${new_name}"`, 
                            `Succeed renaming "${target.name}" into "${new_name}"`
                        ));
                    }catch(err){
                        dispatch(HideDialog());
                        dispatch(ShowNotificationDialog(
                            `Rename "${target.name}" into "${new_name}"`, 
                            `Fail renaming "${target.name}" into "${new_name}, error: ${err}"`
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

export default StorageDialog;