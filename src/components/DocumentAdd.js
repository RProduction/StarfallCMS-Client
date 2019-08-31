import React, {useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, makeStyles, Button} from '@material-ui/core';
import {ShowNotificationDialog} from '../redux/actions/globalActions';
import {selectEntityByName} from '../redux/selectors/entitySelectors';
import Axios from '../Axios';

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
    const {entity} = props.match.params;

    const selectEntity = useMemo(selectEntityByName, []);
    const _entity = useSelector(state => selectEntity(state, entity));
    
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