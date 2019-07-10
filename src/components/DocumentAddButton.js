import React from 'react';
import FormButton from './FormButton';
import PropTypes from 'prop-types';

function DocumentAddButton(props){
    const {add} = props;

    return(
        <FormButton xs={12} onClick={()=>add()}>
            New Field
        </FormButton>
    )
}

DocumentAddButton.propTypes = {
    add: PropTypes.func.isRequired
}

export default DocumentAddButton;