import React, {useEffect, useState} from 'react';
import { Typography, AppBar, Toolbar, IconButton, Hidden, makeStyles, Box} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {Menu, AccountCircle} from '@material-ui/icons';
import clsx from 'clsx';
import {SwitchSideBar} from '../redux/actions/globalActions';
import {Link, matchPath} from 'react-router-dom';

function HeaderLink({project, entity, document}){
    // from root => project => entity

    return(
        <React.Fragment>
            <Link to='/'> StarfallCMS </Link>
            {project ? 
                <React.Fragment>
                    /
                    <Link to={`/${project}`}> {project} </Link>
                </React.Fragment> : null
            }
            {entity ? 
                <React.Fragment>
                    /
                    <Link to={`/${project}/${entity}`}> {entity} </Link>
                </React.Fragment> : null
            }
            {document ? 
                <React.Fragment>
                    /
                    <Link to={`/${project}/${entity}/${document}`}> {document} </Link>
                </React.Fragment> : null
            }
        </React.Fragment>
    )
}

const useStyle = makeStyles(theme=>({
    root: theme.responsive,
    hide: theme.hide
}));

function Header(props){
    const style = useStyle();
    const dispatch = useDispatch();
    const {location} = props;
    const sidebar = useSelector(state => state.sidebar);
    const [params, setParams] = useState({});

    useEffect(()=>{
        // calculate how many strip in pathname
        // then apply matchPath function conditionally
        const count = (location.pathname.match(/\/./g)||[]).length;
        if(count === 0){
            setParams({});
        }else if(count === 1){
            setParams(matchPath(location.pathname, {
                path: "/:project", exact: true
            }).params);
        }else if(count === 2){
            setParams(matchPath(location.pathname, {
                path: "/:project/:entity", exact: true
            }).params);
        }else if(count === 3){
            setParams(matchPath(location.pathname, {
                path: "/:project/:entity/:document", exact: true
            }).params);
        }
    }, [location.pathname]);

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
                    <HeaderLink {...params}/>
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