import React, {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, makeStyles} from '@material-ui/core';

import {selectEntityByName} from '../redux/selectors/entitySelectors';
import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';

import DocumentSchemaObject from './DocumentSchemaObject';
import DocumentSchemaArray from './DocumentSchemaArray';
import DocumentSchemaField from './DocumentSchemaField';
import { GenerateField } from '../redux/actions/documentActions';

import DocumentSchemaButtons from './DocumentSchemaButtons';

const useStyle = makeStyles(theme => ({
	root:{
		'& > *':{
			marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5)
		}
	}
}));

function DocumentSchema(props){
    const style = useStyle();
    const dispatch = useDispatch();
    const {entity} = props.match.params;

    const selectEntity = useMemo(selectEntityByName, []);
    const _entity = useSelector(state => selectEntity(state, entity));
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const keys = useSelector(selectKeys);

    useEffect(()=>{
        // generate schema
        if(_entity) dispatch(GenerateField(_entity.schema));
    }, [_entity]);

    return(
        <Grid container className={style.root} direction="column">
            <Grid container item direction="column" xs={12} sm={6} md={8} lg={6}>
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
            </Grid>
            <DocumentSchemaButtons id={_entity ? _entity.id : 0} {...props}/>
        </Grid>
    )
}

export default DocumentSchema;