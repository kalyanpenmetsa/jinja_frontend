import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-django";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import SplitPane from "react-split-pane";

function JinjaInput(props) {
  return(
    <SplitPane split="horizontal" minSize={props.window_height*0.1} maxSize={props.window_height*0.7} defaultSize={props.window_height*0.5} >
        <div onDrop={props.dropHandleJinja} onDragOver={props.preventDef}>
            <AceEditor
              height={props.window_height*0.5}
              width={props.window_width*0.5}
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
                enableSnippets: true,
                showPrintMargin: false
              }}
            />
        </div>
        <div onDrop={props.dropHandleVar} onDragOver={props.preventDef}>
          <AceEditor
            height={props.window_height*0.5}
            width={props.window_width*0.5}
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
              enableSnippets: true,
              showPrintMargin: false
            }}
          />
        </div>
    </SplitPane>
  );
}

export default JinjaInput;
