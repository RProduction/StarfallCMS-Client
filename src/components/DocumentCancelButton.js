import React from 'react';
import FormButton from './FormButton';
import PropTypes from 'prop-types';

function DocumentCancelButton(props){
    const {cancel} = props;

    return(
        <FormButton xs onClick={()=>cancel()}>
            Cancel
        </FormButton>
    )
}

DocumentCancelButton.propTypes = {
    cancel: PropTypes.func.isRequired
}

export default DocumentCancelButton;