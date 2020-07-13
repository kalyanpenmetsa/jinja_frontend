import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';

function Header(props) {
  return(
    <div>
      <Navbar bg="dark">
            <Navbar.Brand className="text-white" href="/">Jinja To Text</Navbar.Brand>
      </Navbar>
      <div className="bg-dark">
        <button className="ui fluid button positive p-2" onClick={props.submitButton} >
          <Icon name="play" />
          Run
        </button>
      </div>
    </div>
  );
}

export default Header;
