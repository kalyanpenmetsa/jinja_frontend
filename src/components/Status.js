import React from 'react';

function Status(props) {
  return(
    <div>
      { props.error ? (
        <div className="text-center text-danger">Please check the Template input and Variable input</div>
        ): ("")
      }
    </div>
  );
}

export default Status;
