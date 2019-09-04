import Axios from '../../Axios';

// actions for storage

// receive files
export const UploadStorage = (files) => {
    return {
        type: "UPLOAD_STORAGE", 
        files: files
    };
}

export const RenameStorage = (id, name, updated) => {
    return {
        type: "RENAME_STORAGE", 
        id: id,
        name: name,
        updated: updated
    };
}

export const PublicStorage = (id, isPublic, updated) => {
    return {
        type: "PUBLIC_STORAGE", 
        id: id,
        isPublic: isPublic,
        updated: updated
    };
}

export const DeleteStorage = (ids) => {
    return {
        type: "DELETE_STORAGE", 
        ids: ids
    };
}

// get data from server containing storage list per project id
export const FetchStorage = (projectId) => async dispatch => {
    try{
        const res = await Axios.get(`storage/${projectId}`);
        dispatch(UploadStorage(res.data));
    }catch(err){
        console.log(err);
    }
}