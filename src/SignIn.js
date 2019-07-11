import React from 'react';
import AuthorizationForm from './components/AuthorizationForm';
import {TextField, Grid} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FIRST_BOOT, NOT_AUTHORIZED} from './redux/actions/authorizationActions';
import Axios from './Axios';
import * as Yup from 'yup';
import FormButton from './components/FormButton';

function SignIn(props) {
	const _status = useSelector(state => state.authStatus);

	const {
		values: { username, password },
		errors,
		touched,
		handleChange,
		isValid,
		setFieldTouched
	} = props;

	const change = (name, e) => {
		e.persist();
		handleChange(e);
		setFieldTouched(name, true, false);
	};

	if(_status === FIRST_BOOT){
		return <Redirect to="/signup"/>
	}
	else if(_status !== NOT_AUTHORIZED){
		return <Redirect to="/"/>
	}
	else{
		return (
			<Grid component="form" container item 
				xs={8} sm={6} spacing={2}
				onSubmit={async(e)=>{
					e.preventDefault();
					try{
						await Axios.post('user/signin', {
							username: username,
							password: password
						});
						window.location.reload();
					}catch(err){
						console.log(err);
					}
				}}
			>
				<Grid item xs={12} component={TextField} required 
					id="username" name="username" label="Username"
					onChange={change.bind(null, "username")}
					value={username}
					helperText={touched.username ? errors.username : ""}
					   error={touched.username && Boolean(errors.username)}
				/>
				<Grid item xs={12} component={TextField} required id="password" 
					name="password" label="Password" type="password"
					onChange={change.bind(null, "password")}
					value={password}
					helperText={touched.password ? errors.password : ""}
					   error={touched.password && Boolean(errors.password)}
				/>
				<FormButton type="submit" disabled={!isValid} xs={12}>
					Sign In
				</FormButton>
			</Grid>
		);
	}
}

const ValidationSchema = Yup.object({
	username: Yup.string().required('enter username')
	.matches(/^[a-z0-9]*$/i, {
		message: 'input letters and numbers only',
		excludeEmptyString: true,
	}),
	password: Yup.string().required('enter password')
	.matches(/^[a-z0-9]*$/i, {
		message: 'input letters and numbers only',
		excludeEmptyString: true,
	})
});

const InitialValues = {
	username: 'Username12345',
	password: ''
};

function Validation(){
	return <AuthorizationForm 
		validationSchema={ValidationSchema}
		initialValues={InitialValues}
		render={(props)=><SignIn {...props}/>}
	/>
}

export default Validation;