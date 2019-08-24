import React from 'react';
import {IconButton} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {SetProjectPopover} from '../redux/actions/projectActions';
import {SetTarget} from '../redux/actions/globalActions';

function OverviewCardAction({id, name}){
    const dispatch = useDispatch();

    return(
        <IconButton 
            aria-label="More Action"
            onClick={
                (e)=>{
                    dispatch(SetTarget({id: id, name: name}));
                    dispatch(SetProjectPopover(e.currentTarget));
                }
            }
        >
            <MoreVert />
        </IconButton>
    )
}

export default OverviewCardAction;