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

// reducers
export const storageReducer = createReducer({}, {
    UPLOAD_STORAGE: UploadStorage,
    RENAME_STORAGE: RenameStorage,
    PUBLIC_STORAGE: PublicStorage,
    DELETE_STORAGE: DeleteStorage,
});