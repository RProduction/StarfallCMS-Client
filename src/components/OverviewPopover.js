import React, {useRef} from 'react';

import DeleteForever from '@material-ui/icons/DeleteForever';
import Create from '@material-ui/icons/Create';
import Image from '@material-ui/icons/Image';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import {SetProjectPopover} from '../redux/actions/projectActions';
import {ShowRenameDialog, ShowDeleteDialog, ShowNotificationDialog} from '../redux/actions/globalActions';
import PopoverMenu from './PopoverMenu';

const maxSize = 10 * 1024 * 1024;
const formats = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

function OverviewPopover(props){
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const anchor = useSelector(state=>state.projectPopover);
    const fileInput = useRef(null);

    return(
        <React.Fragment>
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
                        title: "Change Image",
                        icon: Image,
                        onClick: () => {
                            dispatch(SetProjectPopover(null));
                            fileInput.current.click();
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
            <input name="files" type="file" 
                style={{display: 'none'}} ref={fileInput}
				onChange={async(e)=>{
                    const img = fileInput.current.files[0];

					if(img && img.size >= maxSize){
                        dispatch(ShowNotificationDialog(
                            "Change Project Image", 
                            "File too large"
                        ));console.log("File too large");
                        return;
                    }
                    else if(img && !formats.includes(img.type)){
                        dispatch(ShowNotificationDialog(
                            "Change Project Image", 
                            "Unsupported Format"
                        ));console.log('Unsupported Format');
                        return;
                    }
                    else if(img && !formats.includes(img.type) 
                    && img.size >= maxSize){
                        dispatch(ShowNotificationDialog(
                            "Change Project Image", 
                            "Unsupported Format and File too large"
                        ));console.log("Unsupported Format and File too large");
                        return;
                    }else if(!img){
                        console.log("Img not exist");
                        return;
                    }

					try{
                        const formdata = new FormData();
                        formdata.append('img', img, img.name.split(/(\\|\/)/g).pop());
                        await Axios.post(
                            `project/${target.id}/img`, 
                            formdata,
                            {'Content-Type': 'multipart/form-data'}
                        );

						dispatch(ShowNotificationDialog(
                            'Change Project Image', 
                            `Succeed changing project image`
                        ));
					}catch(err){
						dispatch(ShowNotificationDialog(
                            'Change Project Image', 
                            `Fail changing project image, error: ${err}`
                        ));
					}
				}}
			/>
        </React.Fragment>
    )
}

export default OverviewPopover;