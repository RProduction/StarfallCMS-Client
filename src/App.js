import React, {useContext, lazy, Suspense} from 'react';
import {Route, withRouter, Switch, __RouterContext} from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';

const Admin = lazy(()=>import('./Admin'));
const SignIn = lazy(()=>import('./SignIn'));
const SignUp = lazy(()=>import('./SignUp'));

function App() {
	const {location} = useContext(__RouterContext);
	  
	return (
    	<Suspense fallback={<div></div>}>
			<CssBaseline/>

			<Switch location={location}>
				<Route exact path="/" component={Admin}/>
				<Route path="/signin" component={SignIn}/>
				<Route path="/signup" component={SignUp}/>
			</Switch>

		</Suspense>
  	);
}

export default withRouter(App);
