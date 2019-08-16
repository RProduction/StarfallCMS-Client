import {DeleteEntities, AddEntities} from './entityActions';
import {selectEntitiesInProject} from '../selectors/entitySelectors';
import Axios from '../../Axios';
import {normalizeProjects} from '../schemas/database';

// UI Overview PopoverMenu
export function SetProjectPopover(anchor){
    return {type: "SET_PROJECT_POPOVER", anchor: anchor};
}

// receive array of id, name, updated, created, publicKey
export const AddProjects = projects => {
    return {
        type: "ADD_PROJECTS", 
        projects: projects
    };
}

export const DeleteProject = id => async (dispatch, getState) => {
    // must delete entities first before deleting project
    // entities will search project indexes
    // then project can delete it's indexes
    const select = selectEntitiesInProject();
    const entities = select(getState(), id);
    dispatch(DeleteEntities(entities.map(value => value.id)));
    
    // delete project
    dispatch({type: "DELETE_PROJECT", id: id});
}

export const RenameProject = (id, name, updated) => {
    return {
        type: "RENAME_PROJECT", 
        id: id, 
        name: name,
        updated: updated
    };
}

export const ImgProject = (id, img, updated) => {
    return {
        type: "IMG_PROJECT", 
        id: id, 
        img: img,
        updated: updated
    };
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
        let projects = []
        let entities = [];
        normalized.result.forEach(value =>{
            projects.push({
                id: normalized.entities.projects[value]._id,
                name: normalized.entities.projects[value].name,
                img: normalized.entities.projects[value].img_url,
                created: normalized.entities.projects[value].created_at,
                updated: normalized.entities.projects[value].updated_at,
                publicKey: normalized.entities.projects[value].public_key
            });

            normalized.entities.projects[value].entities.forEach(value =>{
                entities.push({
                    id: normalized.entities.entities[value]._id,
                    projectId: normalized.entities.entities[value].project_id,
                    name: normalized.entities.entities[value].name,
                    created: normalized.entities.entities[value].created_at,
                    updated: normalized.entities.entities[value].updated_at,
                    schema: normalized.entities.entities[value].schema || {}
                });
            });
        });
        
        dispatch(AddProjects(projects));
        dispatch(AddEntities(entities));
    }catch(err){
        console.log(err);
    }
}