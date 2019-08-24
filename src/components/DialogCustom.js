import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import DialogCustomForm from './DialogCustomForm';

const addSchema = Yup.object({
	name: Yup.string().required('enter name')
	.matches(/^[a-zA-Z0-9_]+$/, {
		message: 'input letters, numbers, and underscore only',
		excludeEmptyString: true,
	}).min(1, 'name too short').max(50, 'name too long')
});

const deleteSchema = Yup.object({
    name: Yup.string(),
	confirmName: Yup.string().required('re-enter name')
	.matches(/^[a-z0-9_]*$/i, {
		message: 'input letters, numbers, and underscore only',
		excludeEmptyString: true,
	}).oneOf([Yup.ref('name')], "Confirm Name does not match")
});

const renameSchema = Yup.object({
    name: Yup.string(),
	confirmName: Yup.string().required('re-enter name')
	.oneOf([Yup.ref('name')], "Confirm Name does not match"),
    newName: Yup.string().required('enter new name')
	.matches(/^[a-zA-Z0-9_]+$/, {
		message: 'input letters, numbers, and underscore only',
		excludeEmptyString: true,
    }).min(1, 'new name too short').max(50, 'new name too long')
});

const initialAdd = {
    name: ''
};

const initialDelete = targetName => ({
    name: targetName,
    confirmName: ''
});

const initialRename = targetName => ({
    name: targetName,
    confirmName: '',
    newName: ''
});

// will accept parameter of request, title, content, btn, targetName, and dialogProps
function DialogCustom(props){
    const {title, content, targetName, category, dialogProps} = props;

    return(
        <Dialog {...dialogProps}>
            <DialogTitle id='dialog-title'>
                {title}
            </DialogTitle>
            <DialogContent>
                {category === 'add' || category === 'delete' || category === 'rename' 
                    ? <React.Fragment>
                        {category === 'delete' 
                            ?   <React.Fragment>
                                    <DialogContentText>
                                        {content}
                                    </DialogContentText>
                                    <DialogContentText>
                                        Please type in the name of the target to confirm
                                    </DialogContentText>
                                </React.Fragment>
                            : null
                        }
                        <Formik 
                            validationSchema={category === 'add'
                                ? addSchema : category === 'rename'
                                ? renameSchema : category === 'delete'
                                ? deleteSchema : {}
                            }
                            initialValues={category === 'add'
                                ? initialAdd : category === 'rename'
                                ? initialRename(targetName) : category === 'delete'
                                ? initialDelete(targetName) : {}
                            }
                            render={(propsRender)=><DialogCustomForm 
                                {...props}
                                {...propsRender}
                            />}
                        />
                    </React.Fragment> : category === 'notification'
                    ? <DialogContentText>
                        {content}
                    </DialogContentText> : null
                }
            </DialogContent>
        </Dialog>
    )
}

DialogCustom.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    btn: PropTypes.string,
    targetName: PropTypes.string,
    category: PropTypes.oneOf(['add', 'delete', 'rename', 'notification']).isRequired,
    request: PropTypes.func,
    dialogProps: PropTypes.shape({
        ...Dialog.propTypes
    }).isRequired
}

export default DialogCustom;