import * as Indexes from '../indexes/database';
import {DeleteEntities, AddEntities} from './entityActions';
import Axios from '../../Axios';
import {normalizeProjects} from '../schemas/database';

// UI Overview PopoverMenu
export function SetProjectPopover(anchor){
    return {type: "SET_PROJECT_POPOVER", anchor: anchor};
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
    
    // delete project
    await Indexes.DeleteProject(id);
    dispatch({type: "DELETE_PROJECT", id: id});
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
export const InitDatabase = () => async dispatch => {
    // normalized containing\
    /*
        entities:
            entities: object
            projects: object
        result: Array()
            0: _id
    */
    try{
        const _projects = await Axios.get('project');
        const normalized = normalizeProjects(_projects.data);
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
    }catch(err){
        console.log(err);
    }
}