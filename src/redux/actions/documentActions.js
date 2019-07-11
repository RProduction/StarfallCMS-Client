import * as Indexes from '../indexes/database';
import {normalizeDocuments} from '../schemas/database';
import Axios from '../../Axios';

export function AddField(keys, fieldType){
    return {type: "ADD_FIELD", keys: keys, fieldType: fieldType};
}

export function SetField(keys, value){
    return {type: "SET_FIELD", keys: keys, value: value};
}

export function DeleteField(keys){
    return {type: "DELETE_FIELD", keys: keys};
}

export function GenerateField(schema, document = {}){
    return {type: "GENERATE_FIELD", fieldType: schema, data: document};
}

// receive array of id, entityId, updated, created, data
export const AddDocuments = documents => async dispatch => {
    await Indexes.AddDocuments(documents.map(value => 
        ({
            id: value.id,
            entityId: value.entityId
        })
    ));
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

// receive object id, updated, data
export const ModifyDocument = (id, updated, data) => async dispatch => {
    dispatch({type: "MODIFY_DOCUMENT", id: id, updated: updated, data: data});
}

export const FetchDocuments = (entityId) => async dispatch => {
    try{
        const res = await Axios.get(`document/${entityId}`);
        const normalized = normalizeDocuments(res.data);
        let documents = [];
        normalized.result.forEach(value =>{
            documents.push({
                id: normalized.entities.documents[value]._id,
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