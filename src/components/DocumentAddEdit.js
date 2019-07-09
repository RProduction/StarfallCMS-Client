import React, {useMemo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectDocument} from '../redux/selectors/documentSelectors';
import {List, ListItem} from '@material-ui/core';

import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import {GenerateField} from '../redux/actions/documentActions';

import DocumentContainerField from './DocumentContainerField';
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
            <ListItem button>
                {document === 'add' ? 'Add' : 'Modify'}
            </ListItem>
        </List>
    )
}

export default DocumentAddEdit;