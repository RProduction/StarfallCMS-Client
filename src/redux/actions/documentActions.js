import {normalizeDocuments} from '../schemas/database';
import Axios from '../../Axios';

// receive array of id, entityId, updated, created, data
export const AddDocuments = documents => {
    return {
        type: "ADD_DOCUMENTS", 
        documents: documents
    };
}

// accept array of id
export const DeleteDocuments = ids => {
    return {type: "DELETE_DOCUMENTS", documents: ids};
}

// receive object id, updated, data
export const ModifyDocument = (id, updated, data) => {
    return {type: "MODIFY_DOCUMENT", id: id, updated: updated, data: data};
}

export const FetchDocuments = (entityId) => async dispatch => {
    try{
        const res = await Axios.get(`document/${entityId}`);
        const normalized = normalizeDocuments(res.data);
        let documents = [];
        normalized.result.forEach(value =>{
            documents.push({
                id: normalized.entities.documents[value].id,
                entityId: normalized.entities.documents[value].entity_id,
                created: normalized.entities.documents[value].created_at,
                updated: normalized.entities.documents[value].updated_at,
                data: normalized.entities.documents[value].data
            });
        });
        
        dispatch({type: 'SET_DOCUMENT_INIT', entityId: entityId});
        dispatch(AddDocuments(documents));
    }catch(err){
        console.log(err);
    }
}