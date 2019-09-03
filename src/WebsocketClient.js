import {useEffect} from 'react';

import Ws from '@adonisjs/websocket-client';

import {useDispatch} from 'react-redux';

import {AddProjects, DeleteProject, RenameProject, ImgProject} from './redux/actions/projectActions';
import {AddEntities, DeleteEntities, RenameEntity} from './redux/actions/entityActions';
import {AddDocuments, ModifyDocument, DeleteDocuments} from './redux/actions/documentActions';
import {UploadStorage, FolderStorage, RenameStorage, MoveStorage, DeleteStorage} from './redux/actions/storageActions';

function WebsocketClient(props) {
    const dispatch = useDispatch();

    useEffect(()=>{
        const ws = process.env.NODE_ENV === 'development' 
            ? Ws('ws://localhost:3333/', {path: 'starfall-cms-ws'}) 
            : Ws(null, {path: 'starfall-cms-ws'});
        
        ws.on("open", ()=>{
            const project = ws.subscribe('project');
            const entity = ws.subscribe('entity');
            const document = ws.subscribe('document');
            const storage = ws.subscribe('storage');
            
            // project socket listener
            project.on('add', (msg)=>{
                console.log("add project");
                console.log(msg);
                dispatch(AddProjects([{
                    id: msg.id,
                    name: msg.name,
                    img: msg.img_url,
                    created: msg.created_at,
                    updated: msg.updated_at,
                    publicKey: msg.public_key
                }]));
            });
            project.on('delete', (msg)=>{
                console.log("delete project");
                console.log(msg);
                dispatch(DeleteProject(msg.id));
            });
            project.on('rename', (msg)=>{
                console.log("rename project");
                console.log(msg);
                dispatch(RenameProject(
                    msg.id, 
                    msg.name, 
                    msg.updated_at,
                    msg.public_key
                ));
            });
            project.on('img', (msg)=>{
                console.log("change image of project");
                console.log(msg);
                dispatch(ImgProject(
                    msg.id, 
                    msg.img_url, 
                    msg.updated_at
                ));
            });
            project.on("error", (err)=>{
                console.log(err);
            });

            // entity socket listener
            entity.on('add', (msg)=>{
                console.log("add entity");
                console.log(msg);
                dispatch(AddEntities([{
                    id: msg.id,
                    projectId:msg.project_id,
                    name: msg.name,
                    created: msg.created_at,
                    updated: msg.updated_at
                }]));
            });
            entity.on('delete', (msg)=>{
                console.log("delete entity");
                console.log(msg);
                dispatch(DeleteEntities([msg.id]));
            });
            entity.on('rename', (msg)=>{
                console.log("rename entity");
                console.log(msg);
                dispatch(RenameEntity(
                    msg.id,
                    msg.name, 
                    msg.updated_at
                ));
            });
            entity.on("error", (err)=>{
                console.log(err);
            });

            // document socket listener
            document.on('add', (msg)=>{
                console.log("add document");
                console.log(msg);
                dispatch(AddDocuments([{
                    id: msg.id,
                    entityId: msg.entity_id,
                    created: msg.created_at,
                    updated: msg.updated_at,
                    data: msg.data
                }]));
            });
            document.on('modify', (msg)=>{
                console.log("modify document");
                console.log(msg);
                dispatch(ModifyDocument(
                    msg.id,
                    msg.updated_at,
                    msg.data
                ));
            });
            document.on('delete', (msg)=>{
                console.log("delete documents");
                console.log(msg);
                dispatch(DeleteDocuments(msg.ids));
            });

            // storage socket listener
            storage.on('upload', (msg)=>{
                console.log("upload into storage");
                console.log(msg);
                dispatch(UploadStorage(msg.id, msg.path, msg.files));
            });
            storage.on('folder', (msg)=>{
                console.log("new folder into storage");
                console.log(msg);
                dispatch(FolderStorage(msg.id, msg.path));
            });
            storage.on('move', (msg)=>{
                console.log("move storage");
                console.log(msg);
                dispatch(MoveStorage(msg.id, msg.path, msg.targets));
            });
            storage.on('rename', (msg)=>{
                console.log("rename storage");
                console.log(msg);
                dispatch(RenameStorage(msg.id, msg.path, msg.name, msg.new_name));
            });
            storage.on('delete', (msg)=>{
                console.log("delete storage");
                console.log(msg);
                dispatch(DeleteStorage(msg.id, msg.paths));
            });
        });

        ws.on("close", ()=>{
                
        });

        ws.on("error", (err)=>{
            console.log(err);
        });

        ws.connect();

        return ()=>{
            ws.close();
        }
    }, []);

	return null;
}

export default WebsocketClient;