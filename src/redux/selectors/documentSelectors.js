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

const _selectCurrentDocument = state => state.currentDocument;
export const selectCurrentDocumentType = state => _selectCurrentDocument(state).type;
export const selectCurrentDocumentData = state => _selectCurrentDocument(state).data;
// return key with their type
export const selectCurrentDocumentKeys = ()=>{
    return createSelector(
        selectCurrentDocumentType,
        (_, keys = []) => keys,
        (current, keys)=>{
            keys.forEach((value)=>{
                if(current.constructor === Object)
                    current = current[value];
                else if(current.constructor === Array)
                    current = current[0];
            });
            // check if current is object or array
            // if array return index 0
            // index 0 of array always contain type
            if(current.constructor === Object){
                return Object.entries(current).map(value =>({
                    key: value[0],
                    type: value[1].constructor === Object 
                        ? 'object' : value[1].constructor === Array
                        ? 'array': value[1]
                }));
            }else if(current.constructor === Array){
                return {
                    key: 0,
                    type: current[0].constructor === Object 
                        ? 'object' : current[0].constructor === Array
                        ? 'array': current[0]
                };
            }
        }
    )
};
export const selectCurrentDocumentValue = ()=>{
    return createSelector(
        selectCurrentDocumentData,
        (_, keys = []) => keys,
        (current, keys)=>{
            keys.forEach((value)=>{
                if(current[value])
                    current = current[value];
            });
            return current;
        }
    )
};