import React from 'react';
import ContentContainer from './ContentContainer';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Formik} from 'formik';

const useStyle = makeStyles({
	root:{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

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