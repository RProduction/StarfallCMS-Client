import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import MaterialTable from 'material-table';
import {Search, Clear, ArrowForward, ArrowBack, FirstPage, LastPage, DeleteForever, Create, Add} from '@material-ui/icons'
import {CREATOR, MANAGER} from '../redux/actions/authorizationActions';
import {Link} from 'react-router-dom';
import {selectRelatedEntities, selectProjectByName} from '../redux/selectors/adminSelectors';

import { ADD_DIALOG, DELETE_DIALOG, RENAME_DIALOG, HideDialog
    , ShowAddDialog, ShowDeleteDialog, ShowRenameDialog
    , ShowNotificationDialog, HideNotificationDialog, SetTarget} from '../redux/actions/globalActions';
import DialogRename from './DialogRename';
import DialogDelete from './DialogDelete';
import DialogAdd from './DialogAdd';
import DialogNotification from './DialogNotification';

function Authorized(props){
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const dialogType = useSelector(state => state.dialog);
    const notification = useSelector(state => state.notification);

    return(
        <React.Fragment>
            <DialogAdd
                dialogProps={{
                    open: dialogType === ADD_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                addCategory="Entity"
                addRequest={`entity/${target.id}`}
                onSucceed={(res, name) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Add New Entity ${name}`, 
                        `Succeed adding new entity ${name}`
                    ));
                }}
                onFail={(err, name) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Add New Entity ${name}`, 
                        `Fail adding new entity ${name}, error: ${err}`
                    ));
                }}
            />
            <DialogDelete
                dialogProps={{
                    open: dialogType === DELETE_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                targetName={target.name}
                deleteRequest={`entity/${target.id}`}
                onSucceed={(res, name) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Delete Entity ${name}`, 
                        `Succeed deleting entity ${name}`
                    ));
                }}
                onFail={(err, name) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Delete Entity ${name}`, 
                        `Fail deleting entity ${name}, error: ${err}`
                    ));
                }}
            />
            <DialogRename
                dialogProps={{
                    open: dialogType === RENAME_DIALOG,
                    onClose: () => dispatch(HideDialog())
                }}
                renameRequest={`entity/${target.id}/rename`}
                targetName={target.name}
                onSucceed={(res, name, newName) => {
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Rename Entity ${name}`, 
                        `Succeed renaming entity ${name} into ${newName}`
                    ));
                }}
                onFail={(err, name, newName) => { 
                    dispatch(HideDialog());
                    dispatch(ShowNotificationDialog(
                        `Rename Entity ${name}`, 
                        `Fail renaming entity ${name} into ${newName}, error: ${err}`
                    ));
                }}
            />
            <DialogNotification 
                title={notification ? notification.title : ''} 
                content={notification ? notification.content : ''}
                dialogProps={{
                    open: Boolean(notification),
                    onClose: ()=>dispatch(HideNotificationDialog())
                }}
            />
        </React.Fragment>
    )
}

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
    const selectProject = useMemo(selectProjectByName, []);
    const selectEntities = useMemo(selectRelatedEntities, []);
    const status = useSelector(state=>state.authStatus);
    const _project = useSelector(state => selectProject(state, project));
    const entities = useSelector(state => selectEntities(state, _project.id));
    const [authorized, setAuthorized] = useState(false);

    useEffect(()=>{
        if(status === CREATOR || status === MANAGER) setAuthorized(true);
        else setAuthorized(false);
    }, status);

    let datas = [];
    let i=1;
    for(let entity of entities){
        datas.push({
            "#": i,
            id: entity.id,
            projectName: project,
            name: entity.name,
            createdAt: entity.created,
            updatedAt: entity.updated
        });
        i++;
    }

    // view all entities within project and their attribute
    // entity id
    // entity name
    // entity last modified
    // how many items

    return(
        <React.Fragment>
            {authorized ? <Authorized/> : null}
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
                            dispatch(SetTarget(_project.id, ""));
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