import React from 'react';

import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {Formik} from 'formik';

import ContentContainer from './ContentContainer';

const useStyle = makeStyles(theme => ({
	root:{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: theme.palette.background.dark.dark
	}
}));

function AuthorizationForm(props){
	const style = useStyle();

	return (
		<ContentContainer>
            <Grid container alignItems="center" justify="center" 
                className={style.root}
			>
				<Formik {...props}/>
			</Grid>
		</ContentContainer>
  	);
}

export default AuthorizationForm;