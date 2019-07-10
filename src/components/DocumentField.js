import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SetField} from '../redux/actions/documentActions';
import {selectCurrentDocumentValue} from '../redux/selectors/documentSelectors';
import {Grid, TextField, Typography, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import PropTypes from 'prop-types';

function DocumentField(props){
    const {keys, category, arrayKeys, arrayValues} = props;
    const dispatch = useDispatch();
    const select = useMemo(selectCurrentDocumentValue, []);
    const value = useSelector(state => select(state, keys));

    return(
        <Grid container item xs={12}>
            <Grid item component={Typography} xs={3}>{keys[keys.length - 1]}</Grid>
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
                        fullWidth
                        value={value}
                        step={category === 'float' ? 'any' : 1}
                        type='number'
                        onChange={(e) => dispatch(SetField(keys, e.target.value))}
                    /> : null
            }
            {
                category === 'string' 
                ?   <TextField 
                        fullWidth
                        value={value}
                        multiline
                        onChange={(e) => dispatch(SetField(keys, e.target.value))}
                    /> : null
            }
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
    )
}

DocumentField.propTypes = {
    keys: PropTypes.array.isRequired,
    category: PropTypes.oneOf([
        'integer', 'float', 'string', 'boolean', 'file'
    ]).isRequired,
    arrayKeys: PropTypes.array,
    arrayValues: PropTypes.array
}

export default DocumentField;