import React, {lazy, Suspense, useEffect} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import {Route, Switch} from 'react-router-dom';

import {useDispatch} from 'react-redux';

import {CheckAuthStatus} from './redux/actions/authorizationActions';

const Admin = lazy(()=>import('./Admin'));
const SignIn = lazy(()=>import('./SignIn'));
const SignUp = lazy(()=>import('./SignUp'));

function App() {
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(CheckAuthStatus());
	}, []);
	  
	return (
    	<Suspense fallback={<div></div>}>
			<CssBaseline/>
			
			<Switch>
				<Route path="/signin" component={SignIn}/>
				<Route path="/signup" component={SignUp}/>
				<Route path="/" component={Admin}/>
			</Switch>

		</Suspense>
  	);
}

export default App;
