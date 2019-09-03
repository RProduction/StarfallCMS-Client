import Axios from '../../Axios';
import {ShowNotificationDialog} from './globalActions';

// authorization status
export const FIRST_BOOT = 0;
export const NOT_AUTHORIZED = -1;
export const CREATOR = 1;
export const USER = 2;

export const CheckAuthStatus = () => async dispatch => {
    try{
        const {data} = await Axios.get('user/status');
        dispatch({type: "SET_AUTHORIZATION_STATUS", status: data});
    }
    catch(err){
        console.log(err);
    }
}

export const AuthSignIn = (username, password) => async dispatch => {
    try{
        await Axios.post('user/signin', {
            username: username,
            password: password
        });
        dispatch(CheckAuthStatus());
    }
    catch(err){
        dispatch(ShowNotificationDialog(
            `Sign In`, 
            `Fail to sign in`
        ));
        console.log(err);
    }
}

export const AuthSignUp = (username, password) => async dispatch => {
    try{
        await Axios.post('user', {
            username: username,
            password: password
        });
        dispatch(CheckAuthStatus());
    }
    catch(err){
        dispatch(ShowNotificationDialog(
            `Sign Up`, 
            `Fail to sign up`
        ));
        console.log(err);
    }
}

export const AuthSignOut = () => async dispatch => {
    try{
        await Axios.post('user/signout');
        dispatch(CheckAuthStatus());
    }
    catch(err){
        console.log(err);
    }
}