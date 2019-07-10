import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Grid, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import DocumentField from './DocumentField';
import DocumentArray from './DocumentArray';

function DocumentObject(props){
    const {keys} = props;
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const curKeys = useSelector(state => selectKeys(state, keys));

    return(
        <Grid container item xs={12}>
            <Grid item component={Typography} xs={12}>{keys[keys.length - 1]}</Grid>
            {
                curKeys.map(value => {
                    const {key, type} = value;
                    const temp = [...keys, key];
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
    )
}

DocumentObject.propTypes = {
    keys: PropTypes.array.isRequired
}

export default DocumentObject;