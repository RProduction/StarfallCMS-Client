import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AddField} from '../redux/actions/documentActions';
import {Grid, TextField, IconButton, MenuItem} from '@material-ui/core';
import {Delete, Add} from '@material-ui/icons';
import PropTypes from 'prop-types';
import {fieldTypes} from './DocumentConstant';

function DocumentAddField(props){
    const {keys, cancel} = props;
    const dispatch = useDispatch();
    const [key, setKey] = useState('');
    const [type, setType] = useState(fieldTypes[0]);

    return(
        <Grid container item xs={12} alignItems="center" justify="space-evenly">
            <Grid item component={TextField} xs={3} md={4} value={key}
                onChange={(e) => setKey(e.target.value)}
            />
            <Grid item component={TextField} xs={5} md={6}
                required select margin="normal" value={type}
                onChange={(e) => setType(e.target.value)}
            >
                {fieldTypes.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Grid>
            <IconButton
                color="inherit"
                aria-label={`Add ${key}`}
                onClick={() => {
                    const temp = [...keys, key];
                    dispatch(AddField(temp, type));
                    cancel();
                }}
                edge="end"
            >
                <Add/>
            </IconButton>
            <IconButton
                color="inherit"
                aria-label={`Cancel adding ${key}`}
                onClick={() => cancel()}
                edge="end"
            >
                <Delete/>
            </IconButton>
        </Grid>
    )
}

DocumentAddField.propTypes = {
    keys: PropTypes.array.isRequired,
    cancel: PropTypes.func.isRequired
}

export default DocumentAddField;