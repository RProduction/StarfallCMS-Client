import React from 'react';
import AuthorizationForm from './components/AuthorizationForm';
import {TextField, Button, Grid} from '@material-ui/core';

function SignIn() {  
	return (
		<AuthorizationForm>
			<Grid item xs={12} component={TextField} required 
				id="username" name="username" label="Username"
			/>
			<Grid item xs={12} component={TextField} required id="password" 
				name="password" label="Password" type="password"
			/>
			<Grid item xs={12} component={Button}>
				SignIn
			</Grid>
		</AuthorizationForm>
  	);
}

export default SignIn;