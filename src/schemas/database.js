import {schema, normalize} from 'normalizr';

const document = new schema.Entity('documents', {}, {idAttribute: '_id'});
const documentList = new schema.Array(document);

const entity = new schema.Entity('entities', {
    documents: documentList
}, {idAttribute: '_id'});
const entityList = new schema.Array(entity);

const project = new schema.Entity('projects', {
    entities: entityList
}, {idAttribute: '_id'});
const projectList = new schema.Array(project);

export function normalizeProjects(input){
    return normalize(input, projectList);
}

export function normalizeEntities(input){
    return normalize(input, entityList);
}

export function normalizeDocuments(input){
    return normalize(input, documentList);
}