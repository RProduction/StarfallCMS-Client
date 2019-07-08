import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SetField, DeleteField} from '../redux/actions/documentActions';
import {selectCurrentDocumentValue} from '../redux/selectors/documentSelectors';
import {ListItem, TextField, Typography, Box, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

function DocumentField(props){
    const {keys, category} = props;
    const dispatch = useDispatch();
    const select = useMemo(selectCurrentDocumentValue, []);
    const value = useSelector(state => select(state, keys));

    return(
        <ListItem>
            <Typography>{keys[keys.length - 1]}</Typography>
            {
                category === 'boolean' 
                ?   <Checkbox
                        checked={value}
                        onChange={(e) => dispatch(SetField(keys, e.target.checked))}
                        value={keys[keys.length - 1]}
                        inputProps={{
                        'aria-label': 'primary checkbox',
                        }}
                    /> : null
            }
            {
                category === 'integer' || category === 'float'
                ?   <TextField 
                        value={value}
                        step={category === 'float' ? 'any' : 1}
                        type='number'
                        onChange={(e) => dispatch(SetField(keys, e.target.value))}
                    /> : null
            }
            {
                category === 'string' 
                ?   <TextField 
                        value={value}
                        multiline
                        onChange={(e) => dispatch(SetField(keys, e.target.value))}
                    /> : null
            }
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

DocumentField.propTypes = {
    keys: PropTypes.array.isRequired,
    category: PropTypes.oneOf([
        'integer', 'float', 'string', 'boolean', 'file'
    ]).isRequired
}

export default DocumentField;