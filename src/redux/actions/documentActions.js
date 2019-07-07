import * as Indexes from '../indexes/database';
import Axios from '../../Axios';

export function SetField(keys, value){
    return {type: "SET_FIELD", keys: keys, value: value};
}

export function DeleteField(keys){
    return {type: "DELETE_FIELD", keys: keys};
}

// receive array of id, projectId, name, updated, created, ...rest
export const AddDocuments = documents => async dispatch => {
    await Indexes.AddDocuments(documents.map(value => {
        return {
            id: value.id,
            entityId: value.entityId
        };
    }));
    dispatch({
        type: "ADD_DOCUMENTS", 
        documents: documents
    });
}

// accept array of id
export const DeleteDocuments = ids => async dispatch => {
    await Indexes.DeleteDocuments(ids);
    dispatch({type: "DELETE_DOCUMENTS", documents: ids});
}

// receive object id, projectId, name, updated, created, ...rest
export const ModifyDocument = document => async dispatch => {
    dispatch({type: "MODIFY_DOCUMENT", document: document});
}

export const FetchDocuments = (entityId) => async dispatch => {
    const documents = await Axios.get(`document/${entityId}`);
    dispatch(AddDocuments([]));
}