import React, {useState, useEffect, useMemo, lazy} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CREATOR, MANAGER} from '../redux/actions/authorizationActions';
import {Grid} from '@material-ui/core';

import {GetEntityIdByName} from '../redux/indexes/database';
import {selectEntity} from '../redux/selectors/entitySelectors';
import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';

import DocumentSchemaObject from './DocumentSchemaObject';
import DocumentSchemaArray from './DocumentSchemaArray';
import DocumentSchemaField from './DocumentSchemaField';
import { GenerateField } from '../redux/actions/documentActions';

const DocumentSchemaAuthorized = lazy(()=> import('./DocumentSchemaAuthorized'));

function DocumentSchema(props){
    const dispatch = useDispatch();
    const {entity} = props.match.params;

    const status = useSelector(state=>state.authStatus);
    const [authorized, setAuthorized] = useState(false);

    const [id, setId] = useState(0);
    const _entity = useSelector(state => selectEntity(state, id));

    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const keys = useSelector(selectKeys);

    useEffect(()=>{
        if(status === CREATOR || status === MANAGER) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    useEffect(()=>{
        GetEntityIdByName(entity).then((value)=>{
            setId(value);
        });
    }, [entity]);

    useEffect(()=>{
        // generate schema
        if(_entity) dispatch(GenerateField(_entity.schema));
    }, [_entity]);

    return(
        <Grid container>
            {
                keys.map(value => {
                    const {key, type} = value;
                    const temp = [key];
                    if(type === 'object'){
                        return(
                            <DocumentSchemaObject key={key} keys={temp}/>
                        )
                    }
                    else if(type === 'array'){
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
            {authorized ? <DocumentSchemaAuthorized id={id} {...props}/> : null}
        </Grid>
    )
}

export default DocumentSchema;