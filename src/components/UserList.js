import React, {useEffect} from 'react';

import Checkbox from '@material-ui/core/Checkbox';

import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Refresh from '@material-ui/icons/Refresh';
import Add from '@material-ui/icons/Add';
import MaterialTable from 'material-table';

import {useDispatch, useSelector} from 'react-redux';

import {InitUsers} from '../redux/actions/authorizationActions';
import {selectAllUsers} from '../redux/selectors/authorizationSelectors';
import {ShowDeleteDialog, SetTarget} from '../redux/actions/globalActions';
import UserListDialog from './UserListDialog';

const columns = [
    {
        title: "#", 
        field: "#", 
        searchable: false
    },
    {
        field: "id", 
        searchable: false, 
        hidden: true, 
        export: false
    },
    {
        title: "Username",
        field: "username", 
        searchable: true, 
        export: false
    },
    {
        title: "Is Creator?",
        field: "isCreator",
        render: (rowData) => <Checkbox readOnly checked={rowData.isCreator}/>
    }
]

function UserList(props){
    const {history} = props;
    const dispatch = useDispatch();
    const users = useSelector(state => selectAllUsers(state));

    useEffect(()=>{
        dispatch(InitUsers());
    }, []);

    return(
        <React.Fragment>
            <UserListDialog/>
            <MaterialTable 
                title="User List" 
                columns={columns} 
                data={users.map((value, index) => ({
                    '#': (index+1),
                    id: value.id,
                    username: value.username,
                    isCreator: value.isCreator
                }))}
                actions={[
                    (rowData) => ({
                        icon: ()=><DeleteForever/>, 
                        tooltip: "Delete User",
                        hidden: rowData.isCreator,
                        onClick: (e, rowData)=>{
                            const {id, username} = rowData;
                            dispatch(SetTarget({id: id, name: username}));
                            dispatch(ShowDeleteDialog());
                        }
                    }),
                    {
                        icon: ()=><Add/>, 
                        tooltip: "Add User",
                        isFreeAction: true,
                        onClick: ()=>history.push('/signup')
                    },
                    {
                        icon: ()=><Refresh/>, 
                        tooltip: "Refresh",
                        isFreeAction: true,
                        onClick: ()=>dispatch(InitUsers())
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
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10,25,50],
                    search: true,
                    actionsColumnIndex: -1
                }}
            />
        </React.Fragment>
    )
}

export default UserList;