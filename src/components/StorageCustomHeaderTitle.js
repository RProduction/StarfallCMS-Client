import React from 'react';
import {IconButton, Typography, Box, makeStyles} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
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