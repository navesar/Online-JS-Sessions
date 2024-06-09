// src/components/AceEditorComponent.js
import React from 'react';
import AceEditor from 'react-ace';

// Import Ace Editor modes, themes, and worker scripts
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

// Configure the worker scripts
import 'ace-builds/webpack-resolver';

const Editor = ({ code, onChange , readonly}) => {
    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            value={code}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
            }}
            style={{ width: '100%', height: '90vh' }}
            readOnly={readonly}
        />
    );
};

export default Editor;