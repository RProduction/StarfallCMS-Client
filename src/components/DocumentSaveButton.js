import React from 'react';
import FormButton from './FormButton';
import PropTypes from 'prop-types';

function DocumentSaveButton(props){
    const {save} = props;

    return(
        <FormButton xs onClick={()=>save()}>
            Save Schema
        </FormButton>
    )
}

DocumentSaveButton.propTypes = {
    save: PropTypes.func.isRequired
}

export default DocumentSaveButton;