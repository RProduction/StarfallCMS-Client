import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, Divider, ListItemText} from '@material-ui/core';
import {useSelector} from 'react-redux';
import SideBarProject from './SideBarProject';

function SideBarProjects(props){
    const {projects} = props;

    if(projects.length > 0){
        return(
            <React.Fragment>
                {
                    projects.map((value)=>{
                        return <SideBarProject {...value}/>
                    })
                }
            </React.Fragment>
        )
    }
    else{
        return null;
    }
}

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
            <ListItem button component={Link} to="/">
                <ListItemText primary="Overview" />
            </ListItem>
            <Divider />
            <SideBarProjects projects={projects}/>
        </List>
    )
}

export default SideBarContent;