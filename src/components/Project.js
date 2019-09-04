import React, {useState, useEffect, useMemo} from 'react';

import {Link} from 'react-router-dom';

import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Add from '@material-ui/icons/Add';
import Create from '@material-ui/icons/Create';
import MaterialTable from 'material-table';

import {useDispatch, useSelector} from 'react-redux';

import {selectEntitiesInProjectByName} from '../redux/selectors/entitySelectors';
import {ShowAddDialog, ShowDeleteDialog, ShowRenameDialog, SetTarget} from '../redux/actions/globalActions';
import ProjectDialog from './ProjectDialog';

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
        field: "projectName", 
        searchable: false, 
        hidden: true, 
        export: false
    },
    {
        title: "Name", 
        field: "name", 
        searchable: true, 
        render: (rowData)=>{
            const {name, projectName} = rowData;
            return(
                <Link style={{color: 'black'}} to={`/${projectName}/${name}`}>
                    {name}
                </Link>
            )
        }
    },
    {
        title: "Created At", 
        field: "createdAt", 
        searchable: false,
        type: 'datetime'
    },
    {   
        title: "Updated At", 
        field: "updatedAt", 
        searchable: false,
        type: 'datetime'
    }
]

// fetch authStatus from redux store and setAuthorized(true) if creator or manager
// Any actions in Project will affect Entity and need Creator or Manager level Authorization
function Project(props){
    const dispatch = useDispatch();
    const {project} = props.match.params;

    const select = useMemo(selectEntitiesInProjectByName, []);
    const entities = useSelector(state => select(state, project));

    const [datas, setDatas] = useState([]);

    useEffect(()=>{
        setDatas(entities.entities.map((value, index) => ({
            "#": (index+1),
            id: value.id,
            projectName: project,
            name: value.name,
            createdAt: value.created,
            updatedAt: value.updated
        })));
    }, [entities]);

    // view all entities within project and their attribute
    // entity id
    // entity name
    // entity last modified
    // how many items

    return(
        <React.Fragment>
            <ProjectDialog/>
            <MaterialTable 
                title="Entities" 
                columns={columns} 
                data={datas}
                actions={[
                    {
                        icon: ()=><Create/>, 
                        tooltip: "Rename Entity", 
                        onClick: (e, rowData)=>{
                            const {id, name} = rowData;
                            dispatch(SetTarget({id: id, name: name}));
                            dispatch(ShowRenameDialog());
                        }
                    },
                    {
                        icon: ()=><DeleteForever/>, 
                        tooltip: "Delete Entity",
                        onClick: (e, rowData)=>{
                            const {id, name} = rowData;
                            dispatch(SetTarget({id: id, name: name}));
                            dispatch(ShowDeleteDialog());
                        }
                    },
                    {
                        icon: ()=><Add/>,
                        tooltip: "Add Entity",
                        isFreeAction: true,
                        onClick: (e)=>{
                            dispatch(SetTarget({id: entities.project.id}));
                            dispatch(ShowAddDialog());
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

export default Project;