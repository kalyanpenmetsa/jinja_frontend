import React from 'react';

function CompilerOutput(props) {
  var error = props.jinja_error;
  return(
    <div>
      <div className="row">
        <div className="col-sm ui form">
          <div className="field">
            <h5><div className="text-center">Compiler Output</div></h5>
            <textarea style={{ minHeight: 200 }} className="form-control bg-dark text-light" id="exampleFormControlTextarea1" rows="5" value={error} readOnly />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CompilerOutput;
