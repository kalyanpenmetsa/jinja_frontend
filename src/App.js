import React from 'react';
import './App.css';
import JinjaInput from './components/JinjaInput.js';
import CompilerOutput from './components/CompilerOutput.js';
import Status from './components/Status.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import yaml from 'js-yaml';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jinja_input: 'Enter your Jinja template here!\n\nSample {{ type }} Template',
      jinja_variable: '# Variables can be in JSON or YAML\n\n{\n    "type": "Jinja"\n}',
      jinja_output: 'Enter your Jinja template here!\n\nSample Jinja Template',
      jinja_error: 'Backend errors (If any) will be displayed here!',
      errors: {
        jinja_input: '',
        jinja_variable: '',
      }
    }
  }
  isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
  isYaml = (str) => {
    try {
        yaml.safeLoad(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  postData = () => {
    const { jinja_input, jinja_variable } = this.state;
    axios.post('http://localhost:5000/render_jinja',
    {jinja_input, jinja_variable },
    {headers: {"Access-Control-Allow-Origin": "*"}})
    .then((response) => {
      this.setState({response_code: response.status});
      this.setState({jinja_output: response.data});
    }, (error) => {
      this.setState({response_code: error.response.status});
      this.setState({jinja_output: error.response.data});
    });
  }
  isReady = (errors) => {
    for (var name in errors) {
      if (errors[name] !== "") {
        return false;
      }
    }
    return true;
  }
  submitButton = (e) => {
    let errors = this.state.errors;
    if (this.isReady(errors)) {
      this.setState({jinja_error: 'Backend errors (If any) will be displayed here!'})
      this.setState({error: false});
      this.postData();
    } else {
      this.setState({error: true});
    }
  }
  jinjaInput = (val) => {
    const name = "jinja_input";
    const value = val;
    let errors = this.state.errors;
    errors.jinja_input =
      value.length < 1
      ? 'Template input should not be blank'
      : '';
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    });
  }
  variableInput = (val) => {
    const name = "jinja_variable";
    const value = val;
    let errors = this.state.errors;
    errors.jinja_variable =
      value.length < 1
      ? 'Template input should not be blank'
      : errors.jinja_variable =
          !(this.isJson(value) || this.isYaml(value)) ? 'Variable is neither JSON nor YAML'
      : '';
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    });
  }
  inputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'jinja_input':
        errors.jinja_input =
          value.length < 1
          ? 'Template input should not be blank'
          : '';
        break;
      case 'jinja_variable':
        errors.jinja_variable =
          value.length < 1 ? 'Variable input should not be blank'
      : errors.jinja_variable =
          !(this.isJson(value) || this.isYaml(value)) ? 'Variable is neither JSON nor YAML'
      : '';
        break;
      default:
      break;
    }
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    });
  }
  render() {
    return (
      <div className="container">
        <h1>Jinja2 Renderer</h1>
        <h5>How to use?</h5>
        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h6>
        <br />
        <div className="text-center"><button className="ui positive button" onClick={this.submitButton}>Render Jinja</button></div>
        <Status error={this.state.error} errors={this.state.errors} />
        <br />
        <JinjaInput jinja_input={this.state.jinja_input} jinja_variable={this.state.jinja_variable} jinja_output={this.state.jinja_output} inputChange={this.inputChange} jinjaInput={this.jinjaInput} variableInput={this.variableInput} />
        <CompilerOutput jinja_error={this.state.jinja_error} jinja_output={this.state.jinja_output} response_code={this.state.response_code} />
      </div>
    );
  }
}

export default App;
