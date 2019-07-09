import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Ws from '@adonisjs/websocket-client';
import {AddProjects, DeleteProject, RenameProject} from './redux/actions/projectActions';
import {AddEntities, DeleteEntities, RenameEntity, SetEntitySchema} from './redux/actions/entityActions';
import {AddDocuments, ModifyDocument} from './redux/actions/documentActions';
import { DeleteDocuments } from './redux/indexes/database';

function WebsocketClient(props) {
    const dispatch = useDispatch();

    useEffect(()=>{
        const ws = Ws("ws://localhost:3333/");
        
        ws.on("open", ()=>{
            const project = ws.subscribe('project');
            const entity = ws.subscribe('entity');
            const document = ws.subscribe('document');
            
            // project socket listener
            project.on('add', (msg)=>{
                console.log("add project");
                console.log(msg);
                dispatch(AddProjects([{
                    id: msg._id,
                    name: msg.name,
                    created: msg.created_at,
                    updated: msg.updated_at,
                    publicKey: msg.public_key
                }]));
            });
            project.on('delete', (msg)=>{
                console.log("delete project");
                console.log(msg);
                dispatch(DeleteProject(msg._id));
            });
            project.on('rename', (msg)=>{
                console.log("rename project");
                console.log(msg);
                dispatch(RenameProject(
                    msg._id, 
                    msg.name, 
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
                    id: msg._id,
                    projectId:msg.project_id,
                    name: msg.name,
                    created: msg.created_at,
                    updated: msg.updated_at,
                    schema: msg.schema
                }]));
            });
            entity.on('delete', (msg)=>{
                console.log("delete entity");
                console.log(msg);
                dispatch(DeleteEntities([msg._id]));
            });
            entity.on('rename', (msg)=>{
                console.log("rename entity");
                console.log(msg);
                dispatch(RenameEntity(
                    msg._id,
                    msg.name, 
                    msg.updated_at
                ));
            });
            entity.on('schema', (msg)=>{
                console.log("set entity schema");
                console.log(msg);
                dispatch(SetEntitySchema(
                    msg._id,
                    msg.schema, 
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
                const {id, entity_id, created_at, updated_at, ...rest} = msg;
                dispatch(AddDocuments([{
                    id: id,
                    entityId: entity_id,
                    created: created_at,
                    updated: updated_at,
                    ...rest
                }]));
            });
            document.on('delete', (msg)=>{
                console.log("delete documents");
                console.log(msg);
                dispatch(DeleteDocuments(msg.ids));
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