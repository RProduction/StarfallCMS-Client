import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthorizationForm from './components/AuthorizationForm';
import {TextField, Grid, Paper, makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {FIRST_BOOT, NOT_AUTHORIZED, AUTHORIZATION_STATUS, SetAuthStatus} from './redux/actions/authorizationActions';
import Axios from './Axios';
import * as Yup from 'yup';
import FormButton from './components/FormButton';

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

function SignIn(props) {
	const style = useStyle();
	const dispatch = useDispatch();
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
		return <Grid component={PaperForm} container item 
			xs={8} sm={6} className={style.root}
			elevation={3}
			onSubmit={async(e)=>{
				e.preventDefault();
				try{
					const res = await Axios.post('user/signin', {
						username: username,
						password: password
					});
					dispatch(SetAuthStatus(AUTHORIZATION_STATUS[res.data.status]));
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
			<FormButton type="submit" disabled={!isValid} 
				xs={12} color="secondary" variant="contained"
			>
				Sign In
			</FormButton>
		</Grid>
	}
}

const ValidationSchema = Yup.object({
	username: Yup.string().required('enter username')
	.matches(/^[a-zA-Z0-9]*$/, {
		message: 'input letters and numbers only',
		excludeEmptyString: true,
	}),
	password: Yup.string().required('enter password')
	.matches(/^[a-zA-Z0-9]*$/, {
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