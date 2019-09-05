import React, {useMemo, useRef} from 'react';

import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import DeleteForever from '@material-ui/icons/DeleteForever';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Create from '@material-ui/icons/Create';
import MaterialTable from 'material-table';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import StorageCustomBody from './StorageCustomBody';
import StorageCustomToggle from './StorageCustomToggle';
import {selectStorageInProjectByName} from '../redux/selectors/storageSelectors';
import { ShowRenameDialog, SetTarget, ShowNotificationDialog} from '../redux/actions/globalActions';
import StorageDialog from './StorageDialog';

const columns = [
	{
		field: "id",
		searchable: false,
		hidden: true
	},
	{
		title: "Name",
		field: 'name',
		searchable: true
	},
	{
		title: "Size",
		field: 'size',
		searchable: false
	},
	{
		title: "Created At",
        field: "created", 
        searchable: false
	},
	{
		title: "Modified At",
        field: "modified", 
        searchable: false
	},
	{
		title: "Is Public?",
		field: "isPublic",
		render: (rowData) => <StorageCustomToggle rowData={rowData}/>
	}
];

function Storage(props) {
	const dispatch = useDispatch();
	const {project} = props.match.params;
	const fileInput = useRef(null);
	
	const _selectStorage = useMemo(selectStorageInProjectByName, []);
	const storage = useSelector(state => _selectStorage(state, project));console.log(storage);

	return (
		<React.Fragment>
			<StorageDialog/>
			<MaterialTable 
				title="Storage"
				columns={columns}
				data={storage.storage.map(value => ({
					id: value.id,
					name: value.name,
					size: value.size,
					created: value.created,
					modified: value.modified,
					isPublic: value.isPublic
				}))}
				actions={[
					{
						icon: ()=><CloudUpload/>,
						tooltip: "Upload Files",
						isFreeAction: true,
						onClick: ()=>fileInput.current.click()
					},
					rowData => ({
						icon: ()=><Create/>,
						tooltip: "Rename",
						onClick: (e, data)=>{
							// rename file
							dispatch(SetTarget({
								id: data[0].id, 
								name: data[0].name
							}));
							dispatch(ShowRenameDialog());
						},
						hidden: rowData.length !== 1
					}),
					{
						icon: ()=><DeleteForever/>,
						tooltip: "Delete",
						onClick: async(e, data)=>{
							try{
								await Axios.delete('storage', {
									data: {ids: data.map(value => value.id)}
								});
								dispatch(ShowNotificationDialog(
									'Delete Files', 
									'Succeed deleting files'
								));
							}catch(err){
								dispatch(ShowNotificationDialog(
									'Delete Files', 
									`Fail deleting files, error: ${err}`
								));
							}
						}
					}
				]}
				icons={{
					Search: Search,
					ResetSearch: Clear,
					FirstPage: FirstPage,
					PreviousPage: ArrowBack,
					NextPage: ArrowForward,
					LastPage: LastPage
				}}
				components={{
					Body: StorageCustomBody
				}}
				options={{
					search: false,
					selection: true,
					paging: false,
					draggable: false,
					actionsColumnIndex: -1
				}}
			/>
			<input multiple name="files" type="file" 
				style={{display: 'none'}} ref={fileInput}
				onChange={async(e)=>{
					console.log(fileInput.current.files);
					try{
						const formdata = new FormData();
						for(const file of fileInput.current.files){
							formdata.append('file[]', file, file.name);
						}

						await Axios.post(
							`storage/${storage.project.id}`, 
							formdata,
							{headers:{
								'Content-Type': 'multipart/form-data'
							}}
						);
						dispatch(ShowNotificationDialog(
							'Upload Files', 
							'Succeed uploading files'
						));
					}catch(err){
						dispatch(ShowNotificationDialog(
							'Upload Files', 
							`Fail uploading files, error: ${err}`
						));
					}
				}}
			/>
		</React.Fragment>
	);
}

export default Storage;