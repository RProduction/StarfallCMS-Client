import React from 'react';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ExitToApp from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings';
import Menu from '@material-ui/icons/Menu';

import clsx from 'clsx';

import {useSelector, useDispatch} from 'react-redux';

import {SwitchSideBar} from '../redux/actions/globalActions';
import {AuthSignOut} from '../redux/actions/authorizationActions';
import HeaderLink from './HeaderLink';
import {CREATOR} from '../redux/actions/authorizationActions';

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
    const {history} = props;
    const style = useStyle();
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar);
    const _status = useSelector(state => state.authStatus);

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
                    {_status === CREATOR ?
                        <IconButton
                            edge="end"
                            aria-label="Account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={e => history.push('/userlist')}
                        >
                            <Settings />
                        </IconButton> : null
                    }
                    <IconButton
                        edge="end"
                        aria-label="Log Off"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={e => dispatch(AuthSignOut())}
                    >
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;