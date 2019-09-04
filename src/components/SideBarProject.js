import React, {useState, useMemo} from 'react';

import {Link} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import clsx from 'clsx';

import {useSelector} from 'react-redux';

import SideBarEntity from './SideBarEntity';
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
    const [openEntities, setOpenEntities] = useState(false);

    return(
        <React.Fragment>
            <ListItem button divider onClick={() => setOpen(!open)}>
                <ListItemText primary={name}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={style.root} disablePadding>
                    <ListItem button component={Link} to={`/${name}/storage`} divider>
                        <ListItemText primary="Storage" />
                    </ListItem>
                    <ListItem divider>
                        <ButtonBase component={Link} 
                            to={`/${name}`}
                            className={style.btn}
                        >
                            <ListItemText primary="Entities"/>
                        </ButtonBase>
                        <IconButton
                            color="inherit"
                            aria-label={`Expand ${name} entities`}
                            onClick={() => setOpenEntities(!openEntities)}
                            edge="end"
                            className={clsx(entities.length === 0 && style.hide)}
                        >
                            {openEntities ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </ListItem>
                    {
                        entities.length > 0 ? 
                            <Collapse in={openEntities} timeout="auto" unmountOnExit>
                                <List className={style.root} disablePadding>
                                    {
                                        entities.map((value) => {
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
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export default SideBarProject;