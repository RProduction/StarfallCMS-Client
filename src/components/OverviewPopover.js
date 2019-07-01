import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SetProjectPopover} from '../actions/projectActions';
import {ShowRenameDialog, ShowDeleteDialog} from '../actions/globalActions';
import {DeleteForever, Create} from '@material-ui/icons'
import PopoverMenu from './PopoverMenu';

function OverviewPopover(props){
    const dispatch = useDispatch();
    const anchor = useSelector(state=>state.projectPopover);

    return(
        <PopoverMenu
            id={anchor ? 'Project Menu' : null}
            open={anchor ? true : false}
            onClose={() => dispatch(SetProjectPopover(null))}
            anchorEl={anchor}
            menus={[
                {
                    title: "Rename",
                    icon: Create,
                    onClick: () => {
                        dispatch(SetProjectPopover(null));
                        dispatch(ShowRenameDialog());
                    }
                },
                {
                    title: "Delete",
                    icon: DeleteForever,
                    onClick: () => {
                        dispatch(SetProjectPopover(null));
                        dispatch(ShowDeleteDialog());
                    }
                }
            ]}
        />
    )
}

export default OverviewPopover;