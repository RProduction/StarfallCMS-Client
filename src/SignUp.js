import React from 'react';
import AuthorizationForm from './components/AuthorizationForm';
import {TextField, Grid, makeStyles, Paper} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AuthSignUp, FIRST_BOOT, CREATOR, USER, NOT_AUTHORIZED} from './redux/actions/authorizationActions';
import * as Yup from 'yup';
import FormButton from './components/FormButton';
import {Redirect} from 'react-router-dom';

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
	const dispatch = useDispatch();
	const _status = useSelector(state => state.authStatus);

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

	if(_status === NOT_AUTHORIZED)
		return <Redirect to='/signin'/>;
	else if(_status === USER)
		return <Redirect to='/'/>;
	else return (
		<Grid component={PaperForm} container item
			xs={8} sm={6} className={style.root}
			elevation={3}
			onSubmit={(e)=>{
				e.preventDefault();
				dispatch(AuthSignUp(username, password));
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
			<FormButton type="submit" disabled={!isValid} 
				xs={12} variant="contained" color="secondary"
			>
				Sign Up
			</FormButton>
		</Grid>
	);
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