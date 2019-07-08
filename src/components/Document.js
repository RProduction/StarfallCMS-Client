import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FIRST_BOOT, NOT_AUTHORIZED} from '../redux/actions/authorizationActions';
import {selectDocument} from '../redux/selectors/documentSelectors';
import {List, ListItem} from '@material-ui/core';

import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import {AddDocuments, GenerateField} from '../redux/actions/documentActions';
import {ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogNotification from './DialogNotification';

import DocumentAddField from './DocumentAddField';
import DocumentAddButton from './DocumentAddButton';
import DocumentContainerField from './DocumentContainerField';
import DocumentField from './DocumentField';

function Document(props){
    const dispatch = useDispatch();
    const {history} = props;
    const {document} = props.match.params;
    
    const status = useSelector(state=>state.authStatus);
    const [authorized, setAuthorized] = useState(false);

    const notification = useSelector(state => state.notification);

    const _document = useSelector(state => selectDocument(state, document));
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const keys = useSelector(state => selectKeys(state));
    const [add, setAdd] = useState(false);

    useEffect(()=>{
        if(status !== FIRST_BOOT && status !== NOT_AUTHORIZED) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    if(!_document && document !== 'add'){
        history.goBack();
    }else if(_document){
        // _document exist then generate currentDocument topology 
        dispatch(GenerateField(_document));
    }

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
            <List>
                {
                    keys.map(value => {
                        const {key, type} = value;
                        const temp = [key];
                        if(type.constructor === Object || type.constructor === Array){
                            return(
                                <DocumentContainerField key={key} keys={temp}/>
                            )
                        }else{
                            return(
                                <DocumentField key={key} keys={temp} category={type}/>
                            )
                        }
                    })
                }
                {
                    add 
                    ? <DocumentAddField keys={[]} cancel={() => setAdd(false)}/> 
                    : null
                }
                <DocumentAddButton add={() => setAdd(true)}/>
                <ListItem button>
                    {document === 'add' ? 'Add' : 'Modify'}
				</ListItem>
			</List>
        </React.Fragment>
    )
}

export default Document;