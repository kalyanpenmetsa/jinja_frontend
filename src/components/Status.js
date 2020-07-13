import React from 'react';

function Status(props) {
  return(
    <div>
      { props.error ? (
        <div className="text-center text-danger p-2 bg-dark"><strong>Please check the Template input and Variable input</strong></div>
        ): ("")
      }
    </div>
  );
}

export default Status;
