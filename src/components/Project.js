import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import {Search, Clear, ArrowForward, ArrowBack, FirstPage, LastPage, DeleteForever, Create, Add} from '@material-ui/icons'
import {CREATOR, MANAGER} from '../actions/authorizationActions';
import {Link} from 'react-router-dom';

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
    const {project} = props.match.params;
    const status = useSelector(state=>state.authStatus);
    const database = useSelector(
        state => state.database[project], ()=>false
    );
    const [authorized, setAuthorized] = useState(false);

    useEffect(()=>{
        if(status === CREATOR || status === MANAGER) setAuthorized(true);
        else setAuthorized(false);
    }, status);

    let datas = [];
    if(database !== undefined && database.entities !== undefined){
        let i=1;
        for(const [key, value] of Object.entries(database.entities)){
            datas.push({
                "#": i,
                id: value.id,
                projectName: project,
                name: key,
                createdAt: value.created,
                updatedAt: value.updated
            });
            i++;
        }
    }

    // view all entities within project and their attribute
    // entity id
    // entity name
    // entity last modified
    // how many items

    return(
        <MaterialTable 
            title="Entities" 
            columns={columns} 
            data={datas}
            actions={authorized ? [
                {
                    icon: ()=><Create/>, 
                    tooltip: "Rename Entity", 
                    onClick: ()=>{}
                },
                {
                    icon: ()=><DeleteForever/>, 
                    tooltip: "Delete Entity",
                    onClick: ()=>{}
                },
                {
                    icon: ()=><Add/>,
                    tooltip: "Add Entity",
                    isFreeAction: true,
                    onClick: ()=>{}
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
    )
}

export default Project;