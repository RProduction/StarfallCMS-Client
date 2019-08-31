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

export const documentsReducer = createReducer({}, {
    ADD_DOCUMENTS: AddDocuments,
    DELETE_DOCUMENTS: DeleteDocuments,
    MODIFY_DOCUMENT: ModifyDocument
});