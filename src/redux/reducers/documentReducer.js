import { createReducer } from './helpers';
import {produce} from 'immer';

// document reducer
// receive array of id, entityId, ...data, updated, created
const AddDocuments = (state, action) => produce(state, (draft)=>{
    const {documents} = action;
    for(let document of documents){
        const {id, entityId, created, updated, ...rest} = document;
        draft[id] = {
            id: id,
            entityId: entityId,
            created: created,
            updated: updated,
            ...rest
        }
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
    const {document} = action;
    const {id, entityId, created, updated, ...rest} = document;
    draft[id] = {
        id: id,
        entityId: entityId,
        created: created,
        updated: updated,
        ...rest
    }
});

/*
test = {
    id: '',
    test1: {
        test1_1: {
            test1_1_1: ''
        },
        test1_2: [
            {

            }
        ]
    },
    test2: 'test',
    test3: [
        '',
        '',
        ''
    ]
}
*/

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