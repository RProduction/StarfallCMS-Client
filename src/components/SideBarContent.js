import React from 'react';

import {Link} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {useSelector} from 'react-redux';

import SideBarProject from './SideBarProject';
import {selectAllProjects} from '../redux/selectors/projectSelectors';

function SideBarContent(props){
    const projects = useSelector(selectAllProjects);

    return(
        <List>
            <ListItem button component={Link} to="/" divider>
                <ListItemText primary="Overview" />
            </ListItem>
            {
                projects.map((value)=>{
                    return(
                        <SideBarProject id={value.id} name={value.name} key={value.id}/>
                    )
                })
            }
        </List>
    )
}

export default SideBarContent;