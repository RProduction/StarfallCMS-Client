import React, {useMemo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import FormButton from './FormButton';
import {ShowNotificationDialog} from '../redux/actions/globalActions';

import {selectCurrentDocumentKeys, selectCurrentDocumentData} from '../redux/selectors/documentSelectors';
import {GenerateField} from '../redux/actions/documentActions';

import DocumentObject from './DocumentObject';
import DocumentArray from './DocumentArray';
import DocumentField from './DocumentField';

import {GetEntityIdByName} from '../redux/indexes/database';
import {selectEntity} from '../redux/selectors/entitySelectors';
import Axios from '../Axios';

//receive type as blueprint and generate default value for it
function GenerateDefaultFromType(type, defaultValue){
    Object.entries(type).forEach(([key, value])=>{
        // check type and assign
        if(value === 'integer'){
            defaultValue[key] = 0;
        }
        else if(value === 'float'){
            defaultValue[key] = 0;
        }
        else if(value === 'string'){
            defaultValue[key] = '';
        }
        else if(value === 'boolean'){
            defaultValue[key] = false;
        }
        else if(value.constructor === Object){
            defaultValue[key] = {};

            // traverse object
            GenerateDefaultFromType(type[key], defaultValue[key]);
        }
        else if(value.constructor == Array){    
            defaultValue[key] = [];
        }
    });
}

function DocumentAdd(props){
    const dispatch = useDispatch();
    const {entity} = props.match.params;

    const [id, setId] = useState(0);
    const _entity = useSelector(state => selectEntity(state, id));

    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const keys = useSelector(state => selectKeys(state));

    const currentValue = useSelector(selectCurrentDocumentData);

    const [generate, setGenerate] = useState(false);

    const asyncSetId = async()=>{
        try{
            const id = await GetEntityIdByName(entity);
            setId(id);
        }catch(err){

        }
    };

    useEffect(()=>{
        asyncSetId();
    }, [entity]);

    useEffect(()=>{
        if(_entity){
            let defaultValue = {};
            GenerateDefaultFromType(_entity.schema, defaultValue);
            dispatch(GenerateField(_entity.schema, defaultValue));
            setGenerate(true);
        }
    }, [_entity]);

    if(!generate) return null;
    
    return(
        <Grid container>
            {
                keys.map(value => {
                    const {key, type} = value;
                    const temp = [key];
                    if(type === 'object'){
                        return(
                            <DocumentObject key={key} keys={temp}/>
                        )
                    }
                    else if(type === 'array'){
                        return(
                            <DocumentArray key={key} keys={temp}/>
                        )
                    }else{
                        return(
                            <DocumentField key={key} keys={temp} category={type}/>
                        )
                    }
                })
            }
            <FormButton xs={12} onClick={async() => {
                try{
                    await Axios.post(`document/${id}`, {
                        data: currentValue
                    });
                    dispatch(ShowNotificationDialog(
                        'Add Document', 
                        'Succeed adding new document'
                    ));
                }catch(err){
                    dispatch(ShowNotificationDialog(
                        'Add Document', 
                        `Failed adding new document, ${err}`
                    ));
                }
            }}>
                Add
            </FormButton>
        </Grid>
    )
}

export default DocumentAdd;