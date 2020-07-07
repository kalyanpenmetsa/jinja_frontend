import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-django";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-tomorrow_night";

function JinjaInput(props) {
  return(
    <div>
      <div className="row">
        <div className="col">
          <h5><div className="text-center">Jinja Input</div></h5>
            <AceEditor
              mode="django"
              theme="tomorrow_night"
              onChange={props.jinjaInput}
              name="jinja_input"
              value={props.jinja_input}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                fontSize: "12pt",
                highlightActiveLine: true,
                highlightSelectedWord: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true
              }}
            />
        </div>
        <div className="col">
          <h5><div className="text-center">Variable Input</div></h5>
          <AceEditor
            mode="yaml"
            theme="tomorrow_night"
            onChange={props.variableInput}
            name="jinja_variable"
            value={props.jinja_variable}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              fontSize: "12pt",
              highlightActiveLine: true,
              highlightSelectedWord: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true
            }}
          />
        </div>
      </div>
      <br />
    </div>
  );
}

export default JinjaInput;
