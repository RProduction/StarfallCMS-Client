import {createReducer} from './helpers';
import {produce} from 'immer';

// project popover
function SetProjectPopover(state, action){
    return action.anchor;
}

// receive array of id, name, updated, created, publicKey
const AddProjects = (state, action) => produce(state, (draft)=>{
    const {projects} = action;
    for(let project of projects){
        draft[project.id] = {
            id: project.id,
            name: project.name,
            img: project.img,
            created: project.created,
            updated: project.updated,
            publicKey: project.publicKey
        }
    }
});

const DeleteProject = (state, action) => produce(state, (draft)=>{
    const {id} = action;
    delete draft[id];
});

const RenameProject = (state, action) => produce(state, (draft)=>{
    const {id, name, updated, publicKey} = action;
    draft[id].name = name;
    draft[id].updated = updated;
    draft[id].publicKey = publicKey;
});

const ImgProject = (state, action) => produce(state, (draft)=>{
    const {id, img, updated} = action;
    draft[id].img = img;
    draft[id].updated = updated;
});

// reducers
export const projectPopoverReducer = createReducer(null, {
    SET_PROJECT_POPOVER: SetProjectPopover
});

export const projectsReducer = createReducer({}, {
    ADD_PROJECTS: AddProjects,
    DELETE_PROJECT: DeleteProject,
    RENAME_PROJECT: RenameProject,
    IMG_PROJECT: ImgProject,
});