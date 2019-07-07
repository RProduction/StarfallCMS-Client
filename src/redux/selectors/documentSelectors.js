import {createSelector} from 'reselect';

const _selectDocuments = state => state.documents;
export const selectDocumentIds = state => Object.keys(_selectDocuments(state));
export const selectDocument = (state, id) => _selectDocuments(state)[id];
export const selectAllDocuments = state => Object.values(_selectDocuments(state));
export const selectDocumentsInEntity = ()=>{
    return createSelector(
        selectAllDocuments,
        (_, id) => id,
        (documents, id)=>{
            return documents.filter(value => value.entityId === id);
        }
    );
};