import React from 'react';
import FormButton from './FormButton';
import PropTypes from 'prop-types';

function DocumentCancelButton(props){
    const {cancel} = props;

    return(
        <FormButton xs={5} onClick={()=>cancel()} color="error" variant="contained">
            Cancel
        </FormButton>
    )
}

DocumentCancelButton.propTypes = {
    cancel: PropTypes.func.isRequired
}

export default DocumentCancelButton;