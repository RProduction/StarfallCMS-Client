import {normalizeProjects} from '../schemas/database';

// UI SideBar switch
export function SwitchSideBar(status){
    return {type: "SWITCH_SIDEBAR", status: status};
}

// projects and entities
function _DeleteProject(id){
    return {type: "DELETE_PROJECT", id: id};
}

function _DeleteEntityByProjectId(id){
    return {type: "DELETE_ENTITY_BY_PROJECT", id: id};
}


export function AddProject(id, name, created, updated, publicKey){
    return {
        type: "ADD_PROJECT", 
        id: id, 
        name: name, 
        created: created, 
        updated: updated, 
        publicKey: publicKey
    };
}

export function DeleteProject(id){
    return (dispatch)=>{
        // must delete entities first before deleting project
        // entities will search project indexes
        // then project can delete it's indexes
        dispatch(_DeleteEntityByProjectId(id));
        dispatch(_DeleteProject(id));
    };
}

export function RenameProject(id, name, updated){
    return {
        type: "RENAME_PROJECT", 
        id: id, 
        name: name,
        updated: updated
    };
}

export function AddEntity(id, project_id, name, created, updated){
    return {
        type: "ADD_ENTITY", 
        id: id, 
        project_id: project_id, 
        name: name,
        created: created,
        updated: updated
    };
}

export function DeleteEntity(id){
    return {type: "DELETE_ENTITY", id: id};
}

export function RenameEntity(id, name, updated){
    return {
        type: "RENAME_ENTITY", 
        id: id,
        name: name,
        updated: updated
    };
}

// get data from server containing project with related entity
// and dispatch multiple action from this function
export function InitDatabase(data){
    // normalized containing\
    /*
        entities:
            entities: object
            projects: object
        result: Array()
            0: _id
    */
    const normalized = normalizeProjects(data);

    return (dispatch) => {
        // loop over projects and assign it into store
        for (let project of Object.values(normalized.entities.projects)) {
            dispatch(
                AddProject(
                    project._id,
                    project.name,
                    project.created_at,
                    project.updated_at,
                    project.public_key
                )
            );
        }

        // loop over entities and assign it into store
        for (let entity of Object.values(normalized.entities.entities)) {
            dispatch(
                AddEntity(
                    entity._id,
                    entity.project_id,
                    entity.name,
                    entity.created_at,
                    entity.updated_at
                )
            );
        }
    };
}