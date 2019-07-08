import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AddField} from '../redux/actions/documentActions';
import {ListItem, TextField, IconButton, MenuItem} from '@material-ui/core';
import {Delete, Add} from '@material-ui/icons';
import PropTypes from 'prop-types';

const fieldTypes = ['integer', 'float', 'string', 'boolean', 'file', 'object', 'array'];

function DocumentAddField(props){
    const {keys, cancel} = props;
    const dispatch = useDispatch();
    const [key, setKey] = useState('');
    const [type, setType] = useState(fieldTypes[0]);
    const [arrayType, setArrayType] = useState('');

    return(
        <ListItem>
            <TextField 
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />
            <TextField
                required select margin="normal"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                {fieldTypes.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <IconButton
                color="inherit"
                aria-label={`Add ${key}`}
                onClick={() => {
                    const temp = [...keys, key];
                    dispatch(AddField(temp, type, arrayType));
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
        </ListItem>
    )
}

DocumentAddField.propTypes = {
    keys: PropTypes.array.isRequired,
    cancel: PropTypes.func.isRequired
}

export default DocumentAddField;