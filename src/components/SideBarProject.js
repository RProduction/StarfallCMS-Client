import React, {useState, useMemo, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ListItem, ListItemText, List, Collapse, IconButton, makeStyles, ButtonBase} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import SideBarEntity from './SideBarEntity';
import clsx from 'clsx';
import {selectEntitiesInProject} from '../redux/selectors/entitySelectors';

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

function SideBarProject(props){
    const style = useStyle();
    const {id, name} = props;
    const select = useMemo(selectEntitiesInProject,[]);
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
            {
                entities.length > 0 ? 
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List className={style.root} disablePadding>
                            {
                                entities.map((value, index) => {
                                    return <SideBarEntity
                                        key={value.id}
                                        name={value.name}
                                        projectName={name}
                                    />
                                })
                            }
                        </List>
                    </Collapse> : null
            }
        </React.Fragment>
    )
}

export default SideBarProject;