import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, Typography, IconButton, makeStyles} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

import {SetField} from '../redux/actions/documentActions';
import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import DocumentField from './DocumentField';
import DocumentArray from './DocumentArray';

const useStyle = makeStyles(theme => ({
	root:{
        marginLeft: theme.spacing(3)
	}
}));

function DocumentObject(props){
    const style = useStyle();
    const {keys, arrayValues, arrayKeys} = props;
    const dispatch = useDispatch();
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const curKeys = useSelector(state => selectKeys(state, keys));

    return(
        <React.Fragment>
            <Grid container item xs={12} alignItems="center">
                <Grid item component={Typography} xs>
                    {keys[keys.length - 1]}
                </Grid>
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
            <Grid container item xs={12} direction="column" className={style.root}>
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
        </React.Fragment>
    )
}

DocumentObject.propTypes = {
    keys: PropTypes.array.isRequired,
    arrayKeys: PropTypes.array,
    arrayValues: PropTypes.array
}

export default DocumentObject;