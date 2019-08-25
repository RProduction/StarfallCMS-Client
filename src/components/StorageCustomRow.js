import React from 'react';
import {MTableBodyRow} from 'material-table';
import {useDispatch} from 'react-redux';
import {ForwardStoragePath} from '../redux/actions/storageActions';
import {Box} from '@material-ui/core';

function StorageCustomRow(props){
	const dispatch = useDispatch();

	// if size exist then file
	if(props.data.size)
		return(
			<Box component={MTableBodyRow} {...props}/>
		)
	else
		return(
			<Box component={MTableBodyRow} {...props} 
				onRowClick={(e, rowData) =>
					dispatch(ForwardStoragePath(rowData.name))
				}
			/>
		)
}

export default StorageCustomRow;