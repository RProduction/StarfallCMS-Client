import React, {useState, useEffect, lazy} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FIRST_BOOT, NOT_AUTHORIZED} from '../redux/actions/authorizationActions';
import {Route, Switch} from 'react-router-dom';

import {ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogNotification from './DialogNotification';

const DocumentSchema = lazy(() => import('./DocumentSchema'));
const DocumentAddEdit = lazy(() => import('./DocumentAddEdit'));

function Document(props){
    const dispatch = useDispatch();

    const status = useSelector(state=>state.authStatus);
    const [authorized, setAuthorized] = useState(false);

    const notification = useSelector(state => state.notification);

    useEffect(()=>{
        if(status !== FIRST_BOOT && status !== NOT_AUTHORIZED) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    return(
        <React.Fragment>
            {authorized ? 
                <DialogNotification 
                    title={notification ? notification.title : ''} 
                    content={notification ? notification.content : ''}
                    dialogProps={{
                        open: Boolean(notification),
                        onClose: ()=>dispatch(HideNotificationDialog())
                    }}
                /> : null
            }
            <Switch>
                <Route path='/:project/:entity/schema' component={DocumentSchema} />
                <Route path='/:project/:entity/:document' component={DocumentAddEdit} />
            </Switch>
        </React.Fragment>
    )
}

export default Document;