import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';
import PropTypes from 'prop-types';

function DocumentAddButton(props){
    const {add} = props;

    return(
        <ListItem button onClick={() => add()}>
            <ListItemText primary='New Field'/>    
        </ListItem>
    )
}

DocumentAddButton.propTypes = {
    add: PropTypes.func.isRequired
}

export default DocumentAddButton;