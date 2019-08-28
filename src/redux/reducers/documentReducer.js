import { createReducer } from './helpers';
import {produce} from 'immer';

// document reducer
// receive array of id, entityId, data, updated, created
const AddDocuments = (state, action) => produce(state, (draft)=>{
    const {documents} = action;
    for(let document of documents){
        draft[document.id] = document
    }
});

// receive array of documents id
const DeleteDocuments = (state, action) => produce(state, (draft)=>{
    const {documents} = action;
    for(let document of documents){
        delete draft[document];
    }
});

const ModifyDocument = (state, action) => produce(state, (draft)=>{
    const {id, updated, data} = action;
    draft[id].updated = updated;
    draft[id].data = data;
});

// receive data and type
const GenerateField = (state, action) => produce(state, (draft)=>{
    const {data, fieldType} = action;

    draft.data = data;
    draft.type = fieldType;
});

// receive array of key and type
// array type only for array(define what can of type array contain)
const AddField = (state, action) => produce(state, (draft)=>{
    const {keys, fieldType} = action;

    let currentType = draft.type;
    keys.forEach((key, index)=>{
        if(index+1 < keys.length){
            currentType = currentType[key];
        }else if (fieldType === 'object'){
            currentType[key] = {};
        }else if(fieldType === 'array'){
            currentType[key] = ['integer'];
        }else{
            currentType[key] = fieldType;
        }
    });
});

// receive array of key and value
// key must exist and have a right topology
const SetField = (state, action) => produce(state, (draft)=>{
    const {keys, value} = action;
    
    let current = draft.data;
    let currentType = draft.type;
    keys.forEach((key, index)=>{
        if(index+1 < keys.length){
            if(currentType.constructor === Object)
                currentType = currentType[key];
            else if(currentType.constructor === Array)
                currentType = currentType[0];
            
            if(!current[key] && currentType.constructor === Object)
                current[key] = {};
            else if(!current[key] && currentType.constructor === Array)
                current[key] = [];

            current = current[key];
        }
        else
            current[key] = value;
    });
});

// receive array of key
const DeleteField = (state, action) => produce(state, (draft)=>{
    const {keys} = action;
    
    let currentType = draft.type;
    keys.forEach((key, index)=>{
        if(index+1 < keys.length)
            currentType = currentType[key];
        else
            delete currentType[key];
    });
});

// reducers

export const documentsReducer = createReducer({}, {
    ADD_DOCUMENTS: AddDocuments,
    DELETE_DOCUMENTS: DeleteDocuments,
    MODIFY_DOCUMENT: ModifyDocument
});

export const currentDocumentReducer = createReducer({data: {}, type: {}}, {
    GENERATE_FIELD: GenerateField,
    ADD_FIELD: AddField,
    SET_FIELD: SetField,
    DELETE_FIELD: DeleteField
});