import React, {useState, useEffect, useMemo, lazy} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialTable from 'material-table';
import {Search, Clear, ArrowForward, ArrowBack, FirstPage, LastPage, DeleteForever, Create, Add} from '@material-ui/icons'
import {CREATOR, MANAGER} from '../redux/actions/authorizationActions';
import {Link} from 'react-router-dom';
import {selectEntitiesInProjectByName} from '../redux/selectors/entitySelectors';

import {ShowAddDialog, ShowDeleteDialog, ShowRenameDialog
    , SetTarget} from '../redux/actions/globalActions';

const ProjectAuthorized = lazy(() => import('./ProjectAuthorized'));

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
    
    const status = useSelector(state=>state.authStatus);
    const [authorized, setAuthorized] = useState(false);

    const select = useMemo(selectEntitiesInProjectByName, []);
    const entities = useSelector(state => select(state, project));

    const [datas, setDatas] = useState([]);

    useEffect(()=>{
        if(status === CREATOR || status === MANAGER) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

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
            {authorized ? <ProjectAuthorized/> : null}
            <MaterialTable 
                title="Entities" 
                columns={columns} 
                data={datas}
                actions={authorized ? [
                    {
                        icon: ()=><Create/>, 
                        tooltip: "Rename Entity", 
                        onClick: (e, rowData)=>{
                            const {id, name} = rowData;
                            dispatch(SetTarget(id, name));
                            dispatch(ShowRenameDialog());
                        }
                    },
                    {
                        icon: ()=><DeleteForever/>, 
                        tooltip: "Delete Entity",
                        onClick: (e, rowData)=>{
                            const {id, name} = rowData;
                            dispatch(SetTarget(id, name));
                            dispatch(ShowDeleteDialog());
                        }
                    },
                    {
                        icon: ()=><Add/>,
                        tooltip: "Add Entity",
                        isFreeAction: true,
                        onClick: (e)=>{
                            dispatch(SetTarget(entities.project.id, ""));
                            dispatch(ShowAddDialog());
                        }
                    }
                ]: []}
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