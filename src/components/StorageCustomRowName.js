import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';
import { InsertDriveFile, Folder} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
	icon: {
		width: 48,
		height: 48,
		padding: theme.spacing(0.5)
	}
}));

function StorageCustomRowName({rowData}){
	const style = useStyle();

	return(
		<Box display="flex" alignItems="center">
			{!rowData.size 
				? <Folder className={style.icon}/>
				: <InsertDriveFile className={style.icon}/>
			}
			<Typography>
				{` ${rowData.name}`}
			</Typography>
		</Box>
	)
}

export default StorageCustomRowName;