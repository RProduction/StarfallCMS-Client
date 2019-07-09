import React from 'react';
import {useDispatch} from 'react-redux';
import {DeleteField} from '../redux/actions/documentActions';
import {ListItem, Typography, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

function DocumentSchemaField(props){
    const {keys, category} = props;
    const dispatch = useDispatch();

    return(
        <ListItem>
            <Typography>{keys[keys.length - 1]}</Typography>
            <Typography>{category}</Typography>
            <IconButton
                color="inherit"
                aria-label={`Delete ${keys[keys.length - 1]}`}
                onClick={() => dispatch(DeleteField(keys))}
                edge="end"
            >
                <Delete/>
            </IconButton>
        </ListItem>
    )
}

DocumentSchemaField.propTypes = {
    keys: PropTypes.array.isRequired,
    category: PropTypes.oneOf([
        'integer', 'float', 'string', 'boolean', 'file'
    ]).isRequired
}

export default DocumentSchemaField;