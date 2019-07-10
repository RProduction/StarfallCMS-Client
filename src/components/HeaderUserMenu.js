import React, {useState} from 'react';
import {ExitToApp, Settings} from '@material-ui/icons';
import PopoverMenu from './PopoverMenu';
import Axios from '../Axios';
import {Redirect} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {SetAuthStatus, NOT_AUTHORIZED} from '../redux/actions/authorizationActions';

function HeaderUserMenu(props){
    const {anchor, close} = props;
    const dispatch = useDispatch();
    const [account, setAccount] = useState(false);
    
    const postSignout = async()=>{
        try{
            await Axios.post('user/signout');
            dispatch(SetAuthStatus(NOT_AUTHORIZED));
        }
        catch(err){
            console.log(err);
        }
    };
    
    //if(account) return <Redirect/>

    return(
        <PopoverMenu
            id={anchor ? 'User' : null}
            open={anchor ? true : false}
            onClose={() => close()}
            anchorEl={anchor}
            menus={[
                {
                    title: "Account",
                    icon: Settings,
                    onClick: () => {
                        
                    }
                },
                {
                    title: "Sign Out",
                    icon: ExitToApp,
                    onClick: ()=>{postSignout()}
                }
            ]}
        />
    );
}

export default HeaderUserMenu;