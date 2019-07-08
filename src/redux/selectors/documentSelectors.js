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

const _selectCurrentDocument = state => state.currentDocument;
// return key with their type
export const selectCurrentDocumentKeys = ()=>{
    return createSelector(
        _selectCurrentDocument,
        (_, keys = []) => keys,
        (currentDocument, keys)=>{
            let current = currentDocument.type;
            keys.forEach((value)=>{
                current = current[value];
            });
            return Object.entries(current).map(value =>({
                key: value[0],
                type: value[1],
            }));
        }
    )
};
export const selectCurrentDocumentValue = ()=>{
    return createSelector(
        _selectCurrentDocument,
        (_, keys = []) => keys,
        (currentDocument, keys)=>{
            let current = currentDocument.data;
            keys.forEach((value)=>{
                current = current[value];
            });
            return current;
        }
    )
};