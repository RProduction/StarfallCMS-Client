import React from 'react';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton"
import LinearProgress from "@material-ui/core/LinearProgress";
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import makeStyle from "@material-ui/core/styles/makeStyles";
import Cancel from "@material-ui/icons/Cancel";
import Check from "@material-ui/icons/Check";

import {useDispatch} from 'react-redux';

import { PopFileUpload } from "../redux/actions/storageActions";

const useStyle = makeStyle(theme => ({
    flex: {
        display: "flex",
        flexGrowth: 1
    },
    cancel: {
        color: red
    },
    finish: {
        color: green
    }
}));

function StorageCustomToolbarItem(props) {
    const {i, name, cancel, status, project, divider} = props;
    const style = useStyle();
    const dispatch = useDispatch();

    return (
        <ListItem divider={divider}>
            <ListItemText primary={`${i}. ${name}`}/>
            <ListItemSecondaryAction>
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
                    className={status === "Finish" ? style.finish : style.cancel}
                >
                    {
                        status === "Finish" ?
                        <Check/> :
                        <Cancel/> 
                        
                    }
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default StorageCustomToolbarItem;