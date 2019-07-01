import React from 'react';
import {Dialog, DialogTitle, DialogContent, TextField, Button, Grid} from '@material-ui/core';
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
    }).oneOf([Yup.ref('name')], "Confirm Name does not match"),
    newName: Yup.string().required('enter new name')
	.matches(/^[a-z0-9_]*$/i, {
		message: 'input letters, numbers, and underscore only',
		excludeEmptyString: true,
    })
});

function Form(props){
    const {
        renameRequest,
        targetName,
        onSucceed,
        onFail,
		values: { confirmName, newName },
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
    
    async function renameReq(){
        try{
            const res = await Axios.post(renameRequest, {
                name: newName
            });
            onSucceed(res, confirmName, newName);
        }catch(err){
            onFail(err, confirmName, newName);
        }
    }

	return(
        <Grid container component="form" spacing={1}
            onSubmit={(e)=>{
                e.preventDefault();
                renameReq();
            }}
        >
            <Grid component={TextField} item xs={12}
                id="newName" name="newName" label="New Name"
                onChange={change.bind(null, "newName")}
                value={newName}
                helperText={touched.newName ? errors.newName : ""}
                error={touched.newName && Boolean(errors.newName)}
            />
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
                {`Rename ${targetName} to ${newName}`}
            </Grid>
        </Grid>
    )
}

// will accept parameter of renameRequest, targetName, and dialogProps
// targetName is name of target that will be used for rename confirmation
// targetName will affect content of title and body
// renameRequest will be needed when sending rename request
// DialogRename will be used for renaming important thing: Project and Entity
function DialogRename(props){
    const {targetName, dialogProps, ...other} = props;

    return(
        <Dialog {...dialogProps}>
            <DialogTitle id='dialog-rename-title'>
                {`Rename "${targetName}"`}
            </DialogTitle>
            <DialogContent>
                <Formik
                    validationSchema={ValidationSchema}
                    initialValues={{
                        name: targetName,
                        confirmName: '',
                        newName: ''
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

DialogRename.propTypes = {
    renameRequest: PropTypes.string.isRequired,
    targetName: PropTypes.string.isRequired,
    onSucceed: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired,
    dialogProps: PropTypes.shape({
        ...Dialog.propTypes
    }).isRequired
}

export default DialogRename;