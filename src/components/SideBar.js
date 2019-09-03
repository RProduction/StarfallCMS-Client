import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import {useDispatch, useSelector} from 'react-redux';

import {SwitchSideBar} from '../redux/actions/globalActions';
import SideBarContent from './SideBarContent';

const useStyle = makeStyles(theme => ({
    root: theme.sidebar,
    paper: {
        backgroundColor: theme.palette.primary.main,
        ...theme.sidebarPaper
    },
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