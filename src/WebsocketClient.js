import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Ws from '@adonisjs/websocket-client';
import {AddEntity, AddProject, DeleteEntity, DeleteProject, RenameEntity, RenameProject} from './actions/adminActions';

function WebsocketClient(props) {
    const dispatch = useDispatch();

    useEffect(()=>{
        const ws = Ws("ws://localhost:3333/");
        
        ws.on("open", ()=>{
            const project = ws.subscribe('project');
            const entity = ws.subscribe('entity');
            
            project.on('add', (msg)=>{
                console.log("add project");
                console.log(msg);
                dispatch(AddProject(
                    msg._id, 
					msg.name, 
					msg.created_at,
					msg.updated_at,
					msg.public_key
                ));
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

            entity.on('add', (msg)=>{
                console.log("add entity");
                console.log(msg);
                dispatch(AddEntity(
                    msg._id,
                    msg.project_id, 
                    msg.name,
                    msg.created_at,
                    msg.updated_at
                ));
            });
            entity.on('delete', (msg)=>{
                console.log("delete entity");
                console.log(msg);
                dispatch(DeleteEntity(msg._id));
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
            entity.on("error", (err)=>{
                console.log(err);
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