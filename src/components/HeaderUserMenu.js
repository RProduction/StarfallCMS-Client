import React from 'react';

import ExitToApp from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings';

import {useDispatch} from 'react-redux';

import {AuthSignOut} from '../redux/actions/authorizationActions';
import PopoverMenu from './PopoverMenu';

function HeaderUserMenu(props){
    const {anchor, close} = props;
    const dispatch = useDispatch();

    return(
        <PopoverMenu
            id={anchor ? 'User' : null}
            open={anchor ? true : false}
            onClose={() => close()}
            anchorEl={anchor}
            menus={[
                {
                    title: "User List",
                    icon: Settings,
                    onClick: () => {
                        
                    }
                },
                {
                    title: "Sign Out",
                    icon: ExitToApp,
                    onClick: () => dispatch(AuthSignOut())
                }
            ]}
        />
    );
}

export default HeaderUserMenu;