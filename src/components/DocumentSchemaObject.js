import React, {useState, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DeleteField} from '../redux/actions/documentActions';
import {Grid, Typography, IconButton, makeStyles} from '@material-ui/core';
import {Delete, Add} from '@material-ui/icons';
import PropTypes from 'prop-types';

import {selectCurrentDocumentKeys} from '../redux/selectors/documentSelectors';
import DocumentAddField from './DocumentAddField';
import DocumentSchemaArray from './DocumentSchemaArray';
import DocumentSchemaField from './DocumentSchemaField';

const useStyle = makeStyles(theme => ({
	root:{
        marginLeft: theme.spacing(3)
	}
}));

function DocumentSchemaObject(props){
    const style = useStyle();
    const {keys, fromArray} = props;
    const dispatch = useDispatch();
    const selectKeys = useMemo(selectCurrentDocumentKeys, []);
    const curKeys = useSelector(state => selectKeys(state, keys));
    const [add, setAdd] = useState(false);

    return(
        <React.Fragment>
            <Grid container item xs={12} alignItems="center">
                <Grid item component={Typography} xs>
                    {fromArray ? 'Root' : keys[keys.length - 1]}
                </Grid>
                <IconButton
                    color="inherit"
                    aria-label='Add new field'
                    onClick={() => setAdd(true)}
                    edge="end"
                >
                    <Add/>
                </IconButton>
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
            <Grid container item xs={12} direction="column" className={style.root}>
                {
                    curKeys.map(value => {
                        const {key, type} = value;
                        const temp = [...keys, key];
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
                {
                    add 
                    ? <DocumentAddField keys={keys} cancel={() => setAdd(false)}/> 
                    : null
                }
            </Grid>
        </React.Fragment>
    )
}

DocumentSchemaObject.propTypes = {
    keys: PropTypes.array.isRequired,
    fromArray: PropTypes.bool
}

export default DocumentSchemaObject;