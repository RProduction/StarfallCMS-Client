import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import Axios from './Axios';
import {AUTHORIZATION_STATUS, SetAuthStatus} from './actions/actions';
import AuthorizationCheck from './components/AuthorizationCheck';

const Admin = lazy(()=>import('./Admin'));
const SignIn = lazy(()=>import('./SignIn'));
const SignUp = lazy(()=>import('./SignUp'));

function App() {
	const dispatch = useDispatch();
	const [status, setStatus] = useState(undefined);

	async function fetchStatus(){
		try{
			const {data} = await Axios.get('user/status');
			// set status only if status value change
			if(status !== data) setStatus(data);
		}
		catch(err){
			console.log(err);
		}
	}

	useEffect(()=>{
		fetchStatus();
	}, []);

	useEffect(()=>{
		if(status !== undefined) 
			dispatch(SetAuthStatus(AUTHORIZATION_STATUS[status]));
	}, [status]);
	  
	return (
    	<Suspense fallback={<div></div>}>
			<CssBaseline/>
			<AuthorizationCheck/>

			<Switch>
				<Route path="/" component={Admin}/>
				<Route exact path="/signin" component={SignIn}/>
				<Route exact path="/signup" component={SignUp}/>
			</Switch>

		</Suspense>
  	);
}

export default App;
