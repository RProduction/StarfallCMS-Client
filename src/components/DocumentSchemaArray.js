import React, {useState, useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DeleteField} from '../redux/actions/documentActions';
import {Grid, Typography, IconButton, TextField, MenuItem} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

import {AddField} from '../redux/actions/documentActions';
import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import DocumentSchemaObject from './DocumentSchemaObject';
import {fieldTypes} from './DocumentConstant';

function Conditional(props){
    const {keys, curKey, type} = props;
    const temp = [...keys, curKey];
    if(type === 'object'){
        return(
            <DocumentSchemaObject fromArray keys={temp}/>
        )
    }
    else if(type === 'array'){
        return(
            <DocumentSchemaArray fromArray keys={temp}/>
        )
    }
    else {
        return null;
    }
}

function DocumentSchemaArray(props){
    const {keys, fromArray} = props;
    const dispatch = useDispatch();
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const curKeys = useSelector(state => selectKeys(state, keys));

    return(
        <React.Fragment>
            <Grid container item xs={12} alignItems="center">
                <Grid item component={Typography} xs={4}>
                    {fromArray ? 'Root' : keys[keys.length - 1]}
                </Grid>
                <Grid item component={TextField} xs
                    required select margin="normal"
                    value={curKeys.type}
                    onChange={(e) => {
                        const {key} = curKeys;
                        const temp = [...keys, key];
                        dispatch(AddField(temp, e.target.value));
                    }}
                >
                    {fieldTypes.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Grid>
                {
                    !fromArray ? 
                        <IconButton
                            color="inherit"
                            aria-label={`Delete ${keys[keys.length - 1]}`}
                            onClick={() => dispatch(DeleteField(keys))}
                            edge="end"
                        >
                            <Delete/>
                        </IconButton>
                    : null
                }
            </Grid>
            <Conditional type={curKeys.type} curKey={curKeys.key} keys={keys}/>
        </React.Fragment>
    )
}

DocumentSchemaArray.propTypes = {
    keys: PropTypes.array.isRequired,
    fromArray: PropTypes.bool
}

export default DocumentSchemaArray;