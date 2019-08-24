import Axios from '../../Axios';

// actions for storage

// get data from server containing storage list per project id
export const FetchStorage = (projectId) => async dispatch => {
    try{
        const res = await Axios.get(`storage/${projectId}`);
        dispatch({type: "INIT_STORAGE", id: projectId, data: res.data});
    }catch(err){
        console.log(err);
    }
}

// receive project id, path, files
export const UploadStorage = (id, path, files) => {
    return {
        type: "UPLOAD_STORAGE", 
        id: id,
        path: path,
        files: files
    };
}

export const FolderStorage = (id, path) => {
    return {
        type: "FOLDER_STORAGE", 
        id: id,
        path: path
    };
}

export const MoveStorage = (id, path, targets) => {
    return {
        type: "MOVE_STORAGE", 
        id: id,
        path: path,
        targets: targets
    };
}

export const RenameStorage = (id, path, name, new_name) => {
    return {
        type: "RENAME_STORAGE", 
        id: id,
        path: path,
        name: name,
        new_name: new_name
    };
}

export const DeleteStorage = (id, paths) => {
    return {
        type: "DELETE_STORAGE", 
        id: id,
        paths: paths
    };
}

// actions for storage path
// receive project id
export function InitStoragePath(id){
    return {type: "INIT_STORAGE_PATH", id: id};
}

export function ForwardStoragePath(next){
    return {type: "FORWARD_STORAGE_PATH", next: next};
}

export function BackwardStoragePath(){
    return {type: "BACKWARD_STORAGE_PATH"};
}