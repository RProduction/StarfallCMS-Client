import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SetField} from '../redux/actions/documentActions';
import {Grid, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

import {selectCurrentDocumentKeys, selectCurrentDocumentValue} from '../redux/selectors/documentSelectors';
import DocumentAddButton from './DocumentAddButton';
import DocumentField from './DocumentField';
import DocumentObject from './DocumentObject';

function DocumentArray(props){
    const {keys} = props;
    const dispatch = useDispatch();
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const curKeys = useSelector(state => selectKeys(state, keys));
    const selectValue = useMemo(selectCurrentDocumentValue, []);
    const value = useSelector(state => selectValue(state, keys));

    return(
        <Grid container item xs={12}>
            <Grid item component={Typography} xs={12}>{keys[keys.length - 1]}</Grid>
            {
                value.map((value, index)=>{
                    const {type} = curKeys;
                    const temp = [...keys, index];
                    if(type === 'object'){
                        return(
                            <DocumentObject key={index} keys={temp}/>
                        )
                    }
                    else if(type === 'array'){
                        return(
                            <DocumentArray key={index} keys={temp}/>
                        )
                    }else{
                        return(
                            <DocumentField key={index} keys={temp} category={type} 
                                arrayKeys={keys} arrayValues={value}
                            />
                        )
                    }
                })
            }
            <DocumentAddButton add={() => {
                const {type} = curKeys;
                let newValue = [];
                if(type === 'object'){
                    newValue = [...value, {}];
                }
                else if(type === 'array'){
                    newValue = [...value, []];
                }else{
                    newValue = [...value, null];
                }
                dispatch(SetField(keys, newValue));
            }}/>
        </Grid>
    )
}

DocumentArray.propTypes = {
    keys: PropTypes.array.isRequired
}

export default DocumentArray;