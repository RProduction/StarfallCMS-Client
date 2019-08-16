import React, {useState, useEffect} from 'react';
import {Dialog, DialogTitle, DialogContent, TextField, Button, Grid} from '@material-ui/core';
import Axios from '../Axios';
import PropTypes from 'prop-types';

const maxSize = 10 * 1024 * 1024;
const formats = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

function Form(props){
    const {
        imgRequest, 
        imgCategory,
        onSucceed,
        onFail
    } = props;

    const [img, setImg] = useState();
    const [error, setError] = useState();
    
    async function imgReq(){
        try{
            const formdata = new FormData();
            formdata.append('img', img, img.name.split(/(\\|\/)/g).pop());
            const res = await Axios.post(
                imgRequest, 
                formdata,
                {'Content-Type': 'multipart/form-data'}
            );
            onSucceed(res);
        }catch(err){
            onFail(err);
        }
    }

    useEffect(()=>{
        if(img && img.size >= maxSize){
            setError("File too large");
        }
        else if(img && !formats.includes(img.type)){
            setError("Unsupported Format");
        }
        else if(img && !formats.includes(img.type) 
        && img.size >= maxSize){
            setError("Unsupported Format and File too large");
        }else if(!img){
            setError("Upload Image");
        }else{
            setError();
        }
    }, [img]);

	return(
        <Grid container component="form" spacing={1}
            onSubmit={(e)=>{
                e.preventDefault();
                imgReq();
            }}
        >
            <Grid item component={TextField} xs={12}
                id="img" name="img" label="Image"
                onChange={(e)=>setImg(e.target.files[0])}
                files={[img]}
                type='file'
                helperText={error}
                error={Boolean(error)}
            />
            <Grid item xs={12} component={Button} 
                type="submit" disabled={Boolean(error)}
                size="large"
            >
                {`Change ${imgCategory} Image`}
            </Grid>
        </Grid>
    )
}

// will accept parameter of imgRequest, imgCategory, and dialogProps
// imgCategory is category of item that will be added
// imgCategory will affect content of title and body
// imgRequest will be needed when sending add request
// DialogAdd will be used for change img of project
function DialogImg(props){
    const {imgCategory, dialogProps, ...other} = props;

    return(
        <Dialog {...dialogProps}>
            <DialogTitle id='dialog-img-title'>
                {`Change ${imgCategory} Image`}
            </DialogTitle>
            <DialogContent>
                <Form 
                    imgCategory={imgCategory}
                    {...other}
                    {...props}
                />
            </DialogContent>
        </Dialog>
    )
}

DialogImg.propTypes = {
    imgRequest: PropTypes.string.isRequired,
    imgCategory: PropTypes.string.isRequired,
    onSucceed: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired,
    dialogProps: PropTypes.shape({
        ...Dialog.propTypes
    }).isRequired
}

export default DialogImg;