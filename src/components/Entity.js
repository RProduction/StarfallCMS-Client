import React, {useState, useEffect, useMemo} from 'react';

import Link from 'react-router-dom/Link';
import Redirect from 'react-router-dom/Redirect';

import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Add from '@material-ui/icons/Add';
import MaterialTable from 'material-table';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import {selectDocumentsInEntityByName} from '../redux/selectors/documentSelectors';
import {ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogCustom from './DialogCustom';

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

    const notification = useSelector(state => state.notification);

    const [redirect, setRedirect] = useState('');
    const select = useMemo(selectDocumentsInEntityByName, []);
    const documents = useSelector(state => select(state, project, entity));

    const [datas, setDatas] = useState([]);

    useEffect(()=>{
        if(documents.documents){
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
            <DialogCustom
                category="notification"
                title={notification.title}
                content={notification.content}
                dialogProps={{
                    open: notification.title !== '' && notification.content !== '',
                    onClose: () => dispatch(HideNotificationDialog())
                }}
            />
            <MaterialTable 
                title="Documents" 
                columns={columns} 
                data={datas}
                actions={[
                    {
                        icon: ()=><Add/>,
                        tooltip: "Add Document",
                        isFreeAction: true,
                        onClick: (e)=>setRedirect('add')
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
                                    'Succeed deleting documents'
                                ));
                            }catch(err){
                                dispatch(ShowNotificationDialog(
                                    'Delete Documents',
                                    `Failed deleting documents, ${err}`
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