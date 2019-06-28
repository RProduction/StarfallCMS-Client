import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ListItem, Divider, ListItemText, List, Collapse, IconButton, makeStyles} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import SideBarEntity from './SideBarEntity';
import clsx from 'clsx';

const useStyle = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(1)
    },
    hide: {
        display: 'none'
    }
}));

function SideBarEntities(props){
    const style = useStyle();
    const {entities, open} = props;

    if(entities.length > 0){
        return(
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={style.root} disablePadding>
                    {
                        entities.map((value)=>{
                            const {id, name} = value;
                            return <SideBarEntity key={id} id={id} name={name}/>
                        })
                    }
                </List>
            </Collapse>
        )
    }
    else{
        return null;
    }
}

function SideBarProject(props){
    const style = useStyle();
    const {id, name} = props;
    const database = useSelector(
        state => state.database[id].entities, ()=>false
    );
    const [open, setOpen] = useState(false);

    let entities = [];
    for(const [key, value] of Object.entries(database)){
        entities.push({
            id: key,
            name: value.name
        });
    }

    return(
        <React.Fragment>
            <ListItem>
                <ListItemText primary={name}/>
                <IconButton
                    color="inherit"
                    aria-label={`Expand ${name}`}
                    onClick={() => setOpen(!open)}
                    edge="end"
                    className={clsx(entities.length === 0 && style.hide)}
                >
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </ListItem>
            <SideBarEntities entities={entities} open={open}/>
            <Divider/>
        </React.Fragment>
    )
}

export default SideBarProject;