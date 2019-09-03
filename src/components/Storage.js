import React, {useEffect, useMemo, useRef} from 'react';

import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import DeleteForever from '@material-ui/icons/DeleteForever';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Create from '@material-ui/icons/Create';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import MaterialTable from 'material-table';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import StorageCustomBody from './StorageCustomBody';
import StorageCustomHeaderTitle from './StorageCustomHeaderTitle';
import StorageCustomRow from './StorageCustomRow';
import StorageCustomRowName from './StorageCustomRowName';
import {selectProjectByName} from '../redux/selectors/projectSelectors';
import {selectStoragePath, selectStorage} from '../redux/selectors/storageSelectors';
import {InitStoragePath} from '../redux/actions/storageActions';
import { ShowAddDialog, ShowRenameDialog, SetTarget, ShowNotificationDialog} from '../redux/actions/globalActions';
import StorageDialog from './StorageDialog';

const columns = [
    {
		title: "Name",
        field: "name", 
		searchable: true,
		render: rowData => <StorageCustomRowName rowData={rowData}/>
	},
	{
		title: "Size",
        field: "size", 
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
	}
];

function Storage(props) {
	const dispatch = useDispatch();
	const {project} = props.match.params;
	const fileInput = useRef(null);

	const select = useMemo(selectProjectByName, []);
	const _project = useSelector(state => select(state, project));
	
	const storagePath = useSelector(selectStoragePath);
	
	const _selectStorage = useMemo(selectStorage, []);
	const storage = useSelector(state => _selectStorage(
		state, 
		storagePath ? storagePath.fullpath : ''
	));

	useEffect(()=>{
		if(_project){
			dispatch(InitStoragePath(_project.id));
		}
	}, [_project]);

	return (
		<React.Fragment>
			<StorageDialog/>
			<MaterialTable 
				title={<StorageCustomHeaderTitle title={
					storagePath.partialpath ? storagePath.partialpath : '/'
				}/>}
				columns={columns}
				data={storage.map(value => ({
					name: value.name,
					size: value.size,
					created: value.created,
					modified: value.modified
				}))}
				actions={[
					{
						icon: ()=><CloudUpload/>,
						tooltip: "Upload Files",
						isFreeAction: true,
						onClick: ()=>fileInput.current.click()
					},
					{
						icon: ()=><CreateNewFolder/>,
						tooltip: "Add Folder",
						isFreeAction: true,
						onClick: (e, rowData)=>{
							// action to add folder
							dispatch(SetTarget({
								id: _project.id, 
								path: storagePath.partialpath
							}));
							dispatch(ShowAddDialog());
						}
					},
					rowData => ({
						icon: ()=><Create/>,
						tooltip: "Rename",
						onClick: (e, data)=>{
							// rename file or folder
							dispatch(SetTarget({
								id: _project.id, 
								name: data[0].name,
								path: storagePath.partialpath
							}));
							dispatch(ShowRenameDialog());
						},
						hidden: rowData.length !== 1
					}),
					{
						icon: ()=><SwapHoriz/>,
						tooltip: "Move",
						onClick: (e, data)=>{
							
						}
					},
					{
						icon: ()=><DeleteForever/>,
						tooltip: "Delete",
						onClick: async(e, data)=>{
							try{
								const paths = data.map(
									value => storagePath.partialpath 
									? `${storagePath.partialpath}/${value.name}`
									: value.name
								);
								
								await Axios.delete(`storage/${_project.id}`, {
									data: {paths: paths}
								});
								dispatch(ShowNotificationDialog(
									`Delete Files and Folders`, 
									`Succeed deleting files and folders`
								));
							}catch(err){
								dispatch(ShowNotificationDialog(
									`Delete Files and Folders`, 
									`Fail deleting files and folders, error: ${err}`
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
					Body: StorageCustomBody,
					Row: StorageCustomRow
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
						formdata.set('path', storagePath.partialpath);
						for(const file of fileInput.current.files){
							formdata.append('file[]', file, file.name);
						}

						await Axios.post(
							`storage/${_project.id}`, 
							formdata,
							{headers:{
								'Content-Type': 'multipart/form-data'
							}}
						);
						dispatch(ShowNotificationDialog(
							`Upload Files`, 
							`Succeed uploading files`
						));
					}catch(err){
						dispatch(ShowNotificationDialog(
							`Upload Files`, 
							`Fail uploading files, error: ${err}`
						));
					}
				}}
			/>
		</React.Fragment>
	);
}

export default Storage;