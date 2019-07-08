import * as Indexes from '../indexes/database';
import Axios from '../../Axios';

export function AddField(keys, fieldType, arrayType){
    return {type: "ADD_FIELD", keys: keys, fieldType: fieldType, arrayType: arrayType};
}

export function SetField(keys, value){
    return {type: "SET_FIELD", keys: keys, value: value};
}

export function DeleteField(keys){
    return {type: "DELETE_FIELD", keys: keys};
}

//receive object as source of truth and type to be modified by reference
function TraverseObject(object, type){
    Object.entries(object).forEach(([key, value])=>{
        // check type and assign
        if(value.constructor == Number && value % 1 === 0){
            type[key] = 'integer';
        }
        else if(value.constructor == Number && value % 1 !== 0){
            type[key] = 'float';
        }
        else if(value.constructor == String){
            type[key] = 'string';
        }
        else if(value.constructor == Boolean){
            type[key] = 'boolean';
        }
        else if(value.constructor == Object){
            type[key] = {};

            // traverse object
            TraverseObject(object[key], type[key]);
        }
        else if(value.constructor == Array){
            // get what type of item array contain
            
            type[key] = [];
        }
    });
}

export function GenerateField(document){
    const {id, entityId, created, updated, ...rest} = document;

    // traverse object to find type
    let fieldType = {};
    TraverseObject(rest, fieldType);
    return {type: "GENERATE_FIELD", data: rest, fieldType: fieldType};
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