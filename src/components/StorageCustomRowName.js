import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Folder from '@material-ui/icons/Folder';

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