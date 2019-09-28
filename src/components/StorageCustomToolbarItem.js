import React from 'react';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton"
import LinearProgress from "@material-ui/core/LinearProgress";
import makeStyle from "@material-ui/core/styles/makeStyles";
import Cancel from "@material-ui/icons/Cancel";
import Check from "@material-ui/icons/Check";

import {useDispatch} from 'react-redux';

import { PopFileUpload } from "../redux/actions/storageActions";

const useStyle = makeStyle(theme => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        zIndex: 2
    },
    cancel: {
        color: "red"
    },
    finish: {
        color: "green"
    },
    front: {
        zIndex: 5
    }
}));

function StorageCustomToolbarItem(props) {
    const {i, name, cancel, status, project, divider, progress} = props;
    const style = useStyle();
    const dispatch = useDispatch();

    return (
        <ListItem divider={divider}>
            <ListItemText primary={`${i}. ${name}`} className={style.front}/>
            <ListItemSecondaryAction className={style.front}>
                <IconButton aria-label={
                        status === "Waiting" || status === "Uploading" ?
                        "Cancel upload" :
                        "Finish upload"
                    }
                    onClick={() => {
                        if(status === "Uploading"){
                            if(cancel)
                                cancel.cancel();
                        }else{
                            dispatch(PopFileUpload(project, name));
                        }
                    }}
                    color="primary"
                    classes={{
                        colorPrimary: status === "Finish" ? style.finish : style.cancel
                    }}
                >
                    {
                        status === "Finish" ? <Check/> : <Cancel/> 
                    }
                </IconButton>
            </ListItemSecondaryAction>
            <LinearProgress
                variant="determinate" value={progress} color="secondary"
                classes={{
                    root: style.root
                }}
            />
        </ListItem>
    )
}

export default StorageCustomToolbarItem;