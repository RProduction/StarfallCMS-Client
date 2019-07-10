import React, { useEffect, useState } from 'react';
import AuthorizationForm from './components/AuthorizationForm';
import {Redirect} from 'react-router-dom';
import {TextField, Grid, MenuItem} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {CREATOR, MANAGER, FIRST_BOOT} from './redux/actions/authorizationActions';
import Axios from './Axios';
import * as Yup from 'yup';
import FormButton from './components/FormButton';

const AUTHORITIES_CREATOR = ['Manager', 'User'];
const AUTHORITIES_MANAGER = ['User'];
const AUTHORITIES_FIRST_BOOT = ['Creator'];

const SignUp = (props)=>{
	const _status = useSelector(state => state.authStatus);
	const [authorities, setAuthorities] = useState([]);
	const [authority, setAuthority] = useState('');
	const [redirect, setRedirect] = useState(false);

	useEffect(()=>{
		switch(_status){
			case CREATOR:
				setAuthorities(AUTHORITIES_CREATOR);
			break;
			case MANAGER:
				setAuthorities(AUTHORITIES_MANAGER);
			break;
			case FIRST_BOOT:
				setAuthorities(AUTHORITIES_FIRST_BOOT);
			break;
		}
	}, [_status]);

	useEffect(()=>{
		// setdefault value for authorization if authorizations get loaded
		if(authorities !== [] && authorities[0] !== undefined) 
			setAuthority(authorities[0]);
	}, [authorities]);

	const {
		values: { username, password, confirmPassword },
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

	if(redirect){
		return <Redirect to="/signin"/>;
	}else{
		return (
			<Grid component="form" container item
				xs={8} sm={6} spacing={2}
				onSubmit={(e)=>{
					e.preventDefault();
					Axios.post('user', {
						username: username,
						password: password,
						authority: authority
					}).then((res)=>{
						console.log(res.data);
						setRedirect(true);
					}).catch((error)=>{
						console.log(error);
						
					});
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
				<Grid item xs={12} component={TextField} required id="confirmPassword" 
					name="confirmPassword" label="Confirm Password" type="password"
					onChange={change.bind(null, "confirmPassword")}
					value={confirmPassword}
					helperText={touched.confirmPassword ? errors.confirmPassword : ""}
					   error={touched.confirmPassword && Boolean(errors.confirmPassword)}
				/>
				<Grid item xs={12} component={TextField}
					required select id="authority" label="Authority" 
					helperText="Select your authority" margin="normal"
					value={authority}
					onChange={(event)=>{setAuthority(event.target.value)}}
				>
					{authorities.map(option => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Grid>
				<FormButton type="submit" disabled={!isValid} xs={12}>
					Sign Up
				</FormButton>
			</Grid>
		);
	}
};

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
	}),
	confirmPassword: Yup.string().required('re-enter your password')
	.oneOf([Yup.ref("password")], "password does not match")
	.matches(/^[a-z0-9]*$/i, {
		message: 'input letters and numbers only',
		excludeEmptyString: true,
	})
});

const InitialValues = {
	username: 'Username12345',
	password: '',
	confirmPassword: ''
};

function Validation(){
	return <AuthorizationForm 
		validationSchema={ValidationSchema}
		initialValues={InitialValues}
		render={(props)=><SignUp {...props}/>}
	/>
}

export default Validation;