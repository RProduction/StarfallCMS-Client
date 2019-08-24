import {createReducer} from './helpers';
import {produce} from 'immer';

// for storage reducer

// receive project id and data consist of folder structure in shape of object tree
const InitStorage = (state, action) => produce(state, (draft)=>{
    const {id, data} = action;
    draft[id] = data;
});

// receive project id, path, files
// process path into keys
// path can null
const UploadStorage = (state, action) => produce(state, (draft)=>{
    const {id, path, files} = action;
    
    let currentPath = draft[id];
    let keys = path.split('/');
    keys.forEach((key)=>{
        currentPath = currentPath[key];
    });

    files.forEach(value => currentPath[value.name] = {
        name: value.name,
        size: value.size,
        created: value.created,
        modified: value.modified
    });
});

// receive project id, path
// process path into keys
// path will never null
const FolderStorage = (state, action) => produce(state, (draft)=>{
    const {id, path} = action;
    
    let currentPath = draft[id];
    let keys = path.split('/');
    keys.forEach((key, index)=>{
        if(index+1 < keys.length){
            currentPath = currentPath[key];
        }else{
            currentPath[key] = {};
        }
    });
});

// receive project id, path, and targets
// path can null
// targets is array and 1 path will never null
const MoveStorage = (state, action) => produce(state, (draft)=>{
    const {id, path, targets} = action;

    let currentPath = draft[id];
    let keys = path.split('/');
    keys.forEach((key)=>{
        currentPath = currentPath[key];
    });

    targets.forEach(target => {
        let currentTarget = draft[id];
        let keys = target.split('/');
        keys.forEach((key, index)=>{
            if(index+1 < keys.length){
                currentTarget = currentTarget[key];
            }else{
                currentPath[key] = currentTarget[key];
                delete currentTarget[key];
            }
        });
    });
});

// receive project id, path, name, new_name
// path can null
const RenameStorage = (state, action) => produce(state, (draft)=>{
    const {id, path, name, new_name} = action;
    
    let currentPath = draft[id];
    let keys = path.split('/');
    keys.forEach((key)=>{
        currentPath = currentPath[key];
    });

    currentPath[new_name] = currentPath[name];
    delete currentPath[name];
});

// receive project id, and target paths
// paths is array and 1 path will never null
const DeleteStorage = (state, action) => produce(state, (draft)=>{
    const {id, paths} = action;
    
    paths.forEach(path => {
        let currentPath = draft[id];
        let keys = path.split('/');
        keys.forEach((key, index)=>{
            if(index+1 < keys.length){
                currentPath = currentPath[key];
            }else{
                delete currentPath[key];
            }
        });
    });
});

// for storage path reducer

// receive project id
// init path when first visiting storage
function InitStoragePath(state, action){
    const {id} = action;
    return `${id}`;
}

function ForwardStoragePath(state, action){
    const {next} = action;
    return `${state}/${next}`;
}

function BackwardStoragePath(state, action){
    const paths = state.split('/');
    let res = '';
    paths.forEach((path, index) => {
        if(index === 0)
            res = path;
        else if(index+1 < paths.length)
            res += `/${path}`;
    });

    return res;
}

// reducers
export const storageReducer = createReducer({}, {
    INIT_STORAGE: InitStorage,
    UPLOAD_STORAGE: UploadStorage,
    FOLDER_STORAGE: FolderStorage,
    MOVE_STORAGE: MoveStorage,
    RENAME_STORAGE: RenameStorage,
    DELETE_STORAGE: DeleteStorage,
});

export const storagePathReducer = createReducer('', {
    INIT_STORAGE_PATH: InitStoragePath,
    FORWARD_STORAGE_PATH: ForwardStoragePath,
    BACKWARD_STORAGE_PATH: BackwardStoragePath
});