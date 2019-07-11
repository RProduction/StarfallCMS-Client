import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {selectCurrentDocumentType} from '../redux/selectors/documentSelectors';
import {ShowNotificationDialog} from '../redux/actions/globalActions';

import DocumentAddField from './DocumentAddField';
import DocumentSaveButton from './DocumentSaveButton';
import DocumentCancelButton from './DocumentCancelButton';
import DocumentAddButton from './DocumentAddButton';
import Axios from '../Axios';

function DocumentSchemaAuthorized(props){
    const dispatch = useDispatch();
    const {history, id} = props;
    const {entity, project} = props.match.params;
    const currentDocumentSchema = useSelector(selectCurrentDocumentType);
    const [add, setAdd] = useState(false);

    return(
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default DocumentSchemaAuthorized;