import React, {useState, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DeleteField} from '../redux/actions/documentActions';
import {Grid, Typography, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import DocumentAddField from './DocumentAddField';
import DocumentAddButton from './DocumentAddButton';
import DocumentSchemaArray from './DocumentSchemaArray';
import DocumentSchemaField from './DocumentSchemaField';

function DocumentSchemaObject(props){
    const {keys} = props;
    const dispatch = useDispatch();
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const curKeys = useSelector(state => selectKeys(state, keys));
    const [add, setAdd] = useState(false);

    return(
        <Grid container item xs={12}>
            <Grid container item xs={12}>
                <Grid item component={Typography} xs>{keys[keys.length - 1]}</Grid>
                <IconButton
                    color="inherit"
                    aria-label={`Delete ${keys[keys.length - 1]}`}
                    onClick={() => dispatch(DeleteField(keys))}
                    edge="end"
                >
                    <Delete/>
                </IconButton>
            </Grid>
            {
                curKeys.map(value => {
                    const {key, type} = value;
                    const temp = [...keys, key];
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
                ? <DocumentAddField keys={keys} cancel={() => setAdd(false)}/> 
                : null
            }
            <DocumentAddButton add={() => setAdd(true)}/>
        </Grid>
    )
}

DocumentSchemaObject.propTypes = {
    keys: PropTypes.array.isRequired
}

export default DocumentSchemaObject;