import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, makeStyles} from '@material-ui/core';

import {selectCurrentDocumentType} from '../redux/selectors/documentSelectors';
import {ShowNotificationDialog} from '../redux/actions/globalActions';

import DocumentAddField from './DocumentAddField';
import DocumentSaveButton from './DocumentSaveButton';
import DocumentCancelButton from './DocumentCancelButton';
import DocumentAddButton from './DocumentAddButton';
import Axios from '../Axios';

const useStyle = makeStyles(theme => ({
	root:{
		'& > *':{
			marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5)
		}
	}
}));

function DocumentSchemaAuthorized(props){
    const style = useStyle();
    const dispatch = useDispatch();
    const {history, id} = props;
    const {entity, project} = props.match.params;
    const currentDocumentSchema = useSelector(selectCurrentDocumentType);
    const [add, setAdd] = useState(false);

    return(
        <Grid container item xs={12} justify="space-evenly" className={style.root}>
            {
                add 
                ? <DocumentAddField keys={[]} cancel={() => setAdd(false)}/> 
                : null
            }
            <DocumentAddButton add={() => setAdd(true)}/>
            <DocumentCancelButton cancel={() => history.push(`/${project}/${entity}`)}/>
            <DocumentSaveButton save={async() => {
                try{
                    await Axios.post(`entity/${id}/schema`, {
                        schema: currentDocumentSchema
                    });
                    dispatch(
                        ShowNotificationDialog(
                            'Save Schema', 
                            'Succeed saving schema'
                        )
                    );
                }catch(err){
                    dispatch(
                        ShowNotificationDialog(
                            'Save Schema', 
                            `Fail saving schema, ${err}`
                        )
                    );
                }
            }}/>
        </Grid>
    )
}

export default DocumentSchemaAuthorized;