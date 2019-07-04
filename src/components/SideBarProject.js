import React, {useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {ListItem, ListItemText, List, Collapse, IconButton, makeStyles, ButtonBase} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import SideBarEntity from './SideBarEntity';
import clsx from 'clsx';
import {selectRelatedEntities} from '../selectors/adminSelectors';

const useStyle = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(1)
    },
    hide: {
        display: 'none'
    },
    btn: {
        flexGrow: 1
    }
}));

function SideBarEntities(props){
    const style = useStyle();
    const {entities, projectName, open} = props;
    if(entities.length > 0){
        return(
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={style.root} disablePadding>
                    {
                        entities.map((value, index)=>{
                            const {name} = value;
                            return <SideBarEntity key={index} name={name} projectName={projectName}/>
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
    const select = useMemo(selectRelatedEntities, []);
    const entities = useSelector(state => select(state, id));
    const [open, setOpen] = useState(false);

    return(
        <React.Fragment>
            <ListItem divider>
                <ButtonBase component={Link} 
                    to={`/${name}`}
                    className={style.btn}
                >
                    <ListItemText primary={name}/>
                </ButtonBase>
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
            <SideBarEntities open={open} entities={entities} projectName={name}/>
        </React.Fragment>
    )
}

export default SideBarProject;