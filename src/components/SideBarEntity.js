import React from 'react';
import {Link} from 'react-router-dom';
import {ListItem, Divider, ListItemText} from '@material-ui/core';

function SideBarEntity(props){
    return(
        <React.Fragment>
            <ListItem>
                <ListItemText primary={props.name}/>
            </ListItem>
            <Divider/>
        </React.Fragment>
    )
}

export default SideBarEntity;