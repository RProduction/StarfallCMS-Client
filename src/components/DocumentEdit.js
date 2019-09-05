import React, {useState, useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {useDispatch, useSelector} from 'react-redux';

import Axios from '../Axios';

import {ShowNotificationDialog} from '../redux/actions/globalActions';
import {selectDocument} from '../redux/selectors/documentSelectors';
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

    const [data, setData] = useState('{}');
    const [valid, setValid] = useState(false);

    useEffect(()=>{
        if(_document){
            const newdata = JSON.stringify(_document.data, null, 4);
            setData(newdata);
            console.log(newdata);
        }
    }, [_document]);
    
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