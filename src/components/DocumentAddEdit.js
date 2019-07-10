import React, {useMemo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectDocument} from '../redux/selectors/documentSelectors';
import {Grid} from '@material-ui/core';
import FormButton from './FormButton';

import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import {GenerateField} from '../redux/actions/documentActions';

import DocumentObject from './DocumentObject';
import DocumentArray from './DocumentArray';
import DocumentField from './DocumentField';

import {GetEntityIdByName} from '../redux/indexes/database';
import {selectEntity} from '../redux/selectors/entitySelectors';

function DocumentAddEdit(props){
    const dispatch = useDispatch();
    const {history} = props;
    const {document, entity} = props.match.params;

    const [id, setId] = useState(0);
    const _entity = useSelector(state => selectEntity(state, id));

    const _document = useSelector(state => selectDocument(state, document));
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const keys = useSelector(state => selectKeys(state));

    useEffect(()=>{
        GetEntityIdByName(entity).then((value)=>{
            setId(value);
        });
    }, [entity]);

    useEffect(()=>{
        if(!_document && document !== 'add'){
            history.goBack();
        }else if(_document && _entity){
            // _document exist then generate currentDocument topology 
            const {id, entityId, updated, created, ...rest} = _document;
            dispatch(GenerateField(_entity.schema, rest));
        }
    }, [_document, document, _entity]);

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
            <FormButton xs={12}>
                {document === 'add' ? 'Add' : 'Modify'}
            </FormButton>
        </Grid>
    )
}

export default DocumentAddEdit;