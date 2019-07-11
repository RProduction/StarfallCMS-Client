import React, {useMemo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid} from '@material-ui/core';
import FormButton from './FormButton';
import {ShowNotificationDialog} from '../redux/actions/globalActions';

import {selectDocument, selectCurrentDocumentKeys, selectCurrentDocumentData} from '../redux/selectors/documentSelectors';
import {GenerateField} from '../redux/actions/documentActions';

import DocumentObject from './DocumentObject';
import DocumentArray from './DocumentArray';
import DocumentField from './DocumentField';

import {GetEntityIdByName} from '../redux/indexes/database';
import {selectEntity} from '../redux/selectors/entitySelectors';
import Axios from '../Axios';

function DocumentEdit(props){
    const dispatch = useDispatch();
    const {history} = props;
    const {document, entity, project} = props.match.params;

    const [id, setId] = useState(0);
    const _entity = useSelector(state => selectEntity(state, id));

    const _document = useSelector(state => selectDocument(state, document));
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
        if(!_document){
            history.push(`/${project}/${entity}`);
        }
        else if(_document && _entity){
            // _document exist then generate currentDocument topology 
            dispatch(GenerateField(_entity.schema, _document.data));
            setGenerate(true);
        }
    }, [_document, document, _entity]);

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
                    await Axios.post(`document/${document}/modify`, {
                        data: currentValue
                    });
                    dispatch(ShowNotificationDialog(
                        'Edit Document', 
                        'Succeed editing document'
                    ));
                }catch(err){
                    dispatch(ShowNotificationDialog(
                        'Edit Document', 
                        `Failed editing document, ${err}`
                    ));
                }
            }}>
                Modify
            </FormButton>
        </Grid>
    )
}

export default DocumentEdit;