import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function DialogCustomForm(props){
    const {
        request, 
        btn,
        category,
		values: { name, newName, confirmName },
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

	return(
        <Grid container component="form" spacing={1}
            onSubmit={(e)=>{
                e.preventDefault();
                request({ 
                    name: name, 
                    newName: newName, 
                    confirmName: confirmName 
                });
            }}
        >
            {category === 'add' 
                ? <Grid component={TextField} item xs={12}
                    id="name" name="name" label="Name"
                    onChange={change.bind(null, "name")}
                    value={name}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                /> : category === 'delete'
                ? <Grid component={TextField} item xs={12}
                    id="confirmName" name="confirmName" label="Confirm Name"
                    onChange={change.bind(null, "confirmName")}
                    value={confirmName}
                    helperText={touched.confirmName ? errors.confirmName : ""}
                    error={touched.confirmName && Boolean(errors.confirmName)}
                /> : category === 'rename'
                ? <React.Fragment>
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
                </React.Fragment> : null
            }
            <Grid item xs={12} component={Button} 
                type="submit" disabled={!isValid}
                size="large"
            >
                {btn}
            </Grid>
        </Grid>
    )
}

export default DialogCustomForm;