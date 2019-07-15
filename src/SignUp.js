import React, { useEffect, useState } from 'react';
import AuthorizationForm from './components/AuthorizationForm';
import {Redirect} from 'react-router-dom';
import {TextField, Grid, MenuItem, makeStyles, Paper} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {CREATOR, MANAGER, FIRST_BOOT} from './redux/actions/authorizationActions';
import Axios from './Axios';
import * as Yup from 'yup';
import FormButton from './components/FormButton';

const AUTHORITIES_CREATOR = ['Manager', 'User'];
const AUTHORITIES_MANAGER = ['User'];
const AUTHORITIES_FIRST_BOOT = ['Creator'];

const useStyle = makeStyles(theme => ({
	root:{
		padding: theme.spacing(2.5),
		'& > div':{
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		}
	},
	btn:{
		backgroundColor: theme.palette.primary
	}
}));

const PaperForm = React.forwardRef((props, ref)=>{
	return <Paper component='form' {...props} innerRef={ref}/>
});

const SignUp = (props)=>{
	const style = useStyle();
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
			<Grid component={PaperForm} container item
				xs={8} sm={6} className={style.root}
				elevation={3}
				onSubmit={async(e)=>{
					e.preventDefault();
					try{
						await Axios.post('user', {
							username: username,
							password: password,
							authority: authority
						});
						setRedirect(true);
					}catch(err){
						console.log(err);
					}
				}}
			>
				<Grid item xs={12} component={TextField} required 
					id="username" name="username" label="Username"
					onChange={change.bind(null, "username")}
					value={username} variant="outlined" margin="dense"
					helperText={touched.username ? errors.username : ""}
					   error={touched.username && Boolean(errors.username)}
				/>
				<Grid item xs={12} component={TextField} required id="password" 
					name="password" label="Password" type="password"
					onChange={change.bind(null, "password")}
					value={password} variant="outlined" margin="dense"
					helperText={touched.password ? errors.password : ""}
					   error={touched.password && Boolean(errors.password)}
				/>
				<Grid item xs={12} component={TextField} required id="confirmPassword" 
					name="confirmPassword" label="Confirm Password" type="password"
					onChange={change.bind(null, "confirmPassword")}
					value={confirmPassword} variant="outlined" margin="dense"
					helperText={touched.confirmPassword ? errors.confirmPassword : ""}
					   error={touched.confirmPassword && Boolean(errors.confirmPassword)}
				/>
				<Grid item xs={12} component={TextField}
					required select id="authority" label="Authority" 
					helperText="Select your authority" margin="dense"
					value={authority} variant="outlined"
					onChange={(event)=>{setAuthority(event.target.value)}}
				>
					{authorities.map(option => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Grid>
				<FormButton type="submit" disabled={!isValid} 
					xs={12} variant="contained" color="secondary"
				>
					Sign Up
				</FormButton>
			</Grid>
		);
	}
};

const ValidationSchema = Yup.object({
	username: Yup.string().required('enter username')
	.matches(/^[a-zA-Z0-9]*$/, {
		message: 'input letters and numbers only',
		excludeEmptyString: true,
	}).min(5, 'username too short').max(30, 'username too long'),
	password: Yup.string().required('enter password')
	.matches(/^[a-zA-Z0-9]*$/, {
		message: 'input letters and numbers only',
		excludeEmptyString: true,
	}).min(5, 'password too short').max(30, 'password too long'),
	confirmPassword: Yup.string().required('re-enter your password')
	.oneOf([Yup.ref("password")], "password does not match")
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