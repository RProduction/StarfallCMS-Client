import React, {useMemo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, makeStyles} from '@material-ui/core';
import FormButton from './FormButton';
import {ShowNotificationDialog} from '../redux/actions/globalActions';

import {selectDocument, selectCurrentDocumentKeys, selectCurrentDocumentData} from '../redux/selectors/documentSelectors';
import {GenerateField} from '../redux/actions/documentActions';

import DocumentObject from './DocumentObject';
import DocumentArray from './DocumentArray';
import DocumentField from './DocumentField';

import {selectEntityByName} from '../redux/selectors/entitySelectors';
import Axios from '../Axios';
import {produce} from 'immer';

const useStyle = makeStyles(theme => ({
	root:{
		'& > *':{
			marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5)
		}
	}
}));

function ProcessData(data, files, root){
    if(data.constructor === Object){
        const pairs = Object.entries(data);
        for(let i=0; i<pairs.length; i++){
            const [key, value] = pairs[i];
            if(value instanceof File){
                // add file into files and change data[key] into file name
                const filename = data[key].name.split(/(\\|\/)/g).pop();
                root[filename] = value;
                files.push(filename);
                data[key] = filename;
            }
            else if(value.constructor === Object || value.constructor === Array){
                // traverse object
                ProcessData(data[key], files, root);
            }
        }
    }
    else if(data.constructor === Array){
        for(let i=0; i<data.length; i++){
            if(data[i] instanceof File){
                // add file into files and change data[key] into file name
                const filename = data[i].name.split(/(\\|\/)/g).pop();
                root[filename] = data[i];
                files.push(filename);
                data[i] = filename;
            }
            else if(data[i].constructor === Object || data[i].constructor === Array){
                // traverse object
                ProcessData(data[i], files, root);
            }
        }    
    }
}

function DocumentEdit(props){
    const style = useStyle()
    const dispatch = useDispatch();
    const {history} = props;
    const {document, entity, project} = props.match.params;

    const selectEntity = useMemo(selectEntityByName, []);
    const _entity = useSelector(state => selectEntity(state, entity));
    const _document = useSelector(state => selectDocument(state, document));
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const keys = useSelector(state => selectKeys(state));

    const currentValue = useSelector(selectCurrentDocumentData);

    const [generate, setGenerate] = useState(false);

    useEffect(()=>{
        if(!_document){
            history.push(`/${project}/${entity}`);
        }
        else if(_document && _entity){
            // _document exist then generate currentDocument topology 
            dispatch(GenerateField(_entity.schema, _document.data));
            setGenerate(true);
        }
    }, [_document, _entity]);

    if(!generate) return null;
    
    return(
        <Grid container className={style.root} direction="column">
            <Grid container item direction="column" xs={12} sm={6} md={8} lg={6}>
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
            </Grid>
            <FormButton xs={12} color="secondary" variant="contained"
                onClick={async() => {
                    try{
                        const newState = produce({
                            data: currentValue, 
                            files: []
                        }, draft => ProcessData(draft.data, draft.files, draft));

                        const formdata = new FormData();
                        const {data, files} = newState;
                        formdata.set('data', JSON.stringify(data));
                        files.forEach(value => {
                            formdata.append('files[]', newState[value], value);
                        });

                        await Axios.post(
                            `document/${document}/modify`, 
                            formdata, 
                            {'Content-Type': 'multipart/form-data'}
                        );

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
                }}
            >
                Modify
            </FormButton>
        </Grid>
    )
}

export default DocumentEdit;