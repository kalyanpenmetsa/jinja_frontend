import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-django";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import { FileDrop } from 'react-file-drop';

function JinjaInput(props) {
  return(
    <div>
      <div className="row">
        <FileDrop
        onFrameDrop={props.dropHandle}
          >
        <div className="col" id="jinja_input">
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
        </FileDrop>
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
