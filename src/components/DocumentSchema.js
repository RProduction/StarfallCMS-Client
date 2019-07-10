import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FIRST_BOOT, NOT_AUTHORIZED} from '../redux/actions/authorizationActions';
import {Grid} from '@material-ui/core';

import {GetEntityIdByName} from '../redux/indexes/database';
import {selectEntity} from '../redux/selectors/entitySelectors';
import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import {ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogNotification from './DialogNotification';

import DocumentAddField from './DocumentAddField';
import DocumentSaveButton from './DocumentSaveButton';
import DocumentCancelButton from './DocumentCancelButton';
import DocumentAddButton from './DocumentAddButton';
import DocumentSchemaObject from './DocumentSchemaObject';
import DocumentSchemaArray from './DocumentSchemaArray';
import DocumentSchemaField from './DocumentSchemaField';
import { GenerateField } from '../redux/actions/documentActions';

function DocumentSchema(props){
    const dispatch = useDispatch();
    const {entity} = props.match.params;

    const status = useSelector(state=>state.authStatus);
    const [authorized, setAuthorized] = useState(false);

    const notification = useSelector(state => state.notification);

    const [id, setId] = useState(0);
    const _entity = useSelector(state => selectEntity(state, id));

    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const keys = useSelector(state => selectKeys(state));
    const [add, setAdd] = useState(false);

    useEffect(()=>{
        if(status !== FIRST_BOOT && status !== NOT_AUTHORIZED) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    useEffect(()=>{
        GetEntityIdByName(entity).then((value)=>{
            console.log(value);
            setId(value);
        });
    }, [entity]);

    useEffect(()=>{
        // generate schema
        console.log(_entity);
        if(_entity) dispatch(GenerateField(_entity.schema));
    }, [_entity]);

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
            <Grid container>
                {
                    keys.map(value => {
                        const {key, type} = value;
                        const temp = [key];
                        if(type.constructor === Object){
                            return(
                                <DocumentSchemaObject key={key} keys={temp}/>
                            )
                        }
                        else if(type.constructor === Array){
                            return(
                                <DocumentSchemaArray key={key} keys={temp}/>
                            )
                        }else{
                            return(
                                <DocumentSchemaField key={key} keys={temp} category={type}/>
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
                <DocumentCancelButton cancel={() => {}}/>
                <DocumentSaveButton save={() => {}}/>
			</Grid>
        </React.Fragment>
    )
}

export default DocumentSchema;