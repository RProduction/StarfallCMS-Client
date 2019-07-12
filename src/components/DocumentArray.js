import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Typography, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

import {SetField} from '../redux/actions/documentActions';
import {selectCurrentDocumentKeys, selectCurrentDocumentValue} from '../redux/selectors/documentSelectors';
import DocumentAddButton from './DocumentAddButton';
import DocumentField from './DocumentField';
import DocumentObject from './DocumentObject';

function DocumentArray(props){
    const {keys, arrayValues, arrayKeys} = props;
    const dispatch = useDispatch();
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const curKeys = useSelector(state => selectKeys(state, keys));
    const selectValues = useMemo(selectCurrentDocumentValue, []);
    const values = useSelector(state => selectValues(state, keys));

    return(
        <Grid container item xs={12}>
            <Grid container item xs={12}>
                <Grid item component={Typography} xs={3}>{keys[keys.length - 1]}</Grid>
                {
                    arrayKeys && arrayValues ? <IconButton
                        color="inherit"
                        aria-label={`Delete ${keys[keys.length - 1]}`}
                        onClick={() => {
                            const temp = [...arrayValues];
                            temp.splice(keys[keys.length - 1], 1);
                            dispatch(SetField(arrayKeys, temp));
                        }}
                        edge="end"
                    >
                        <Delete/>
                    </IconButton>: null
                }
            </Grid>
            {
                values.map((value, index)=>{
                    const {type} = curKeys;
                    const temp = [...keys, index];
                    if(type === 'object'){
                        return(
                            <DocumentObject key={index} keys={temp}
                                arrayKeys={keys} arrayValues={values}/>
                        )
                    }
                    else if(type === 'array'){
                        return(
                            <DocumentArray key={index} keys={temp}
                                arrayKeys={keys} arrayValues={values}/>
                        )
                    }else{
                        return(
                            <DocumentField key={index} keys={temp} category={type} 
                                arrayKeys={keys} arrayValues={values}
                            />
                        )
                    }
                })
            }
            <DocumentAddButton add={() => {
                const {type} = curKeys;
                let newValue = [];
                if(type === 'integer'){
                    newValue = [...values, 0];
                }
                else if(type === 'float'){
                    newValue = [...values, 0];
                }
                else if(type === 'string'){
                    newValue = [...values, ''];
                }
                else if(type === 'boolean'){
                    newValue = [...values, false];
                }
                else if(type === 'object'){
                    newValue = [...values, {}];
                }
                else if(type == 'array'){    
                    newValue = [...values, []];
                }
                dispatch(SetField(keys, newValue));
            }}/>
        </Grid>
    )
}

DocumentArray.propTypes = {
    keys: PropTypes.array.isRequired,
    arrayKeys: PropTypes.array,
    arrayValues: PropTypes.array
}

export default DocumentArray;