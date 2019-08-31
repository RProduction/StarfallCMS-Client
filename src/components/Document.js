import React, {lazy} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {HideNotificationDialog} from '../redux/actions/globalActions';
import DialogCustom from './DialogCustom';

const DocumentAdd = lazy(() => import('./DocumentAdd'));
const DocumentEdit = lazy(() => import('./DocumentEdit'));

function Document(props){
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);

    return(
        <React.Fragment>
            <DialogCustom
                category="notification"
                title={notification.title}
                content={notification.content}
                dialogProps={{
                    open: notification.title !== '' && notification.content !== '',
                    onClose: () => dispatch(HideNotificationDialog())
                }}
            />
            <Switch>
                <Route path='/:project/:entity/add' component={DocumentAdd} />
                <Route path='/:project/:entity/:document' component={DocumentEdit} />
            </Switch>
        </React.Fragment>
    )
}

export default Document;