import React from 'react';
import AceEditor from "react-ace";

function JinjaInput(props) {
  return(
    <div>
      <div className="row">
        <div className="col-sm ui form">
          <div className="field">
            <h5><div className="text-center">Template Input (Jinja)</div></h5>
            <textarea style={{ minHeight: 500 }} className="form-control bg-dark text-light" id="exampleFormControlTextarea1" rows="5" onChange={props.inputChange} name="jinja_input" value={props.jinja_input} />
          </div>
        </div>
        <div className="col-sm ui form">
          <div className="field">
            <h5><div className="text-center">Variable Input (JSON or YAML)</div></h5>
            <textarea style={{ minHeight: 500 }} className="form-control bg-dark text-light" id="exampleFormControlTextarea1" rows="5" onChange={props.inputChange} name="jinja_variable" value={props.jinja_variable} />
          </div>
        </div>
        <div className="col-sm ui form">
          <div className="field">
            <h5><div className="text-center">Text Output</div></h5>
            <textarea style={{ minHeight: 500 }} className="form-control bg-dark text-light" id="exampleFormControlTextarea1" rows="5" value={props.jinja_output} readOnly />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default JinjaInput;
