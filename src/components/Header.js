import React, {useEffect} from 'react';
import { Typography, AppBar, Toolbar, IconButton, Hidden, makeStyles, Box} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {Menu, AccountCircle} from '@material-ui/icons';
import clsx from 'clsx';
import {SwitchSideBar} from '../actions/actions';
import {Link, matchPath} from 'react-router-dom';

function HeaderLink({project, entity}){
    // from root => project => entity
    if(project === undefined && entity === undefined){
        return(<Link to='/'> StarfallCMS </Link>)
    }
    else if(entity === undefined){
        return(
            <React.Fragment>
                <Link to='/'> StarfallCMS </Link>
                /
                <Link to={`/${project}`}> {project} </Link>
            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>
                <Link to='/'> StarfallCMS </Link>
                /
                <Link to={`/${project}`}> {project} </Link>
                /
                <Link to={`/${project}/${entity}`}> {entity} </Link>
            </React.Fragment>
        )
    }
}

const useStyle = makeStyles(theme=>({
    root: theme.responsive,
    hide: theme.hide
}));

function Header(props){
    const style = useStyle();
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar);
    const {location} = props;
    
    let matchResult = matchPath(location.pathname, {
        path: "/", exact: true
    });
    if(!matchResult){
        matchResult = matchPath(location.pathname, {
            path: "/:project", exact: true
        });
        if(!matchResult){
            matchResult = matchPath(location.pathname, {
                path: "/:project/:entity", exact: true
            });
        }
    }

    return(
        <AppBar position="fixed" className={style.root}>
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => dispatch(SwitchSideBar(!sidebar))}
                        edge="start"
                        className={clsx(sidebar && style.hide)}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
                <Box display="flex" flexGrow={1} justifyContent="center"
                    container={Typography} variant="h6" align="center"
                >
                    <HeaderLink {...matchResult.params}/>
                </Box>
                <IconButton
                    edge="end"
                    aria-label="Account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;