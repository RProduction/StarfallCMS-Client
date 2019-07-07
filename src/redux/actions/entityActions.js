import * as Indexes from '../indexes/database';
import {DeleteDocuments} from './documentActions';

// receive array of id, projectId, name, updated, created
export const AddEntities = entities => async dispatch => {
    await Indexes.AddEntities(entities.map(value => {
        return {
            id: value.id,
            projectId: value.projectId,
            name: value.name
        };
    }));
    dispatch({
        type: "ADD_ENTITIES", 
        entities: entities
    });
}

// accept array of id
export const DeleteEntities = ids => async dispatch => {
    // delete documents first then can safely delete entities
    for(let id of ids){
        const documents = await Indexes.GetRelatedDocuments(id);
        dispatch(DeleteDocuments(documents));
    }
    
    await Indexes.DeleteEntities(ids);
    dispatch({type: "DELETE_ENTITIES", entities: ids});
}

export const RenameEntity = (id, name, updated) => async dispatch => {
    await Indexes.RenameEntity(id, name);
    dispatch({
        type: "RENAME_ENTITY", 
        id: id,
        name: name,
        updated: updated
    });
}