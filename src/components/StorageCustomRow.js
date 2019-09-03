import React from 'react';

import Box from '@material-ui/core/Box';
import MTableBodyRow from 'material-table/dist/components/m-table-body-row';

import {useDispatch} from 'react-redux';

import {ForwardStoragePath} from '../redux/actions/storageActions';

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