import Dexie from 'dexie';

Dexie.delete('DB');
const db = new Dexie('DB');
db.version(1).stores({
    projects: 'id, &name',
    entities: 'id, projectId, name',
    documents: 'id, entityId'
});

// query function
export async function GetProjectIdByName(name){ 
    const value = await db.projects.get({name: name}, value => value);
    return value ? value.id : 0;
};

export async function GetEntityIdByName(name){
    const value = await db.entities.get({name: name}, value => value);
    return value ? value.id : 0;
};

export async function GetRelatedEntities(projectId){
    return await db.entities.where({'projectId': projectId}).primaryKeys();
};

export async function GetRelatedDocuments(entityId){
    return await db.documents.where({'entityId': entityId}).primaryKeys();
};

// always call this manipulation function when data not in use
// public project function
// receive array of {id, name}
export async function AddProjects(projects){
    await db.projects.bulkAdd(projects);
    return true;
};

export async function DeleteProject(id){
    await db.projects.delete(id);
    return true;
};

export async function RenameProject(id, name){
    await db.projects.update(id, {name: name});
    return true;
};

// public entity function
// receive array of {id, projectId, name}
export async function AddEntities(entities){
    await db.entities.bulkAdd(entities);
    return true;
};

// receive array of id
export async function DeleteEntities(ids){
    await db.entities.delete(ids);
    return true;
};

export async function RenameEntity(id, name){
    await db.entities.update(id, {name: name});
    return true;
};

// public document function
// receive array of {id, entityId}
export async function AddDocuments(documents){
    await db.documents.bulkAdd(documents);
    return true;
};

// receive array of id
export async function DeleteDocuments(ids){
    await db.documents.delete(ids);
    return true;
};