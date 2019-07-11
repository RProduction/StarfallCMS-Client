import {createSelector} from 'reselect';

const _selectDocumentsData = state => state.documents.data;
const _selectDocumentsInit = state => state.documents.init;
export const selectDocumentIds = state => Object.keys(_selectDocumentsData(state));
export const selectDocument = (state, id) => _selectDocumentsData(state)[id];
export const selectAllDocuments = state => Object.values(_selectDocumentsData(state));
export const selectDocumentsInEntity = ()=>{
    return createSelector(
        selectAllDocuments,
        (_, id) => id,
        (documents, id)=>{
            return documents.filter(value => value.entityId === id);
        }
    );
};

export const selectDocumentInit = (state, id) => _selectDocumentsInit(state)[id];

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
                current = current[value];
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
            }else if(current.constructor == Array){
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
                current = current[value];
            });
            return current;
        }
    )
};