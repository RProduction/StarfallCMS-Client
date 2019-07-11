import { createReducer } from './helpers';
import {produce} from 'immer';

// document reducer
// receive array of id, entityId, data, updated, created
const AddDocuments = (state, action) => produce(state, (draft)=>{
    const {documents} = action;
    for(let document of documents){
        draft.data[document.id] = document
    }
});

const SetDocumentInit = (state, action) => produce(state, (draft)=>{
    const {entityId} = action;
    draft.init[entityId] = true;
});

// receive array of documents id
const DeleteDocuments = (state, action) => produce(state, (draft)=>{
    const {documents} = action;
    for(let document of documents){
        delete draft.data[document];
    }
});

const ModifyDocument = (state, action) => produce(state, (draft)=>{
    const {id, updated, data} = action;
    draft.data[id].updated = updated;
    draft.data[id].data = data;
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
    let targetKey;
    keys.forEach((value, index)=>{
        targetKey = value;
        if(index+1 < keys.length){
            currentType = currentType[targetKey];
        }
    });

    if(fieldType === 'object'){
        currentType[targetKey] = {};
    }else if(fieldType === 'array'){
        currentType[targetKey] = ['integer'];
    }else{
        currentType[targetKey] = fieldType;
    }
});

// receive array of key and value
// key must exist and have a right topology
const SetField = (state, action) => produce(state, (draft)=>{
    const {keys, value} = action;
    
    let current = draft.data;
    let targetKey;
    keys.forEach((value, index)=>{
        targetKey = value;
        if(index+1 < keys.length)
            current = current[targetKey];
    });

    current[targetKey] = value;
});

// receive array of key
const DeleteField = (state, action) => produce(state, (draft)=>{
    const {keys} = action;
    
    let currentType = draft.type;
    let targetKey;
    keys.forEach((value, index)=>{
        targetKey = value;
        if(index+1 < keys.length){
            currentType = currentType[targetKey];
        }
    });

    delete currentType[targetKey];
});

// reducers

export const documentsReducer = createReducer({data: {}, init: {}}, {
    ADD_DOCUMENTS: AddDocuments,
    DELETE_DOCUMENTS: DeleteDocuments,
    MODIFY_DOCUMENT: ModifyDocument,
    SET_DOCUMENT_INIT: SetDocumentInit
});

export const currentDocumentReducer = createReducer({data: {}, type: {}}, {
    GENERATE_FIELD: GenerateField,
    ADD_FIELD: AddField,
    SET_FIELD: SetField,
    DELETE_FIELD: DeleteField
});