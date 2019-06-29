import React from 'react';
import {Drawer, useTheme, IconButton, Divider, Hidden, makeStyles} from '@material-ui/core';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {SwitchSideBar} from '../actions/actions';
import SideBarContent from './SideBarContent';

const sidebarWidth = 300;

const useStyle = makeStyles(theme => ({
    root: {
        width: sidebarWidth,
        flexShrink: 0
    },
    paper: {
        width: sidebarWidth
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }
}));

function SideBar(props){
    const style = useStyle();
    const theme = useTheme();
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar);

    return(
        <React.Fragment>
            <Hidden smUp>
                <Drawer
                    className={style.root}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={sidebar}
                    classes={{paper: style.paper}}
                    ModalProps={{keepMounted: true}}
                >
                    <div className={style.header}>
                        <IconButton onClick={() => dispatch(SwitchSideBar(!sidebar))}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div>
                    <Divider />
                    <SideBarContent/>
                </Drawer>
            </Hidden>
            <Hidden xsDown>
                <Drawer
                    className={style.root}
                    classes={{paper: style.paper}}
                    variant="permanent"
                    open
                >
                    <SideBarContent/>
                </Drawer>
            </Hidden>
        </React.Fragment>
    )
}

export default SideBar;