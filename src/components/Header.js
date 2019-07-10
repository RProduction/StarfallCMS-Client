import React, {useState} from 'react';
import { Typography, AppBar, Toolbar, IconButton, Hidden, makeStyles, Box} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {Menu, AccountCircle} from '@material-ui/icons';
import clsx from 'clsx';
import {SwitchSideBar} from '../redux/actions/globalActions';
import HeaderUserMenu from './HeaderUserMenu';
import HeaderLink from './HeaderLink';

const useStyle = makeStyles(theme=>({
    root: theme.responsive,
    hide: theme.hide
}));

function Header(props){
    const style = useStyle();
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar);
    const [anchor, setAnchor] = useState(null);

    return(
        <React.Fragment>
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
                        <HeaderLink {...props}/>
                    </Box>
                    <IconButton
                        edge="end"
                        aria-label="Account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={e => setAnchor(e.currentTarget)}
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <HeaderUserMenu anchor={anchor} close={()=>setAnchor(null)}/>
        </React.Fragment>
    );
}

export default Header;