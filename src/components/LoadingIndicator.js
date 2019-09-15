import React from 'react';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingIndicator(props) {
	return (
		<Box display="flex" 
            alignItems="center" 
            justifyContent="center" 
            height="100vh"
        >
            <CircularProgress size={60} thickness={5}/>
        </Box>
	);
}

export default LoadingIndicator;