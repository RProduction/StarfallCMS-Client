import {DeleteDocuments} from './documentActions';
import {selectDocumentsInEntity} from '../selectors/documentSelectors';

// receive array of id, projectId, name, updated, created
export const AddEntities = entities => {
    return {
        type: "ADD_ENTITIES", 
        entities: entities
    };
}

// accept array of id
export const DeleteEntities = ids => async (dispatch, getState) => {
    // delete documents first then can safely delete entities
    const select = selectDocumentsInEntity();
    let documents = [];
    ids.forEach(value => {
        const temp = select(getState(), value);
        temp.forEach(value => documents.push(value.id));
    });

    dispatch(DeleteDocuments(documents));
    dispatch({type: "DELETE_ENTITIES", entities: ids});
}

export const RenameEntity = (id, name, updated) => {
    return {
        type: "RENAME_ENTITY", 
        id: id,
        name: name,
        updated: updated
    };
}

export const SetEntitySchema = (id, schema, updated) => {
    return {
        type: "SET_ENTITY_SCHEMA", 
        id: id,
        schema: schema,
        updated: updated
    };
}