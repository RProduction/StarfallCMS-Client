import React, {useEffect, useState} from 'react';

import List from "@material-ui/core/List";
import makeStyle from "@material-ui/core/styles/makeStyles";
import MTableToolbar from "material-table/dist/components/m-table-toolbar";

import {useDispatch, useSelector} from 'react-redux';

import Axios, {CancelToken} from '../Axios';
import {produce} from 'immer';

import {
    InitFileUpload, 
    PopFileUpload, 
    SetFileUpload, 
    FinishFileUpload
} from "../redux/actions/storageActions";
import {selectAllFileUpload} from "../redux/selectors/storageSelectors";
import StorageCustomToolbarItem from "./StorageCustomToolbarItem";

const useStyle = makeStyle(theme => ({
    root: {
        borderBottom: "1px solid black",
        borderTop: "1px solid black"
    }
}));

function StorageCustomToolbar(props) {
    const {project, ...other} = props;
    const style = useStyle();
    const dispatch = useDispatch();
    const upload = useSelector(state => selectAllFileUpload(state, project));
    const [cancel, setCancel] = useState({});

    const handleUpload = async(name, file, cancelToken) => {
        try{
            const formdata = new FormData();
            formdata.append('file[]', file, name);
            
            await Axios.post(
                `storage/${project}`, 
                formdata,
                {	
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (e)=>{
                        const progress = Math.floor(e.loaded * 1.0) / e.total;
                        dispatch(SetFileUpload(project, name, progress));
                    },
                    cancelToken: cancelToken.token
                }
            );
            dispatch(FinishFileUpload(project, name));
        }catch(err){
            setCancel(produce(cancel, (draft)=>{
                delete draft[name];
            }));
            dispatch(PopFileUpload(project, name));
        }
    };

    const initUpload = async(name, file) => {
        try{
            // change object url to file
            const res = await fetch(file);
            const blob = await res.blob();
            const cancelToken = CancelToken.source();
            setCancel(produce(cancel, (draft)=>{
                draft[name] = cancelToken;
            }));
            dispatch(InitFileUpload(project, name));

            handleUpload(name, blob, cancelToken);
        }catch(err){
            setCancel(produce(cancel, (draft)=>{
                delete draft[name];
            }));
            dispatch(PopFileUpload(project, name));
        }
    };

    useEffect(() => {
        if(upload){
            for(const target of upload){
                if(target.status === "Uploading") 
                    break;
                else if(target.status === "Waiting"){
                    initUpload(target.name, target.file);
                    break;
                }
            }
        }
    }, [upload]);

    return (
        <React.Fragment>
            <MTableToolbar {...other}/>
            {
                upload.length > 0 ? <List dense className={style.root}>
                    {
                        upload.map((value, index) => 
                            <StorageCustomToolbarItem key={value.name} i={(index + 1)} 
                                {...value} project={project} cancel={cancel[value.name]}
                                divider={index !== upload.length-1}
                            />
                        )
                    }
                </List> : null
            }
        </React.Fragment>
    )
}

export default StorageCustomToolbar;