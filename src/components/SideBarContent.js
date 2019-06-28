import React from 'react';
import {List} from '@material-ui/core';
import {useSelector} from 'react-redux';
import SideBarProject from './SideBarProject';

function SideBarProjects(props){
    const {projects} = props;

    if(projects.length > 0){
        return(
            <React.Fragment>
                {
                    projects.map((value)=>{
                        const {id, name} = value;
                        return <SideBarProject key={id} id={id} name={name}/>
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
            id: key,
            name: value.name
        });
    }

    return(
        <List>
            <SideBarProjects projects={projects}/>
        </List>
    )
}

export default SideBarContent;