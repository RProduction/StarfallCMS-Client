import {normalizeProjects} from '../schemas/database';
import * as Indexes from '../indexes/database';

// UI SideBar switch
export function SwitchSideBar(status){
    return {type: "SWITCH_SIDEBAR", status: status};
}

// projects and entities
const _DeleteProject = id => async dispatch => {
    await Indexes.DeleteProject(id);
    dispatch({type: "DELETE_PROJECT", id: id});
}

// receive array of id, projectId, name, updated, created
export const AddEntities = entities => async dispatch => {
    await Indexes.AddEntities(entities.map(value => {
        return {
            id: value.id,
            projectId: value.projectId,
            name: value.name
        };
    }));
    dispatch({
        type: "ADD_ENTITIES", 
        entities: entities
    });
}

// accept array of id
export const DeleteEntities = ids => async dispatch => {
    await Indexes.DeleteEntities(ids);
    dispatch({type: "DELETE_ENTITIES", entities: ids});
}

export const RenameEntity = (id, name, updated) => async dispatch => {
    await Indexes.RenameEntity(id, name);
    dispatch({
        type: "RENAME_ENTITY", 
        id: id,
        name: name,
        updated: updated
    });
}

// receive array of id, name, updated, created, publicKey
export const AddProjects = projects => async dispatch => {
    await Indexes.AddProjects(projects.map(value => {
        return {
            id: value.id,
            name: value.name
        };
    }));
    dispatch({
        type: "ADD_PROJECTS", 
        projects: projects
    });
}

export const DeleteProject = id => async dispatch => {
    // must delete entities first before deleting project
    // entities will search project indexes
    // then project can delete it's indexes
    const ids = await Indexes.GetRelatedEntities(id);
    dispatch(DeleteEntities(ids));
    dispatch(_DeleteProject(id));
}

export const RenameProject = (id, name, updated) => async dispatch => {
    await Indexes.RenameProject(id, name);
    dispatch({
        type: "RENAME_PROJECT", 
        id: id, 
        name: name,
        updated: updated
    });
}

// get data from server containing project with related entity
// and dispatch multiple action from this function
export const InitDatabase = (data) => async dispatch => {
    // normalized containing\
    /*
        entities:
            entities: object
            projects: object
        result: Array()
            0: _id
    */
    const normalized = normalizeProjects(data);console.log(normalized);
    let projects = Object.values(normalized.entities.projects);
    projects = projects.map(value => {
        return {
            id: value._id,
            name: value.name,
            created: value.created_at,
            updated: value.updated_at,
            publicKey: value.public_key
        };
    });
    
    let entities = Object.values(normalized.entities.entities);
    entities = entities.map(value => {
        return {
            id: value._id,
            projectId: value.project_id,
            name: value.name,
            created: value.created_at,
            updated: value.updated_at
        };
    });

    dispatch(AddProjects(projects));
    dispatch(AddEntities(entities));
}