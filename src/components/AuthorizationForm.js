import React from 'react';
import ContentContainer from './ContentContainer';
import {Grid, makeStyles} from '@material-ui/core';
import {Formik} from 'formik';

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