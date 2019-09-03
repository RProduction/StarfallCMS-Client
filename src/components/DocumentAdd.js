import React, {useMemo, useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Axios from '../Axios';

import {useDispatch, useSelector} from 'react-redux';

import {ShowNotificationDialog} from '../redux/actions/globalActions';
import {selectEntityInProjectByName} from '../redux/selectors/entitySelectors';

import DocumentJSONEditor from './DocumentJSONEditor';

const useStyle = makeStyles(theme => ({
	root:{
		'& > *':{
			marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5)
		}
	}
}));

function DocumentAdd(props){
    const style = useStyle();
    const dispatch = useDispatch();
    const {project, entity} = props.match.params;

    const selectEntity = useMemo(selectEntityInProjectByName, []);
    const _entity = useSelector(state => selectEntity(state, project, entity));
    
    const [data, setData] = useState(`{}`);
    const [valid, setValid] = useState(false);

    return(
        <Grid container className={style.root} direction="column">
            <DocumentJSONEditor 
                data={data} 
                onChange={(value) => setData(value)}
                onValidation={(annotations) => setValid(annotations.length === 0)}
            />
            <Grid item component={Button} color="secondary" 
                variant="contained" xs={12} disabled={!valid}
                onClick={async () => {
                    try{
                        await Axios.post(`document/${_entity.id}`, {
                            data: JSON.parse(data)
                        });
                        
                        dispatch(ShowNotificationDialog(
                            'Add Document', 
                            'Succeed adding new document'
                        ));
                    }catch(err){
                        dispatch(ShowNotificationDialog(
                            'Add Document', 
                            `Failed adding new document, ${err}`
                        ));
                    }
                }}
            >
                Add
            </Grid>
        </Grid>
    )
}

export default DocumentAdd;