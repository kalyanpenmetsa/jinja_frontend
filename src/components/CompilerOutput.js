import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";

function CompilerOutput(props) {
  let response_code = props.response_code;
  let jinja_output = (response_code !== 200)
  ? "An error occured while rendering the template:" + props.jinja_output.replace(/<\/?[^>]+>/ig, "").replace("Bad Request\n", "")
  : props.jinja_output;
  return(
    <div>
        <br />
        <AceEditor
          width="auto"
          mode="markdown"
          theme="tomorrow_night"
          name="jinja_output"
          value={jinja_output}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            fontSize: "12pt",
            minLines: 15,
            maxLines: 15,
            showLineNumbers: false,
            highlightActiveLine: false,
            highlightGutterLine: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            useWrapMode: true,
            indentedSoftWrap: false,
            enableSnippets: true,
            cursorStyle: "slim",
            readOnly: true
          }}

        />
    </div>
  );
}

export default CompilerOutput;
