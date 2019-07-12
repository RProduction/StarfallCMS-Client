import React from 'react';
import {useDispatch} from 'react-redux';
import {DeleteField} from '../redux/actions/documentActions';
import {Grid, Typography, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

function DocumentSchemaField(props){
    const {keys, category} = props;
    const dispatch = useDispatch();

    return(
        <Grid container item xs={12} alignItems="center">
            <Grid item component={Typography} xs={4}>
                {keys[keys.length - 1]}
            </Grid>
            <Grid item component={Typography} xs>
                {category}
            </Grid>
            <IconButton
                color="inherit"
                aria-label={`Delete ${keys[keys.length - 1]}`}
                onClick={() => dispatch(DeleteField(keys))}
                edge="end"
            >
                <Delete/>
            </IconButton>
        </Grid>
    )
}

DocumentSchemaField.propTypes = {
    keys: PropTypes.array.isRequired,
    category: PropTypes.oneOf([
        'integer', 'float', 'string', 'boolean', 'file'
    ]).isRequired
}

export default DocumentSchemaField;