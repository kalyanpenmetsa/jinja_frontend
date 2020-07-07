import React from 'react';

import CodeMirror from "react-codemirror2";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <textarea id="editor" />
      </div>
    );
  }
}

export default CodeEditor;
