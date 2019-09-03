import React from 'react';

import Grid from '@material-ui/core/Grid';

import AceEditor from "react-ace";
import 'brace/mode/json';
import 'brace/theme/github';

function DocumentJSONEditor(props){
    const {data, onChange, onValidation} = props;

    return(
        <Grid item xs={12}>
            <AceEditor
                placeholder="" 
                mode="json" 
                theme="github"
                name="json-editor"
                onChange={(value, event) => onChange(value, event)}
                onValidate={(annotations) => onValidation(annotations)}
                width='100%'
                fontSize={20}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={data}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4
                }}
            />
        </Grid>
    )
}

export default DocumentJSONEditor;