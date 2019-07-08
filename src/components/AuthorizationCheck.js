import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {NOT_AUTHORIZED, FIRST_BOOT, USER} from '../redux/actions/authorizationActions';

function AuthorizationCheck(){
    const _status = useSelector(state => state.authStatus);

	switch (_status) {
		case FIRST_BOOT:
			return <Redirect to='/signup'/>;
		case NOT_AUTHORIZED:
			return <Redirect to='/signin'/>;
		case USER:
			return <Redirect to='/'/>;
		default:
			return null;
	}
}

export default AuthorizationCheck;