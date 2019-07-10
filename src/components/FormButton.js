import React from 'react';
import {Grid, Button} from '@material-ui/core';
import PropTypes from 'prop-types';

function FormButton(props){
    return(
        <Grid item component={Button} {...props}>
            {props.children}
        </Grid>
    )
}

FormButton.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    xs: PropTypes.oneOf(['auto',true,1,2,3,4,5,6,7,8,9,10,11,12]).isRequired
}

export default FormButton;