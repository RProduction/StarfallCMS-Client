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

// receive array of key and value
// key must exist and have a right topology
const SetField = (state, action) => produce(state, (draft)=>{
    const {field} = action;
    const {keys, value} = field;
    
    let current = draft;
    let targetKey;
    for(let key in keys){
        const tempKey = keys[key];
        if(keys.length === key+1){
            targetKey = tempKey;
            break;
        }
        current = current[tempKey];
    }

    if(Array.isArray(current[targetKey])){
        current[targetKey].push(value);
    }else{
        current[targetKey] = value;
    }
});

// receive array of key
const DeleteField = (state, action) => produce(state, (draft)=>{
    const {field} = action;
    const {keys} = field;
    
    let current = draft;
    let targetKey;
    for(let key in keys){
        const tempKey = keys[key];
        if(keys.length === key+1){
            targetKey = tempKey;
            break;
        }
        current = current[tempKey];
    }

    delete current[targetKey];
});

// reducers

export const documentsReducer = createReducer({}, {
    ADD_DOCUMENTS: AddDocuments,
    DELETE_DOCUMENTS: DeleteDocuments,
    MODIFY_DOCUMENT: ModifyDocument
});

export const currentDocumentReducer = createReducer({}, {
    SET_FIELD: SetField,
    DELETE_FIELD: DeleteField
});