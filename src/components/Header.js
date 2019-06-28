import React from 'react';
import { Typography, AppBar, Toolbar, IconButton, Hidden, makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {Menu, AccountCircle} from '@material-ui/icons';
import clsx from 'clsx';
import {SwitchSideBar} from '../actions/actions';

const sidebarWidth = 300;

const useStyle = makeStyles(theme => ({
    root: {
        marginLeft: sidebarWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${sidebarWidth}px)`,
        }
    },
    title: {
        flexGrow: 1
    },
    menuBtn: {
        
    },
    hide: {
        display: 'none'
    }
}));

function Header(){
    const style = useStyle();
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar);

    return(
        <AppBar position="fixed" className={style.root}>
            <Toolbar>
                <Hidden smUp>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => dispatch(SwitchSideBar(!sidebar))}
                        edge="start"
                        className={clsx(style.menuBtn, sidebar && style.hide)}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
                <div className={style.title}>
                    <Typography variant="h6" align="center">
                        StarfallCMS
                    </Typography>
                </div>
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