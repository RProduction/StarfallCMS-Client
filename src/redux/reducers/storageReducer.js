import {createReducer} from './helpers';
import {produce} from 'immer';

// for storage reducer

// receive files
const UploadStorage = (state, action) => produce(state, (draft)=>{
    const {files} = action;

    files.forEach(file => {
        draft[file.id] = {
            id: file.id,
            project_id: file.project_id,
            name: file.name,
            size: file.size,
            isPublic: file.isPublic,
            created: file.created_at,
            modified: file.updated_at
        }
    });
});

// receive id, name, updated
const RenameStorage = (state, action) => produce(state, (draft)=>{
    const {id, name, updated} = action;
    
    draft[id].name = name;
    draft[id].updated = updated;
});

// receive id, isPublic, updated
const PublicStorage = (state, action) => produce(state, (draft)=>{
    const {id, isPublic, updated} = action;
    
    draft[id].isPublic = isPublic;
    draft[id].updated = updated;
});

// receive ids
const DeleteStorage = (state, action) => produce(state, (draft)=>{
    const {ids} = action;
    
    for(let id of ids){
        delete draft[id];
    }
});

// upload progress
const PushFileUpload = (state, action) => produce(state, (draft)=>{
    const {project, name, file} = action;
    if(!draft[project]) 
        draft[project] = {};

    let ptr = draft[project];
    if(!ptr[name])
        ptr[name] = {
            project: project,
            name: name,
            file: URL.createObjectURL(file),
            progress: 0,
            status: "Waiting",
            cancel: null
        };
});

const InitFileUpload = (state, action) => produce(state, (draft)=>{
    const {project, name} = action;
    let ptr = draft[project];
    if(ptr[name])
        ptr[name].status = "Uploading";
});

const SetFileUpload = (state, action) => produce(state, (draft)=> {
    // progress from 0 to 1
    const {project, name, progress} = action;
    let ptr = draft[project];
    if(ptr[name])
        ptr[name].progress = progress;
});

const FinishFileUpload = (state, action) => produce(state, (draft)=>{
    const {project, name} = action;
    let ptr = draft[project];
    if(ptr[name])
        ptr[name].status = "Finish";
});

const PopFileUpload = (state, action) => produce(state, (draft) => {
    const {project, name} = action;
    let ptr = draft[project];
    if(ptr[name]){
        URL.revokeObjectURL(ptr[name].file);
        delete ptr[name];
    }
});

// reducers
export const storageReducer = createReducer({}, {
    UPLOAD_STORAGE: UploadStorage,
    RENAME_STORAGE: RenameStorage,
    PUBLIC_STORAGE: PublicStorage,
    DELETE_STORAGE: DeleteStorage,
});


export const fileUploadReducer = createReducer({}, {
    PUSH_FILE_UPLOAD: PushFileUpload,
    INIT_FILE_UPLOAD: InitFileUpload,
    SET_FILE_UPLOAD: SetFileUpload,
    FINISH_FILE_UPLOAD: FinishFileUpload,
    POP_FILE_UPLOAD: PopFileUpload
});