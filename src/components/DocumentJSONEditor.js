import React from 'react';

import Grid from '@material-ui/core/Grid';

import AceEditor from "react-ace";
import 'brace/ext/language_tools';
import 'brace/mode/json';
import 'brace/theme/github';

function DocumentJSONEditor(props){
    const {data, onChange, onValidation, readonly, minLines, fontSize} = props;

    return(
        <Grid item container xs={12}>
            <AceEditor
                placeholder="" 
                mode="json" 
                theme="github"
                name="json-editor"
                onChange={onChange}
                onValidate={onValidation}
                width="100%"
                minLines={minLines}
                maxLines={Infinity}
                fontSize={fontSize}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={data}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={false}
                showLineNumbers={true}
                tabSize={4}
                wrapEnabled={true}
                readOnly={readonly}
                editorProps={{$blockScrolling: Infinity}}
            />
        </Grid>
    )
}

export default DocumentJSONEditor;