import React, {useState} from 'react';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Menu from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import clsx from 'clsx';

import {useSelector, useDispatch} from 'react-redux';

import {SwitchSideBar} from '../redux/actions/globalActions';
import HeaderUserMenu from './HeaderUserMenu';
import HeaderLink from './HeaderLink';

const useStyle = makeStyles(theme=>({
    root: {
        backgroundColor: theme.palette.primary.light,
        ...theme.responsive
    },
    link: {
        '& a': {
            color: 'black',
            paddingLeft: theme.spacing(0.35),
            paddingRight: theme.spacing(0.35),
            fontSize: '115%'
        },
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
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
                    <Box display="flex" flexGrow={1}
                        container={Typography} variant="h6" align="center"
                        className={style.link}
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