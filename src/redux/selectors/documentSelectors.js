import {createSelector} from 'reselect';
import {selectEntityByName} from './entitySelectors';

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

// if empty then return entity
export const selectDocumentsInEntityByName = ()=>{
    return createSelector(
        selectAllDocuments,
        (state, name)=>{
            const select = selectEntityByName();
            return select(state, name);
        },
        (documents, entity)=>{
            return {
                entity: entity,
                documents: documents.filter(value => value.entityId === entity.id)
            };
        }
    );
};