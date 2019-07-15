import React from 'react';
import {Dialog, DialogTitle, DialogContent, TextField, Button, Grid} from '@material-ui/core';
import {Formik} from 'formik'
import Axios from '../Axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const ValidationSchema = Yup.object({
	name: Yup.string().required('enter name')
	.matches(/^[a-zA-Z0-9_]+$/, {
		message: 'input letters, numbers, and underscore only',
		excludeEmptyString: true,
	}).min(1, 'name too short').max(50, 'name too long')
});

function Form(props){
    const {
        addRequest, 
        addCategory,
        onSucceed,
        onFail,
		values: { name },
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
    
    async function addReq(){
        try{
            const res = await Axios.post(addRequest, {
                name: name
            });
            onSucceed(res, name);
        }catch(err){
            onFail(err, name);
        }
    }

	return(
        <Grid container component="form" spacing={1}
            onSubmit={(e)=>{
                e.preventDefault();
                addReq();
            }}
        >
            <Grid component={TextField} item xs={12}
                id="name" name="name" label="Name"
                onChange={change.bind(null, "name")}
                value={name}
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
            />
            <Grid item xs={12} component={Button} 
                type="submit" disabled={!isValid}
                size="large"
            >
                {`Add New ${addCategory}`}
            </Grid>
        </Grid>
    )
}

// will accept parameter of addRequest, addCategory, and dialogProps
// addCategory is category of item that will be added
// addCategory will affect content of title and body
// addRequest will be needed when sending add request
// DialogAdd will be used for adding important thing: Project and Entity
function DialogAdd(props){
    const {addCategory, dialogProps, ...other} = props;

    return(
        <Dialog {...dialogProps}>
            <DialogTitle id='dialog-add-title'>
                {`Add New ${addCategory}`}
            </DialogTitle>
            <DialogContent>
                <Formik 
                    validationSchema={ValidationSchema}
                    initialValues={{
                        name: ''
                    }}
                    render={(props)=><Form 
                        addCategory={addCategory}
                        {...other}
                        {...props}
                    />}
                />
            </DialogContent>
        </Dialog>
    )
}

DialogAdd.propTypes = {
    addRequest: PropTypes.string.isRequired,
    addCategory: PropTypes.string.isRequired,
    onSucceed: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired,
    dialogProps: PropTypes.shape({
        ...Dialog.propTypes
    }).isRequired
}

export default DialogAdd;