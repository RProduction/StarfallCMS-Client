import FlexSearch from 'flexsearch';

// all module from here will act as index for project, database, item in redux store

// save project id into index table
// numeric id - projectId(objectId)
var projectIds = new FlexSearch({
    profile: 'speed',
    doc: {
        id: 'id',
        field: [
            'projectId'
        ]
    }
});

// save searchable project index
// must search index by id first if want to access projectIndex by id
// numeric id from projectIds(id)
// {
//    name: string
// }
var projectIndex = new FlexSearch({
    profile: 'speed',
    doc: {
        id: 'id',
        field: [
            'name'
        ]
    }
});

// save entity id into index table
// numeric id - id(objectId)
var entityIds = new FlexSearch({
    profile: 'speed',
    doc: {
        id: 'id',
        field: [
            'entityId',
            'projectId'
        ]
    }
});

// save searchable entity index
// must search index by id first if want to access entityIndex by id
// numeric index from entityIds(id)
// {
//    name: string,
//    project_index: index
// }
var entityIndex = new FlexSearch({
    profile: 'speed',
    doc: {
        id: 'id',
        field: [
            'name',
            'projectId'
        ]
    }
});

// query function
export function GetProjectIdByName(name){
    const byName = projectIndex.find('name', name);
    const project = projectIds.find(byName.id);
    return project.projectId;
}

export function GetEntityIdByName(name){
    const byName = entityIndex.find('name', name);
    const entity = entityIds.find(byName.id);
    return entity.entityId;
}

export function GetRelatedEntityByProjectId(projectId){
    const project = projectIds.find('projectId', projectId);
    if(!project) return [];

    const entities = entityIds.where({'projectId': project.id});
    return entities.map(value => value.entityId);
}


// always call this manipulation function when data not in use
// public project function
export function AddProject(id, name){
    const count = projectIds.length;
    projectIds.add({id: count, projectId: id});
    projectIndex.add({id: count, name: name});
}

export function DeleteProject(id){
    const project = projectIds.find('projectId', id);
    
    // remove project
    projectIds.remove({id: project.id});
    projectIndex.remove({id: project.id});
}

export function RenameProject(id, name){
    const project = projectIds.find('projectId', id);
    projectIndex.update({id: project.id, name: name});
}

// public entity function
export function AddEntity(id, projectId, name){
    const project = projectIds.find('projectId', projectId);
    const count = entityIds.length;
    entityIds.add({id: count, entityId: id, projectId: project.id});
    entityIndex.add({id: count, name: name, projectId: project.id});
}

export function DeleteEntity(id){
    const entity = entityIds.find('entityId', id);
    entityIds.remove({id: entity.id});
    entityIndex.remove({id: entity.id});
}

export function DeleteRelatedEntity(projectId){
    const project = projectIds.find('projectId', projectId);
    
    // remove related entities
    entityIds.remove({projectId: project.id});
    entityIndex.remove({projectId: project.id});
}

export function RenameEntity(id, name){
    const entity = entityIds.find('entityId', id);
    entityIndex.update({id: entity.id, name: name});
}