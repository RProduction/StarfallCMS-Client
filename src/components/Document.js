import React, {lazy, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {FIRST_BOOT, NOT_AUTHORIZED} from '../redux/actions/authorizationActions';
import {HideNotificationDialog} from '../redux/actions/globalActions';

const DialogNotification = lazy(() => import('./DialogNotification'));
const DocumentSchema = lazy(() => import('./DocumentSchema'));
const DocumentAdd = lazy(() => import('./DocumentAdd'));
const DocumentEdit = lazy(() => import('./DocumentEdit'));


function Document(props){
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);

    const status = useSelector(state=>state.authStatus);
    const [authorized, setAuthorized] = useState(false);
    
    useEffect(()=>{
        if(status !== FIRST_BOOT && status !== NOT_AUTHORIZED) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    return(
        <React.Fragment>
            {authorized ? 
                <DialogNotification 
                    title={notification.title} 
                    content={notification.content}
                    dialogProps={{
                        open: notification.title !== '' && notification.content !== '',
                        onClose: ()=>dispatch(HideNotificationDialog())
                    }}
                /> : null
            }
            <Switch>
                <Route path='/:project/:entity/schema' component={DocumentSchema} />
                <Route path='/:project/:entity/add' component={DocumentAdd} />
                <Route path='/:project/:entity/:document' component={DocumentEdit} />
            </Switch>
        </React.Fragment>
    )
}

export default Document;