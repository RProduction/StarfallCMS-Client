import React from 'react';
import {Drawer, IconButton, Divider, Hidden, makeStyles} from '@material-ui/core';
import {ChevronLeft, ChevronRight} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {SwitchSideBar} from '../redux/actions/adminActions';
import SideBarContent from './SideBarContent';

const useStyle = makeStyles(theme => ({
    root: theme.sidebar,
    paper: theme.sidebarPaper,
    direction: theme.direction,
    btn: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }
}));

function SideBar(props){
    const style = useStyle();
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.sidebar);

    return(
        <React.Fragment>
            <Hidden mdUp>
                <Drawer
                    className={style.root}
                    variant="temporary"
                    anchor={style.direction === 'rtl' ? 'right' : 'left'}
                    open={sidebar}
                    classes={{paper: style.paper}}
                    ModalProps={{keepMounted: true}}
                >
                    <div className={style.btn}>
                        <IconButton onClick={() => dispatch(SwitchSideBar(!sidebar))}>
                            {style.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div>
                    <Divider />
                    <SideBarContent/>
                </Drawer>
            </Hidden>
            <Hidden smDown>
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