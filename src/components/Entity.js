import React, {useState, useEffect, useMemo, lazy} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialTable from 'material-table';
import {Search, Clear, ArrowForward, ArrowBack, FirstPage, LastPage, DeleteForever, Add, Create} from '@material-ui/icons'
import {FIRST_BOOT, NOT_AUTHORIZED} from '../redux/actions/authorizationActions';
import {Link, Redirect} from 'react-router-dom';
import {selectDocumentsInEntityByName, selectDocumentInit} from '../redux/selectors/documentSelectors';
import Axios from '../Axios';

import {FetchDocuments} from '../redux/actions/documentActions';
import {ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';

const DialogNotification = lazy(() => import('./DialogNotification'));

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

    const [redirect, setRedirect] = useState('');
    const select = useMemo(selectDocumentsInEntityByName, []);
    const documents = useSelector(state => select(state, entity));

    const init = useSelector(state => selectDocumentInit(
        state, documents.entity ? documents.entity.id : 0
    ));

    const [datas, setDatas] = useState([]);
    
    useEffect(()=>{
        if(status !== FIRST_BOOT && status !== NOT_AUTHORIZED) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    useEffect(()=>{
        if(!init && documents.entity)
            dispatch(FetchDocuments(documents.entity.id));
        else if(documents.documents){
            setDatas(documents.documents.map((value, index) => ({
                "#": (index+1),
                id: value.id,
                projectName: project,
                entityName: entity,
                createdAt: value.created,
                updatedAt: value.updated
            })));
        }
    }, [documents]);

    // view all documents within entity and their attribute
    // document id
    // document last modified
    if(redirect === 'add') return <Redirect to={`/${project}/${entity}/add`}/>;
    else if(redirect === 'schema') return <Redirect to={`/${project}/${entity}/schema`}/>;

    return(
        <React.Fragment>
            {authorized ? 
                <DialogNotification 
                    title={notification.title} 
                    content={notification.content}
                    dialogProps={{
                        open: notification.title !== '' && notification.content !== '',
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
                            setRedirect('add');
                        }
                    },
                    {
                        icon: ()=><Create/>,
                        tooltip: "Edit Schema",
                        isFreeAction: true,
                        onClick: (e)=>{
                            // go to document schema page to edit
                            setRedirect('schema');
                        }
                    },
                    {
                        icon: ()=><DeleteForever/>, 
                        tooltip: "Delete Documents",
                        onClick: async(e, rowDatas)=>{
                            // get selected row and delete batch
                            const ids = rowDatas.map(value => value.id);
                            try{
                                const res = await Axios.delete('document', {
                                    data: {ids: ids}
                                });
                                dispatch(ShowNotificationDialog(
                                    'Delete Documents',
                                    `Succeed deleting documents: ${res.data.count} count`
                                ));
                            }catch(err){
                                dispatch(ShowNotificationDialog(
                                    'Delete Documents',
                                    `Failed deleting documents, ${err}`
                                ));
                            }
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