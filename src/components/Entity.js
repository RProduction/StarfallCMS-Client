import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialTable from 'material-table';
import {Search, Clear, ArrowForward, ArrowBack, FirstPage, LastPage, DeleteForever, Add} from '@material-ui/icons'
import {FIRST_BOOT, NOT_AUTHORIZED} from '../redux/actions/authorizationActions';
import {Link, Redirect} from 'react-router-dom';
import {selectDocumentsInEntity} from '../redux/selectors/documentSelectors';
import {GetEntityIdByName} from '../redux/indexes/database';

import {FetchDocuments, DeleteDocuments} from '../redux/actions/documentActions';
import {ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogNotification from './DialogNotification';

const columns = [
    {
        title: "#", 
        field: "#", 
        searchable: false
    },
    {
        field: "projectName", 
        searchable: false, 
        hidden: true, 
        export: false
    },
    {
        field: "entityName", 
        searchable: false, 
        hidden: true, 
        export: false
    },
    {
        title: "ID", 
        field: "id", 
        searchable: false, 
        render: (rowData)=>{
            const {id, projectName, entityName} = rowData;
            return(
                <Link style={{color: 'black'}} to={`/${projectName}/${entityName}/${id}`}>
                    {id}
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

// fetch authStatus from redux store and setAuthorized(true) if creator, manager, user
// Any actions in Entity will affect Document and need to be signin
function Entity(props){
    const dispatch = useDispatch();
    const {project, entity} = props.match.params;
    
    const status = useSelector(state=>state.authStatus);
    const [authorized, setAuthorized] = useState(false);

    const notification = useSelector(state => state.notification);

    const [id, setId] = useState(0);
    const [add, setAdd] = useState(false);
    const select = useMemo(selectDocumentsInEntity, []);
    const documents = useSelector(state => select(state, id));

    const [datas, setDatas] = useState([]);
    
    useEffect(()=>{
        if(status !== FIRST_BOOT && status !== NOT_AUTHORIZED) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    useEffect(()=>{
        GetEntityIdByName(entity).then((value)=>{
            setId(value);
        });
    }, [entity]);

    useEffect(()=>{
        if(documents === [])
            dispatch(FetchDocuments(id));
        else{
            setDatas(documents.map((value, index) => ({
                "#": (index+1),
                id: value.id,
                projectName: project,
                entityName: entity,
                createdAt: value.created,
                updatedAt: value.updated
            })));
        }
    }, [documents, id]);

    // view all documents within entity and their attribute
    // document id
    // document last modified
    if(add) return <Redirect to={`/${project}/${entity}/add`}/>;

    return(
        <React.Fragment>
            {authorized ? 
                <DialogNotification 
                    title={notification ? notification.title : ''} 
                    content={notification ? notification.content : ''}
                    dialogProps={{
                        open: Boolean(notification),
                        onClose: ()=>dispatch(HideNotificationDialog())
                    }}
                /> : null
            }
            <MaterialTable 
                title="Documents" 
                columns={columns} 
                data={datas}
                actions={authorized ? [
                    {
                        icon: ()=><Add/>,
                        tooltip: "Add Document",
                        isFreeAction: true,
                        onClick: (e)=>{
                            // go to document page to create
                            setAdd(true);
                        }
                    },
                    {
                        icon: ()=><DeleteForever/>, 
                        tooltip: "Delete Documents",
                        onClick: (e, rowDatas)=>{
                            // get selected row and delete batch
                            console.log(rowDatas);
                            const ids = rowDatas.map(value => value.id);
                            dispatch(DeleteDocuments(ids));
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
                    pageSize: 100,
                    pageSizeOptions: [100,500,1000],
                    search: true,
                    selection: true,
                    actionsColumnIndex: -1
                }}
            />
        </React.Fragment>
    )
}

export default Entity;