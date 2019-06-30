import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {useSelector} from 'react-redux';
import SideBarProject from './SideBarProject';

function SideBarContent(props){
    const database = useSelector(
        state => state.database, ()=>false
    );

    let projects = [];
    for(const [key, value] of Object.entries(database)){
        projects.push({
            key: value.id,
            name: key
        });
    }

    return(
        <List>
            <ListItem button component={Link} to="/" divider>
                <ListItemText primary="Overview" />
            </ListItem>
            {
                projects.map((value)=>{
                    return(
                        <SideBarProject {...value}/>
                    )
                })
            }
        </List>
    )
}

export default SideBarContent;