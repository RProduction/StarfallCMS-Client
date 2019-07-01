import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, Grid} from '@material-ui/core';
import {Formik} from 'formik'
import Axios from '../Axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const ValidationSchema = Yup.object({
    name: Yup.string(),
	confirmName: Yup.string().required('re-enter name')
	.matches(/^[a-z0-9_]*$/i, {
		message: 'input letters, numbers, and underscore only',
		excludeEmptyString: true,
	}).oneOf([Yup.ref('name')], "Confirm Name does not match")
});

function Form(props){
    const {
        deleteRequest, 
        targetName,
        onSucceed,
        onFail,
		values: { confirmName },
		errors,
		touched,
		handleChange,
		isValid,
		setFieldTouched
    } = props;
    
    const change = (name, e) => {
		e.persist();
		handleChange(e);
		setFieldTouched(name, true, false);
    };
    
    async function deleteReq(){
        try{
            const res = await Axios.delete(deleteRequest);
            onSucceed(res, confirmName);
        }catch(err){
            onFail(err, confirmName);
        }
    }

	return(
        <Grid container component="form" spacing={1}
            onSubmit={(e)=>{
                e.preventDefault();
                deleteReq();
            }}
        >
            <Grid component={TextField} item xs={12}
                id="confirmName" name="confirmName" label="Confirm Name"
                onChange={change.bind(null, "confirmName")}
                value={confirmName}
                helperText={touched.confirmName ? errors.confirmName : ""}
                error={touched.confirmName && Boolean(errors.confirmName)}
            />
            <Grid item xs={12} component={Button} 
                type="submit" disabled={!isValid}
                size="large"
            >
                {`PERMANENTLY Delete ${targetName}`}
            </Grid>
        </Grid>
    )
}

// will accept parameter of deleteRequest, targetName, and dialogProps
// targetName is name of target that will be used for delete confirmation
// targetName will affect content of title and body
// deleteRequest will be needed when sending delete request
// DialogDelete will be used for deleting important thing: Project, Entity, User
function DialogDelete(props){
    const {targetName, dialogProps, ...other} = props;

    return(
        <Dialog {...dialogProps}>
            <DialogTitle id='dialog-delete-title'>
                {`PERMANENTLY Delete "${targetName}"`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`
                    This action CANNOT be undone. 
                    This will permanently delete "${targetName}"
                    `}
                </DialogContentText>
                <DialogContentText>
                    Please type in the name of the target to confirm
                </DialogContentText>
                <Formik 
                    validationSchema={ValidationSchema}
                    initialValues={{
                        name: targetName,
                        confirmName: ''
                    }}
                    render={(props)=><Form 
                        targetName={targetName}
                        {...other}
                        {...props}
                    />}
                />
            </DialogContent>
        </Dialog>
    )
}

DialogDelete.propTypes = {
    deleteRequest: PropTypes.string.isRequired,
    targetName: PropTypes.string.isRequired,
    onSucceed: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired,
    dialogProps: PropTypes.shape({
        ...Dialog.propTypes
    }).isRequired
}

export default DialogDelete;