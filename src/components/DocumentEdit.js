import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Grid, makeStyles, Button} from '@material-ui/core';
import {ShowNotificationDialog} from '../redux/actions/globalActions';
import {selectDocument} from '../redux/selectors/documentSelectors';
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

function DocumentEdit(props){
    const style = useStyle()
    const dispatch = useDispatch();
    const {document} = props.match.params;

    const _document = useSelector(state => selectDocument(state, document));

    const [data, setData] = useState(
        _document ? JSON.stringify(_document.data, null, 4) : `{}`
    );
    const [valid, setValid] = useState(false);
    
    return(
        <Grid container className={style.root} direction="column">
            <DocumentJSONEditor 
                data={data} 
                onChange={(value) => setData(value)}
                onValidation={(annotations) => setValid(annotations.length === 0)}
            />
            <Grid item component={Button} xs={12} 
                color="secondary" variant="contained" disabled={!valid}
                onClick={async() => {
                    try{
                        await Axios.post(`document/${document}/modify`, {
                            data: JSON.parse(data)
                        });

                        dispatch(ShowNotificationDialog(
                            'Edit Document', 
                            'Succeed editing document'
                        ));
                    }catch(err){
                        dispatch(ShowNotificationDialog(
                            'Edit Document', 
                            `Failed editing document, ${err}`
                        ));
                    }
                }}
            >
                Modify
            </Grid>
        </Grid>
    )
}

export default DocumentEdit;