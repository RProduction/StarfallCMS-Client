import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {NOT_AUTHORIZED, FIRST_BOOT, USER, CREATOR} from '../redux/actions/authorizationActions';

function AuthorizationCheck(){
    const _status = useSelector(state => state.authStatus);

	switch (_status) {
		case FIRST_BOOT:
			return <Redirect to='/signup'/>;
		case NOT_AUTHORIZED:
			return <Redirect to='/signin'/>;
		case CREATOR:
			return <Redirect from='/signin' to='/'/>;
		case USER:
			return <React.Fragment>
				<Redirect from='/signup' to='/'/>
				<Redirect from='/signin' to='/'/>
			</React.Fragment>;
		default:
			return null;
	}
}

export default AuthorizationCheck;