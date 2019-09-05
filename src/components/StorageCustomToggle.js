import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import {useDispatch} from 'react-redux';

import Axios from '../Axios';

import {ShowNotificationDialog} from '../redux/actions/globalActions';

function StorageCustomToggle({rowData}) {
    const dispatch = useDispatch();

	return(
        <Box display="flex" alignItems="center">
            <Switch checked={rowData.isPublic} onChange={async(e)=>{
                try{
                    await Axios.post(`storage/${rowData.id}/public`);
                }catch(err){
                    dispatch(ShowNotificationDialog(
                        'Toggle File Access', 
                        `Fail toggling file access, error: ${err}`
                    ));
                }
            }}/>
            <Typography>
                {rowData.isPublic ? 'Public' : 'Private'}
            </Typography>
        </Box>
    )
}

export default StorageCustomToggle;