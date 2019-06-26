import React from 'react';
import ContentContainer from './ContentContainer';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyle = makeStyles({
	root:{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	form:{
		
	}
});

function AuthorizationForm(props) {  
	const style = useStyle();

	return (
		<ContentContainer>
            <Grid container alignItems="center" justify="center" 
                className={style.root}
            >
                <Grid component="form" container item 
                    xs={8} sm={6} spacing={2} className={style.form}
                >
					{props.children}
				</Grid>
			</Grid>
		</ContentContainer>
  	);
}

export default AuthorizationForm;