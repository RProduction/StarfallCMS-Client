import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBack from '@material-ui/icons/ArrowBack';

import {useDispatch} from 'react-redux';

import {BackwardStoragePath} from '../redux/actions/storageActions';

const useStyle = makeStyles(theme => ({
	icon: {
		width: 48,
        height: 48,
        paddingLeft: theme.spacing(0.5)
	}
}));

function StorageCustomHeaderTitle({title}){
	const dispatch = useDispatch();
    const style = useStyle();

	return(
        <Box display="flex" alignItems="center">
            {title !== '/' ? 
                <IconButton className={style.icon} onClick={()=>{
                    dispatch(BackwardStoragePath());
                }}>
                    <ArrowBack/>
                </IconButton> 
                : null
            }
            <Typography>
                {title}
            </Typography>
		</Box>
	)
}

export default StorageCustomHeaderTitle;