import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {useSelector} from 'react-redux';
import SideBarProject from './SideBarProject';
import {selectAllProjects} from '../selectors/adminSelectors';

function SideBarContent(props){
    const projects = useSelector(selectAllProjects);

    return(
        <List>
            <ListItem button component={Link} to="/" divider>
                <ListItemText primary="Overview" />
            </ListItem>
            {
                projects.map((value, index)=>{
                    const {id, name} = value;
                    return(
                        <SideBarProject id={id} name={name} key={index}/>
                    )
                })
            }
        </List>
    )
}

export default SideBarContent;