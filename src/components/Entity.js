import React, {useState, useMemo} from 'react';

import {Redirect} from 'react-router-dom';

import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Add from '@material-ui/icons/Add';
import NavigateNext from '@material-ui/icons/NavigateNext';
import MaterialTable from 'material-table';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import {selectDocumentsInEntityByName} from '../redux/selectors/documentSelectors';
import {ShowNotificationDialog, HideNotificationDialog} from '../redux/actions/globalActions';
import DialogCustom from './DialogCustom';
import DocumentJSONEditor from './DocumentJSONEditor';

const columns = [
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
        searchable: false
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
    },
    {
        field: "data",
        searchable: true,
        hidden: true
    }
]

// fetch authStatus from redux store and setAuthorized(true) if creator, manager, user
// Any actions in Entity will affect Document and need to be signin
function Entity(props){
    const dispatch = useDispatch();
    const {history} = props;
    const {project, entity} = props.match.params;

    const notification = useSelector(state => state.notification);

    const [redirect, setRedirect] = useState('');
    const select = useMemo(selectDocumentsInEntityByName, []);
    const documents = useSelector(state => select(state, project, entity));

    // view all documents within entity and their attribute
    // document id
    // document last modified
    if(redirect === 'add') return <Redirect to={`/${project}/${entity}/add`}/>;
    else if(redirect === 'schema') return <Redirect to={`/${project}/${entity}/schema`}/>;

    if(!documents)
        return <Redirect to="/"/>;
    else return(
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
                data={documents.documents.map(value => ({
                    id: value.id,
                    projectName: project,
                    entityName: entity,
                    createdAt: value.created,
                    updatedAt: value.updated,
                    data: JSON.stringify(value.data, null, 4)
                }))}
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
                                await Axios.delete('document', {
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
                onRowClick={(e, rowData)=>{
                    const {id, projectName, entityName} = rowData;
                    history.push(`/${projectName}/${entityName}/${id}`);
                }}
                detailPanel={rowData => <DocumentJSONEditor
                    readonly={true}
                    minLines={1}
                    fontSize={18}
                    data={rowData.data} 
                    onChange={() => {}}
                    onValidation={() => {}}
                />}
                icons={{
                    Search: Search,
                    ResetSearch: Clear,
                    DetailPanel: NavigateNext
                }}
                options={{
                    paging: false,
                    search: true,
                    selection: true,
                    actionsColumnIndex: -1
                }}
            />
        </React.Fragment>
    )
}

export default Entity;